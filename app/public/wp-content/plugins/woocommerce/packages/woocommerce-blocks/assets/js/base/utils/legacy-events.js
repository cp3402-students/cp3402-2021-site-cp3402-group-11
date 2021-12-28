"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateJQueryEventToNative = exports.triggerAddedToCartEvent = exports.triggerAddingToCartEvent = exports.triggerFragmentRefresh = exports.dispatchEvent = void 0;
var CustomEvent = window.CustomEvent || null;
/**
 * Wrapper function to dispatch an event.
 */
var dispatchEvent = function (name, _a) {
    var _b = _a.bubbles, bubbles = _b === void 0 ? false : _b, _c = _a.cancelable, cancelable = _c === void 0 ? false : _c, element = _a.element, _d = _a.detail, detail = _d === void 0 ? {} : _d;
    if (!CustomEvent) {
        return;
    }
    if (!element) {
        element = document.body;
    }
    var event = new CustomEvent(name, {
        bubbles: bubbles,
        cancelable: cancelable,
        detail: detail,
    });
    element.dispatchEvent(event);
};
exports.dispatchEvent = dispatchEvent;
var fragmentRequestTimeoutId;
// This is a hack to trigger cart updates till we migrate to block based cart
// that relies on the store, see
// https://github.com/woocommerce/woocommerce-gutenberg-products-block/issues/1247
var triggerFragmentRefresh = function () {
    if (fragmentRequestTimeoutId) {
        clearTimeout(fragmentRequestTimeoutId);
    }
    fragmentRequestTimeoutId = setTimeout(function () {
        (0, exports.dispatchEvent)('wc_fragment_refresh', {
            bubbles: true,
            cancelable: true,
        });
    }, 50);
};
exports.triggerFragmentRefresh = triggerFragmentRefresh;
var triggerAddingToCartEvent = function () {
    (0, exports.dispatchEvent)('wc-blocks_adding_to_cart', {
        bubbles: true,
        cancelable: true,
    });
};
exports.triggerAddingToCartEvent = triggerAddingToCartEvent;
var triggerAddedToCartEvent = function (_a) {
    var _b = _a.preserveCartData, preserveCartData = _b === void 0 ? false : _b;
    (0, exports.dispatchEvent)('wc-blocks_added_to_cart', {
        bubbles: true,
        cancelable: true,
        detail: { preserveCartData: preserveCartData },
    });
};
exports.triggerAddedToCartEvent = triggerAddedToCartEvent;
/**
 * Function that listens to a jQuery event and dispatches a native JS event.
 * Useful to convert WC Core events into events that can be read by blocks.
 *
 * Returns a function to remove the jQuery event handler. Ideally it should be
 * used when the component is unmounted.
 */
var translateJQueryEventToNative = function (
// Name of the jQuery event to listen to.
jQueryEventName, 
// Name of the native event to dispatch.
nativeEventName, 
// Whether the event bubbles.
bubbles, 
// Whether the event is cancelable.
cancelable) {
    if (bubbles === void 0) { bubbles = false; }
    if (cancelable === void 0) { cancelable = false; }
    if (typeof jQuery !== 'function') {
        return function () { return void null; };
    }
    var eventDispatcher = function () {
        (0, exports.dispatchEvent)(nativeEventName, { bubbles: bubbles, cancelable: cancelable });
    };
    jQuery(document).on(jQueryEventName, eventDispatcher);
    return function () { return jQuery(document).off(jQueryEventName, eventDispatcher); };
};
exports.translateJQueryEventToNative = translateJQueryEventToNative;
