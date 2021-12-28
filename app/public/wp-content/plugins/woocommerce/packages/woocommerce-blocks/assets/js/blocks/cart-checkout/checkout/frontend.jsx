"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var base_utils_1 = require("@woocommerce/base-utils");
var base_context_1 = require("@woocommerce/base-context");
var hooks_1 = require("@woocommerce/base-context/hooks");
var blocks_registry_1 = require("@woocommerce/blocks-registry");
var atomic_utils_1 = require("@woocommerce/atomic-utils");
/**
 * Internal dependencies
 */
require("./inner-blocks/register-components");
var block_1 = require("./block");
var attributes_1 = require("./attributes");
var getProps = function (el) {
    return {
        attributes: (0, base_utils_1.getValidBlockAttributes)(attributes_1.blockAttributes, 
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (el instanceof HTMLElement ? el.dataset : {})),
    };
};
var Wrapper = function (_a) {
    var children = _a.children;
    // we need to pluck out receiveCart.
    // eslint-disable-next-line no-unused-vars
    var _b = (0, base_context_1.useStoreCart)(), extensions = _b.extensions, receiveCart = _b.receiveCart, cart = __rest(_b, ["extensions", "receiveCart"]);
    var checkoutExtensionData = (0, hooks_1.useCheckoutExtensionData)();
    var validation = (0, hooks_1.useValidation)();
    return element_1.Children.map(children, function (child) {
        if ((0, element_1.isValidElement)(child)) {
            var componentProps = {
                extensions: extensions,
                cart: cart,
                checkoutExtensionData: checkoutExtensionData,
                validation: validation,
            };
            return (0, element_1.cloneElement)(child, componentProps);
        }
        return child;
    });
};
(0, atomic_utils_1.renderParentBlock)({
    Block: block_1.default,
    blockName: attributes_1.blockName,
    selector: '.wp-block-woocommerce-checkout',
    getProps: getProps,
    blockMap: (0, blocks_registry_1.getRegisteredBlockComponents)(attributes_1.blockName),
    blockWrapper: Wrapper,
});
