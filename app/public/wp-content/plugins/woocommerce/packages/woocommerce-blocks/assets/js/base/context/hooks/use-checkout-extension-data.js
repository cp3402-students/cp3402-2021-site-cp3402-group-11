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
exports.useCheckoutExtensionData = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var is_shallow_equal_1 = require("@wordpress/is-shallow-equal");
/**
 * Internal dependencies
 */
var checkout_state_1 = require("../providers/cart-checkout/checkout-state");
/**
 * Custom hook for setting custom checkout data which is passed to the wc/store/checkout endpoint when processing orders.
 */
var useCheckoutExtensionData = function () {
    var _a = (0, checkout_state_1.useCheckoutContext)(), dispatchActions = _a.dispatchActions, extensionData = _a.extensionData;
    var extensionDataRef = (0, element_1.useRef)(extensionData);
    (0, element_1.useEffect)(function () {
        if (!(0, is_shallow_equal_1.default)(extensionData, extensionDataRef.current)) {
            extensionDataRef.current = extensionData;
        }
    }, [extensionData]);
    var setExtensionDataWithNamespace = (0, element_1.useCallback)(function (namespace, key, value) {
        var _a, _b;
        var currentData = extensionDataRef.current[namespace] || {};
        dispatchActions.setExtensionData(__assign(__assign({}, extensionDataRef.current), (_a = {}, _a[namespace] = __assign(__assign({}, currentData), (_b = {}, _b[key] = value, _b)), _a)));
    }, [dispatchActions]);
    return {
        extensionData: extensionDataRef.current,
        setExtensionData: setExtensionDataWithNamespace,
    };
};
exports.useCheckoutExtensionData = useCheckoutExtensionData;
