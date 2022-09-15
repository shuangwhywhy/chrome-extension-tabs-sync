import { debounce } from 'throttle-debounce';

let _tabsData = {};
let _deviceName = '';
let _sessions = [];

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function _btoa(plainText) {
  return btoa(String.fromCharCode(...textEncoder.encode(plainText)));
}

function _atob(base64String) {
  return textDecoder.decode(Uint8Array.from(atob(base64String).split('').map(c => c.charCodeAt(0))));
}

globalThis._btoa = _btoa;
globalThis._atob = _atob;

async function getTabsStatus() {
  const groups = {};
  const windows = await chrome.windows.getAll({
    populate: true
  });
  return await Promise.all(
    windows.map(window =>
      Promise.all(
        window.tabs?.map(async tab => {
          const gid = tab.groupId;
          let groupInfo = null;
          
          if (gid && gid !== chrome.tabGroups.TAB_GROUP_ID_NONE) {
            if (groups[gid]) {
              groupInfo = groups[gid];
            }
            else {
              groupInfo = await chrome.tabGroups?.get(gid);
              groupInfo && (groups[gid] = groupInfo);
            }
          }

          return {
            active: tab.active,
            audible: tab.audible,
            autoDiscardable: tab.autoDiscardable,
            discarded: tab.discarded,
            highlighted: tab.highlighted,
            incognito: tab.incognito,
            index: tab.index,
            mutedInfo: tab.mutedInfo,
            pinned: tab.pinned,
            selected: tab.selected,
            url: tab.url,
            groupInfo
          };
        })
      ).then(tabs => {
        return {
          alwaysOnTop: window.alwaysOnTop,
          focused: window.focused,
          incognito: window.incognito,
          state: window.state,
          type: window.type,
          tabs
        };
      })
    )
  );
}

async function getCurrentDeviceName() {
  return await chrome.storage.local.get('deviceName')?.deviceName || await chrome.instanceID.getID();
}

async function loadTabsDataFromStorage(firstChunk) {
  if (firstChunk === undefined) {
    firstChunk = (await chrome.storage.sync.get('cest_tabs'))?.cest_tabs;
  }
  if (firstChunk) {
    const chunkNum = parseInt(firstChunk.match(/^\d+/));
    const otherChunks = await chrome.storage.sync.get(new Array(chunkNum).fill(undefined).map((c, i) => `cest_tabs${i}`));
    _tabsData = {
      cest_tabs: firstChunk,
      ...otherChunks
    };
    try {
      const json = firstChunk.slice(String(chunkNum).length + 1) + Object.values(otherChunks).join('');
      const data = JSON.parse(_atob(json));
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}

async function init() {
  await loadTabsDataFromStorage();
  _deviceName = await getCurrentDeviceName();
  _sessions = await chrome.sessions.getDevices();
}

const updateMyTabs = debounce(
  2000,
  async function updateMyTabs() {
    let deviceName = (await chrome.storage.local.get('deviceName'))?.deviceName || await chrome.instanceID.getID();
    const windows = { [deviceName]: await getTabsStatus() };
    const raw = _btoa(JSON.stringify(windows));
    const firstChunk = raw.slice(0, 8178);
    const otherChunks = raw.slice(8178).split(/(.{8179})/g).filter(a => a);
    await chrome.storage.sync.set({
      cest_tabs: otherChunks.length + ',' + firstChunk,
      ...Object.fromEntries(otherChunks.map((chunk, i) => [`cest_tabs${i}`, chunk]))
    });
  }
);

chrome.storage.sync.onChanged.addListener(e => {
  if (Object.keys(e).join(',').includes('cest_tabs')) {
    loadTabsDataFromStorage();
  }
});

chrome.storage.local.onChanged.addListener(({ deviceName: { newValue } }) => {
  if (newValue) {
    updateMyTabs();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.tabs.onActivated?.addListener(updateMyTabs);
chrome.tabs.onAttached?.addListener(updateMyTabs);
chrome.tabs.onCreated?.addListener(updateMyTabs);
chrome.tabs.onDetached?.addListener(updateMyTabs);
chrome.tabs.onHighlighted?.addListener(updateMyTabs);
chrome.tabs.onMoved?.addListener(updateMyTabs);
chrome.tabs.onRemoved?.addListener(updateMyTabs);
chrome.tabs.onReplaced?.addListener(updateMyTabs);
chrome.tabs.onUpdated?.addListener(updateMyTabs);

chrome.tabGroups?.onCreated?.addListener(updateMyTabs);
chrome.tabGroups?.onMoved?.addListener(updateMyTabs);
chrome.tabGroups?.onRemoved?.addListener(updateMyTabs);
chrome.tabGroups?.onUpdated?.addListener(updateMyTabs);

init();