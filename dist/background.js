/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/throttle-debounce/cjs/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/throttle-debounce/cjs/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param {number} delay -                  A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher)
 *                                            are most useful.
 * @param {Function} callback -               A function to be executed after delay milliseconds. The `this` context and all arguments are passed through,
 *                                            as-is, to `callback` when the throttled-function is executed.
 * @param {object} [options] -              An object to configure options.
 * @param {boolean} [options.noTrailing] -   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds
 *                                            while the throttled-function is being called. If noTrailing is false or unspecified, callback will be executed
 *                                            one final time after the last throttled-function call. (After the throttled-function has not been called for
 *                                            `delay` milliseconds, the internal counter is reset).
 * @param {boolean} [options.noLeading] -   Optional, defaults to false. If noLeading is false, the first throttled-function call will execute callback
 *                                            immediately. If noLeading is true, the first the callback execution will be skipped. It should be noted that
 *                                            callback will never executed if both noLeading = true and noTrailing = true.
 * @param {boolean} [options.debounceMode] - If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is
 *                                            false (at end), schedule `callback` to execute after `delay` ms.
 *
 * @returns {Function} A new, throttled, function.
 */
function throttle (delay, callback, options) {
  var _ref = options || {},
      _ref$noTrailing = _ref.noTrailing,
      noTrailing = _ref$noTrailing === void 0 ? false : _ref$noTrailing,
      _ref$noLeading = _ref.noLeading,
      noLeading = _ref$noLeading === void 0 ? false : _ref$noLeading,
      _ref$debounceMode = _ref.debounceMode,
      debounceMode = _ref$debounceMode === void 0 ? undefined : _ref$debounceMode;
  /*
   * After wrapper has stopped being called, this timeout ensures that
   * `callback` is executed at the proper times in `throttle` and `end`
   * debounce modes.
   */


  var timeoutID;
  var cancelled = false; // Keep track of the last time `callback` was executed.

  var lastExec = 0; // Function to clear existing timeout

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  } // Function to cancel next exec


  function cancel(options) {
    var _ref2 = options || {},
        _ref2$upcomingOnly = _ref2.upcomingOnly,
        upcomingOnly = _ref2$upcomingOnly === void 0 ? false : _ref2$upcomingOnly;

    clearExistingTimeout();
    cancelled = !upcomingOnly;
  }
  /*
   * The `wrapper` function encapsulates all of the throttling / debouncing
   * functionality and when executed will limit the rate at which `callback`
   * is executed.
   */


  function wrapper() {
    for (var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    var self = this;
    var elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    } // Execute `callback` and update the `lastExec` timestamp.


    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }
    /*
     * If `debounceMode` is true (at begin) this is used to clear the flag
     * to allow future `callback` executions.
     */


    function clear() {
      timeoutID = undefined;
    }

    if (!noLeading && debounceMode && !timeoutID) {
      /*
       * Since `wrapper` is being called for the first time and
       * `debounceMode` is true (at begin), execute `callback`
       * and noLeading != true.
       */
      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        /*
         * In throttle mode with noLeading, if `delay` time has
         * been exceeded, update `lastExec` and schedule `callback`
         * to execute after `delay` ms.
         */
        lastExec = Date.now();

        if (!noTrailing) {
          timeoutID = setTimeout(debounceMode ? clear : exec, delay);
        }
      } else {
        /*
         * In throttle mode without noLeading, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      }
    } else if (noTrailing !== true) {
      /*
       * In trailing throttle mode, since `delay` time has not been
       * exceeded, schedule `callback` to execute `delay` ms after most
       * recent execution.
       *
       * If `debounceMode` is true (at begin), schedule `clear` to execute
       * after `delay` ms.
       *
       * If `debounceMode` is false (at end), schedule `callback` to
       * execute after `delay` ms.
       */
      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel; // Return the wrapper function.

  return wrapper;
}

/* eslint-disable no-undefined */
/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param {number} delay -               A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param {Function} callback -          A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                        to `callback` when the debounced-function is executed.
 * @param {object} [options] -           An object to configure options.
 * @param {boolean} [options.atBegin] -  Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                        after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                        (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 *
 * @returns {Function} A new, debounced function.
 */

function debounce (delay, callback, options) {
  var _ref = options || {},
      _ref$atBegin = _ref.atBegin,
      atBegin = _ref$atBegin === void 0 ? false : _ref$atBegin;

  return throttle(delay, callback, {
    debounceMode: atBegin !== false
  });
}

exports.debounce = debounce;
exports.throttle = throttle;
//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./background.js ***!
  \***********************/
const { debounce } = __webpack_require__(/*! throttle-debounce */ "./node_modules/throttle-debounce/cjs/index.js");

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

const updateMyTabs = debounce(
  2000,
  async function updateMyTabs() {
    let deviceName = await chrome.storage.local.get('deviceName')?.deviceName || await chrome.instanceID.getID();
    const windows = { [deviceName]: await getTabsStatus() };
    console.log(windows);
    const raw = btoa(JSON.stringify(windows));
    const firstChunk = raw.slice(0, 8179);
    const otherChunks = raw.slice(8179).split(/(.{8179})/g).filter(a => a);
    await chrome.storage.sync.set({
      cest_tabs: otherChunks.length + firstChunk,
      ...Object.fromEntries(otherChunks.map((chunk, i) => [`cest_tabs${i}`, chunk]))
    });
  }
);

chrome.storage.sync.onChanged.addListener(async ({ cest_tabs: { newValue: firstChunk } = {} }) => {
  if (firstChunk) {
    const chunkNum = parseInt(firstChunk.match(/\d+/));
    const otherChunks = await chrome.storage.sync.get(new Array(chunkNum).fill(undefined).map((c, i) => `cest_tabs${i}`));

    try {
      const json = firstChunk.slice(String(chunkNum).length) + Object.values(otherChunks).join('');
      const data = JSON.parse(atob(json));
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
});

chrome.storage.local.onChanged.addListener(({ deviceName }) => {
  console.log(deviceName);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGhyb3R0bGUtZGVib3VuY2UvY2pzL2luZGV4LmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vLi9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkLG5vLXBhcmFtLXJlYXNzaWduLG5vLXNoYWRvdyAqL1xuXG4vKipcbiAqIFRocm90dGxlIGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLiBFc3BlY2lhbGx5IHVzZWZ1bCBmb3IgcmF0ZSBsaW1pdGluZ1xuICogZXhlY3V0aW9uIG9mIGhhbmRsZXJzIG9uIGV2ZW50cyBsaWtlIHJlc2l6ZSBhbmQgc2Nyb2xsLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWxheSAtICAgICAgICAgICAgICAgICAgQSB6ZXJvLW9yLWdyZWF0ZXIgZGVsYXkgaW4gbWlsbGlzZWNvbmRzLiBGb3IgZXZlbnQgY2FsbGJhY2tzLCB2YWx1ZXMgYXJvdW5kIDEwMCBvciAyNTAgKG9yIGV2ZW4gaGlnaGVyKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyZSBtb3N0IHVzZWZ1bC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gICAgICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGRlbGF5IG1pbGxpc2Vjb25kcy4gVGhlIGB0aGlzYCBjb250ZXh0IGFuZCBhbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcy1pcywgdG8gYGNhbGxiYWNrYCB3aGVuIHRoZSB0aHJvdHRsZWQtZnVuY3Rpb24gaXMgZXhlY3V0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gICAgICAgICAgICAgIEFuIG9iamVjdCB0byBjb25maWd1cmUgb3B0aW9ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubm9UcmFpbGluZ10gLSAgIE9wdGlvbmFsLCBkZWZhdWx0cyB0byBmYWxzZS4gSWYgbm9UcmFpbGluZyBpcyB0cnVlLCBjYWxsYmFjayB3aWxsIG9ubHkgZXhlY3V0ZSBldmVyeSBgZGVsYXlgIG1pbGxpc2Vjb25kc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlIHRoZSB0aHJvdHRsZWQtZnVuY3Rpb24gaXMgYmVpbmcgY2FsbGVkLiBJZiBub1RyYWlsaW5nIGlzIGZhbHNlIG9yIHVuc3BlY2lmaWVkLCBjYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25lIGZpbmFsIHRpbWUgYWZ0ZXIgdGhlIGxhc3QgdGhyb3R0bGVkLWZ1bmN0aW9uIGNhbGwuIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGRlbGF5YCBtaWxsaXNlY29uZHMsIHRoZSBpbnRlcm5hbCBjb3VudGVyIGlzIHJlc2V0KS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubm9MZWFkaW5nXSAtICAgT3B0aW9uYWwsIGRlZmF1bHRzIHRvIGZhbHNlLiBJZiBub0xlYWRpbmcgaXMgZmFsc2UsIHRoZSBmaXJzdCB0aHJvdHRsZWQtZnVuY3Rpb24gY2FsbCB3aWxsIGV4ZWN1dGUgY2FsbGJhY2tcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbW1lZGlhdGVseS4gSWYgbm9MZWFkaW5nIGlzIHRydWUsIHRoZSBmaXJzdCB0aGUgY2FsbGJhY2sgZXhlY3V0aW9uIHdpbGwgYmUgc2tpcHBlZC4gSXQgc2hvdWxkIGJlIG5vdGVkIHRoYXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayB3aWxsIG5ldmVyIGV4ZWN1dGVkIGlmIGJvdGggbm9MZWFkaW5nID0gdHJ1ZSBhbmQgbm9UcmFpbGluZyA9IHRydWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlYm91bmNlTW9kZV0gLSBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbiksIHNjaGVkdWxlIGBjbGVhcmAgdG8gZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLiBJZiBgZGVib3VuY2VNb2RlYCBpc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlIChhdCBlbmQpLCBzY2hlZHVsZSBgY2FsbGJhY2tgIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgbmV3LCB0aHJvdHRsZWQsIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiB0aHJvdHRsZSAoZGVsYXksIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmID0gb3B0aW9ucyB8fCB7fSxcbiAgICAgIF9yZWYkbm9UcmFpbGluZyA9IF9yZWYubm9UcmFpbGluZyxcbiAgICAgIG5vVHJhaWxpbmcgPSBfcmVmJG5vVHJhaWxpbmcgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRub1RyYWlsaW5nLFxuICAgICAgX3JlZiRub0xlYWRpbmcgPSBfcmVmLm5vTGVhZGluZyxcbiAgICAgIG5vTGVhZGluZyA9IF9yZWYkbm9MZWFkaW5nID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkbm9MZWFkaW5nLFxuICAgICAgX3JlZiRkZWJvdW5jZU1vZGUgPSBfcmVmLmRlYm91bmNlTW9kZSxcbiAgICAgIGRlYm91bmNlTW9kZSA9IF9yZWYkZGVib3VuY2VNb2RlID09PSB2b2lkIDAgPyB1bmRlZmluZWQgOiBfcmVmJGRlYm91bmNlTW9kZTtcbiAgLypcbiAgICogQWZ0ZXIgd3JhcHBlciBoYXMgc3RvcHBlZCBiZWluZyBjYWxsZWQsIHRoaXMgdGltZW91dCBlbnN1cmVzIHRoYXRcbiAgICogYGNhbGxiYWNrYCBpcyBleGVjdXRlZCBhdCB0aGUgcHJvcGVyIHRpbWVzIGluIGB0aHJvdHRsZWAgYW5kIGBlbmRgXG4gICAqIGRlYm91bmNlIG1vZGVzLlxuICAgKi9cblxuXG4gIHZhciB0aW1lb3V0SUQ7XG4gIHZhciBjYW5jZWxsZWQgPSBmYWxzZTsgLy8gS2VlcCB0cmFjayBvZiB0aGUgbGFzdCB0aW1lIGBjYWxsYmFja2Agd2FzIGV4ZWN1dGVkLlxuXG4gIHZhciBsYXN0RXhlYyA9IDA7IC8vIEZ1bmN0aW9uIHRvIGNsZWFyIGV4aXN0aW5nIHRpbWVvdXRcblxuICBmdW5jdGlvbiBjbGVhckV4aXN0aW5nVGltZW91dCgpIHtcbiAgICBpZiAodGltZW91dElEKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICB9XG4gIH0gLy8gRnVuY3Rpb24gdG8gY2FuY2VsIG5leHQgZXhlY1xuXG5cbiAgZnVuY3Rpb24gY2FuY2VsKG9wdGlvbnMpIHtcbiAgICB2YXIgX3JlZjIgPSBvcHRpb25zIHx8IHt9LFxuICAgICAgICBfcmVmMiR1cGNvbWluZ09ubHkgPSBfcmVmMi51cGNvbWluZ09ubHksXG4gICAgICAgIHVwY29taW5nT25seSA9IF9yZWYyJHVwY29taW5nT25seSA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmMiR1cGNvbWluZ09ubHk7XG5cbiAgICBjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuICAgIGNhbmNlbGxlZCA9ICF1cGNvbWluZ09ubHk7XG4gIH1cbiAgLypcbiAgICogVGhlIGB3cmFwcGVyYCBmdW5jdGlvbiBlbmNhcHN1bGF0ZXMgYWxsIG9mIHRoZSB0aHJvdHRsaW5nIC8gZGVib3VuY2luZ1xuICAgKiBmdW5jdGlvbmFsaXR5IGFuZCB3aGVuIGV4ZWN1dGVkIHdpbGwgbGltaXQgdGhlIHJhdGUgYXQgd2hpY2ggYGNhbGxiYWNrYFxuICAgKiBpcyBleGVjdXRlZC5cbiAgICovXG5cblxuICBmdW5jdGlvbiB3cmFwcGVyKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHNfID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJndW1lbnRzX1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGVsYXBzZWQgPSBEYXRlLm5vdygpIC0gbGFzdEV4ZWM7XG5cbiAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBFeGVjdXRlIGBjYWxsYmFja2AgYW5kIHVwZGF0ZSB0aGUgYGxhc3RFeGVjYCB0aW1lc3RhbXAuXG5cblxuICAgIGZ1bmN0aW9uIGV4ZWMoKSB7XG4gICAgICBsYXN0RXhlYyA9IERhdGUubm93KCk7XG4gICAgICBjYWxsYmFjay5hcHBseShzZWxmLCBhcmd1bWVudHNfKTtcbiAgICB9XG4gICAgLypcbiAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbikgdGhpcyBpcyB1c2VkIHRvIGNsZWFyIHRoZSBmbGFnXG4gICAgICogdG8gYWxsb3cgZnV0dXJlIGBjYWxsYmFja2AgZXhlY3V0aW9ucy5cbiAgICAgKi9cblxuXG4gICAgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgICB0aW1lb3V0SUQgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFub0xlYWRpbmcgJiYgZGVib3VuY2VNb2RlICYmICF0aW1lb3V0SUQpIHtcbiAgICAgIC8qXG4gICAgICAgKiBTaW5jZSBgd3JhcHBlcmAgaXMgYmVpbmcgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZSBhbmRcbiAgICAgICAqIGBkZWJvdW5jZU1vZGVgIGlzIHRydWUgKGF0IGJlZ2luKSwgZXhlY3V0ZSBgY2FsbGJhY2tgXG4gICAgICAgKiBhbmQgbm9MZWFkaW5nICE9IHRydWUuXG4gICAgICAgKi9cbiAgICAgIGV4ZWMoKTtcbiAgICB9XG5cbiAgICBjbGVhckV4aXN0aW5nVGltZW91dCgpO1xuXG4gICAgaWYgKGRlYm91bmNlTW9kZSA9PT0gdW5kZWZpbmVkICYmIGVsYXBzZWQgPiBkZWxheSkge1xuICAgICAgaWYgKG5vTGVhZGluZykge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbiB0aHJvdHRsZSBtb2RlIHdpdGggbm9MZWFkaW5nLCBpZiBgZGVsYXlgIHRpbWUgaGFzXG4gICAgICAgICAqIGJlZW4gZXhjZWVkZWQsIHVwZGF0ZSBgbGFzdEV4ZWNgIGFuZCBzY2hlZHVsZSBgY2FsbGJhY2tgXG4gICAgICAgICAqIHRvIGV4ZWN1dGUgYWZ0ZXIgYGRlbGF5YCBtcy5cbiAgICAgICAgICovXG4gICAgICAgIGxhc3RFeGVjID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoIW5vVHJhaWxpbmcpIHtcbiAgICAgICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGRlYm91bmNlTW9kZSA/IGNsZWFyIDogZXhlYywgZGVsYXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKlxuICAgICAgICAgKiBJbiB0aHJvdHRsZSBtb2RlIHdpdGhvdXQgbm9MZWFkaW5nLCBpZiBgZGVsYXlgIHRpbWUgaGFzIGJlZW4gZXhjZWVkZWQsIGV4ZWN1dGVcbiAgICAgICAgICogYGNhbGxiYWNrYC5cbiAgICAgICAgICovXG4gICAgICAgIGV4ZWMoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vVHJhaWxpbmcgIT09IHRydWUpIHtcbiAgICAgIC8qXG4gICAgICAgKiBJbiB0cmFpbGluZyB0aHJvdHRsZSBtb2RlLCBzaW5jZSBgZGVsYXlgIHRpbWUgaGFzIG5vdCBiZWVuXG4gICAgICAgKiBleGNlZWRlZCwgc2NoZWR1bGUgYGNhbGxiYWNrYCB0byBleGVjdXRlIGBkZWxheWAgbXMgYWZ0ZXIgbW9zdFxuICAgICAgICogcmVjZW50IGV4ZWN1dGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyB0cnVlIChhdCBiZWdpbiksIHNjaGVkdWxlIGBjbGVhcmAgdG8gZXhlY3V0ZVxuICAgICAgICogYWZ0ZXIgYGRlbGF5YCBtcy5cbiAgICAgICAqXG4gICAgICAgKiBJZiBgZGVib3VuY2VNb2RlYCBpcyBmYWxzZSAoYXQgZW5kKSwgc2NoZWR1bGUgYGNhbGxiYWNrYCB0b1xuICAgICAgICogZXhlY3V0ZSBhZnRlciBgZGVsYXlgIG1zLlxuICAgICAgICovXG4gICAgICB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KGRlYm91bmNlTW9kZSA/IGNsZWFyIDogZXhlYywgZGVib3VuY2VNb2RlID09PSB1bmRlZmluZWQgPyBkZWxheSAtIGVsYXBzZWQgOiBkZWxheSk7XG4gICAgfVxuICB9XG5cbiAgd3JhcHBlci5jYW5jZWwgPSBjYW5jZWw7IC8vIFJldHVybiB0aGUgd3JhcHBlciBmdW5jdGlvbi5cblxuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkICovXG4vKipcbiAqIERlYm91bmNlIGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLiBEZWJvdW5jaW5nLCB1bmxpa2UgdGhyb3R0bGluZyxcbiAqIGd1YXJhbnRlZXMgdGhhdCBhIGZ1bmN0aW9uIGlzIG9ubHkgZXhlY3V0ZWQgYSBzaW5nbGUgdGltZSwgZWl0aGVyIGF0IHRoZVxuICogdmVyeSBiZWdpbm5pbmcgb2YgYSBzZXJpZXMgb2YgY2FsbHMsIG9yIGF0IHRoZSB2ZXJ5IGVuZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsYXkgLSAgICAgICAgICAgICAgIEEgemVyby1vci1ncmVhdGVyIGRlbGF5IGluIG1pbGxpc2Vjb25kcy4gRm9yIGV2ZW50IGNhbGxiYWNrcywgdmFsdWVzIGFyb3VuZCAxMDAgb3IgMjUwIChvciBldmVuIGhpZ2hlcikgYXJlIG1vc3QgdXNlZnVsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGFmdGVyIGRlbGF5IG1pbGxpc2Vjb25kcy4gVGhlIGB0aGlzYCBjb250ZXh0IGFuZCBhbGwgYXJndW1lbnRzIGFyZSBwYXNzZWQgdGhyb3VnaCwgYXMtaXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBgY2FsbGJhY2tgIHdoZW4gdGhlIGRlYm91bmNlZC1mdW5jdGlvbiBpcyBleGVjdXRlZC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc10gLSAgICAgICAgICAgQW4gb2JqZWN0IHRvIGNvbmZpZ3VyZSBvcHRpb25zLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdEJlZ2luXSAtICBPcHRpb25hbCwgZGVmYXVsdHMgdG8gZmFsc2UuIElmIGF0QmVnaW4gaXMgZmFsc2Ugb3IgdW5zcGVjaWZpZWQsIGNhbGxiYWNrIHdpbGwgb25seSBiZSBleGVjdXRlZCBgZGVsYXlgIG1pbGxpc2Vjb25kc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXIgdGhlIGxhc3QgZGVib3VuY2VkLWZ1bmN0aW9uIGNhbGwuIElmIGF0QmVnaW4gaXMgdHJ1ZSwgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBvbmx5IGF0IHRoZSBmaXJzdCBkZWJvdW5jZWQtZnVuY3Rpb24gY2FsbC5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChBZnRlciB0aGUgdGhyb3R0bGVkLWZ1bmN0aW9uIGhhcyBub3QgYmVlbiBjYWxsZWQgZm9yIGBkZWxheWAgbWlsbGlzZWNvbmRzLCB0aGUgaW50ZXJuYWwgY291bnRlciBpcyByZXNldCkuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIG5ldywgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICovXG5cbmZ1bmN0aW9uIGRlYm91bmNlIChkZWxheSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYgPSBvcHRpb25zIHx8IHt9LFxuICAgICAgX3JlZiRhdEJlZ2luID0gX3JlZi5hdEJlZ2luLFxuICAgICAgYXRCZWdpbiA9IF9yZWYkYXRCZWdpbiA9PT0gdm9pZCAwID8gZmFsc2UgOiBfcmVmJGF0QmVnaW47XG5cbiAgcmV0dXJuIHRocm90dGxlKGRlbGF5LCBjYWxsYmFjaywge1xuICAgIGRlYm91bmNlTW9kZTogYXRCZWdpbiAhPT0gZmFsc2VcbiAgfSk7XG59XG5cbmV4cG9ydHMuZGVib3VuY2UgPSBkZWJvdW5jZTtcbmV4cG9ydHMudGhyb3R0bGUgPSB0aHJvdHRsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcFxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IHsgZGVib3VuY2UgfSA9IHJlcXVpcmUoJ3Rocm90dGxlLWRlYm91bmNlJyk7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRhYnNTdGF0dXMoKSB7XG4gIGNvbnN0IGdyb3VwcyA9IHt9O1xuICBjb25zdCB3aW5kb3dzID0gYXdhaXQgY2hyb21lLndpbmRvd3MuZ2V0QWxsKHtcbiAgICBwb3B1bGF0ZTogdHJ1ZVxuICB9KTtcbiAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIHdpbmRvd3MubWFwKHdpbmRvdyA9PlxuICAgICAgUHJvbWlzZS5hbGwoXG4gICAgICAgIHdpbmRvdy50YWJzPy5tYXAoYXN5bmMgdGFiID0+IHtcbiAgICAgICAgICBjb25zdCBnaWQgPSB0YWIuZ3JvdXBJZDtcbiAgICAgICAgICBsZXQgZ3JvdXBJbmZvID0gbnVsbDtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoZ2lkICYmIGdpZCAhPT0gY2hyb21lLnRhYkdyb3Vwcy5UQUJfR1JPVVBfSURfTk9ORSkge1xuICAgICAgICAgICAgaWYgKGdyb3Vwc1tnaWRdKSB7XG4gICAgICAgICAgICAgIGdyb3VwSW5mbyA9IGdyb3Vwc1tnaWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGdyb3VwSW5mbyA9IGF3YWl0IGNocm9tZS50YWJHcm91cHM/LmdldChnaWQpO1xuICAgICAgICAgICAgICBncm91cEluZm8gJiYgKGdyb3Vwc1tnaWRdID0gZ3JvdXBJbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWN0aXZlOiB0YWIuYWN0aXZlLFxuICAgICAgICAgICAgYXVkaWJsZTogdGFiLmF1ZGlibGUsXG4gICAgICAgICAgICBhdXRvRGlzY2FyZGFibGU6IHRhYi5hdXRvRGlzY2FyZGFibGUsXG4gICAgICAgICAgICBkaXNjYXJkZWQ6IHRhYi5kaXNjYXJkZWQsXG4gICAgICAgICAgICBoaWdobGlnaHRlZDogdGFiLmhpZ2hsaWdodGVkLFxuICAgICAgICAgICAgaW5jb2duaXRvOiB0YWIuaW5jb2duaXRvLFxuICAgICAgICAgICAgaW5kZXg6IHRhYi5pbmRleCxcbiAgICAgICAgICAgIG11dGVkSW5mbzogdGFiLm11dGVkSW5mbyxcbiAgICAgICAgICAgIHBpbm5lZDogdGFiLnBpbm5lZCxcbiAgICAgICAgICAgIHNlbGVjdGVkOiB0YWIuc2VsZWN0ZWQsXG4gICAgICAgICAgICB1cmw6IHRhYi51cmwsXG4gICAgICAgICAgICBncm91cEluZm9cbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKS50aGVuKHRhYnMgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFsd2F5c09uVG9wOiB3aW5kb3cuYWx3YXlzT25Ub3AsXG4gICAgICAgICAgZm9jdXNlZDogd2luZG93LmZvY3VzZWQsXG4gICAgICAgICAgaW5jb2duaXRvOiB3aW5kb3cuaW5jb2duaXRvLFxuICAgICAgICAgIHN0YXRlOiB3aW5kb3cuc3RhdGUsXG4gICAgICAgICAgdHlwZTogd2luZG93LnR5cGUsXG4gICAgICAgICAgdGFic1xuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApXG4gICk7XG59XG5cbmNvbnN0IHVwZGF0ZU15VGFicyA9IGRlYm91bmNlKFxuICAyMDAwLFxuICBhc3luYyBmdW5jdGlvbiB1cGRhdGVNeVRhYnMoKSB7XG4gICAgbGV0IGRldmljZU5hbWUgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoJ2RldmljZU5hbWUnKT8uZGV2aWNlTmFtZSB8fCBhd2FpdCBjaHJvbWUuaW5zdGFuY2VJRC5nZXRJRCgpO1xuICAgIGNvbnN0IHdpbmRvd3MgPSB7IFtkZXZpY2VOYW1lXTogYXdhaXQgZ2V0VGFic1N0YXR1cygpIH07XG4gICAgY29uc29sZS5sb2cod2luZG93cyk7XG4gICAgY29uc3QgcmF3ID0gYnRvYShKU09OLnN0cmluZ2lmeSh3aW5kb3dzKSk7XG4gICAgY29uc3QgZmlyc3RDaHVuayA9IHJhdy5zbGljZSgwLCA4MTc5KTtcbiAgICBjb25zdCBvdGhlckNodW5rcyA9IHJhdy5zbGljZSg4MTc5KS5zcGxpdCgvKC57ODE3OX0pL2cpLmZpbHRlcihhID0+IGEpO1xuICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtcbiAgICAgIGNlc3RfdGFiczogb3RoZXJDaHVua3MubGVuZ3RoICsgZmlyc3RDaHVuayxcbiAgICAgIC4uLk9iamVjdC5mcm9tRW50cmllcyhvdGhlckNodW5rcy5tYXAoKGNodW5rLCBpKSA9PiBbYGNlc3RfdGFicyR7aX1gLCBjaHVua10pKVxuICAgIH0pO1xuICB9XG4pO1xuXG5jaHJvbWUuc3RvcmFnZS5zeW5jLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcihhc3luYyAoeyBjZXN0X3RhYnM6IHsgbmV3VmFsdWU6IGZpcnN0Q2h1bmsgfSA9IHt9IH0pID0+IHtcbiAgaWYgKGZpcnN0Q2h1bmspIHtcbiAgICBjb25zdCBjaHVua051bSA9IHBhcnNlSW50KGZpcnN0Q2h1bmsubWF0Y2goL1xcZCsvKSk7XG4gICAgY29uc3Qgb3RoZXJDaHVua3MgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldChuZXcgQXJyYXkoY2h1bmtOdW0pLmZpbGwodW5kZWZpbmVkKS5tYXAoKGMsIGkpID0+IGBjZXN0X3RhYnMke2l9YCkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGpzb24gPSBmaXJzdENodW5rLnNsaWNlKFN0cmluZyhjaHVua051bSkubGVuZ3RoKSArIE9iamVjdC52YWx1ZXMob3RoZXJDaHVua3MpLmpvaW4oJycpO1xuICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoYXRvYihqc29uKSk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5jaHJvbWUuc3RvcmFnZS5sb2NhbC5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKHsgZGV2aWNlTmFtZSB9KSA9PiB7XG4gIGNvbnNvbGUubG9nKGRldmljZU5hbWUpO1xufSk7XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgY2hyb21lLnJ1bnRpbWUub3Blbk9wdGlvbnNQYWdlKCk7XG59KTtcblxuY2hyb21lLnRhYnMub25BY3RpdmF0ZWQ/LmFkZExpc3RlbmVyKHVwZGF0ZU15VGFicyk7XG5jaHJvbWUudGFicy5vbkF0dGFjaGVkPy5hZGRMaXN0ZW5lcih1cGRhdGVNeVRhYnMpO1xuY2hyb21lLnRhYnMub25DcmVhdGVkPy5hZGRMaXN0ZW5lcih1cGRhdGVNeVRhYnMpO1xuY2hyb21lLnRhYnMub25EZXRhY2hlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcbmNocm9tZS50YWJzLm9uSGlnaGxpZ2h0ZWQ/LmFkZExpc3RlbmVyKHVwZGF0ZU15VGFicyk7XG5jaHJvbWUudGFicy5vbk1vdmVkPy5hZGRMaXN0ZW5lcih1cGRhdGVNeVRhYnMpO1xuY2hyb21lLnRhYnMub25SZW1vdmVkPy5hZGRMaXN0ZW5lcih1cGRhdGVNeVRhYnMpO1xuY2hyb21lLnRhYnMub25SZXBsYWNlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcbmNocm9tZS50YWJzLm9uVXBkYXRlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcblxuY2hyb21lLnRhYkdyb3Vwcz8ub25DcmVhdGVkPy5hZGRMaXN0ZW5lcih1cGRhdGVNeVRhYnMpO1xuY2hyb21lLnRhYkdyb3Vwcz8ub25Nb3ZlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcbmNocm9tZS50YWJHcm91cHM/Lm9uUmVtb3ZlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcbmNocm9tZS50YWJHcm91cHM/Lm9uVXBkYXRlZD8uYWRkTGlzdGVuZXIodXBkYXRlTXlUYWJzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==