"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreEvents = void 0;
/**
 * External dependencies
 */
var hooks_1 = require("@wordpress/hooks");
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var use_store_cart_1 = require("./cart/use-store-cart");
/**
 * Abstraction on top of @wordpress/hooks for dispatching events via doAction for 3rd parties to hook into.
 */
var useStoreEvents = function () {
    var storeCart = (0, use_store_cart_1.useStoreCart)();
    var currentStoreCart = (0, element_1.useRef)(storeCart);
    // Track the latest version of the cart so we can use the current value in our callback function below without triggering
    // other useEffect hooks using dispatchCheckoutEvent as a dependency.
    (0, element_1.useEffect)(function () {
        currentStoreCart.current = storeCart;
    }, [storeCart]);
    var dispatchStoreEvent = (0, element_1.useCallback)(function (eventName, eventParams) {
        if (eventParams === void 0) { eventParams = {}; }
        try {
            (0, hooks_1.doAction)("experimental__woocommerce_blocks-" + eventName, eventParams);
        }
        catch (e) {
            // We don't handle thrown errors but just console.log for troubleshooting.
            // eslint-disable-next-line no-console
            console.error(e);
        }
    }, []);
    var dispatchCheckoutEvent = (0, element_1.useCallback)(function (eventName, eventParams) {
        if (eventParams === void 0) { eventParams = {}; }
        try {
            (0, hooks_1.doAction)("experimental__woocommerce_blocks-checkout-" + eventName, __assign(__assign({}, eventParams), { storeCart: currentStoreCart.current }));
        }
        catch (e) {
            // We don't handle thrown errors but just console.log for troubleshooting.
            // eslint-disable-next-line no-console
            console.error(e);
        }
    }, []);
    return { dispatchStoreEvent: dispatchStoreEvent, dispatchCheckoutEvent: dispatchCheckoutEvent };
};
exports.useStoreEvents = useStoreEvents;
