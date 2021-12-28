"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var hooks_1 = require("@woocommerce/base-context/hooks");
var element_1 = require("@wordpress/element");
var base_utils_1 = require("@woocommerce/base-utils");
/**
 * Internal dependencies
 */
require("./style.scss");
var FrontendBlock = function (_a) {
    var children = _a.children, className = _a.className;
    var _b = (0, hooks_1.useStoreCart)(), cartItems = _b.cartItems, cartIsLoading = _b.cartIsLoading;
    (0, element_1.useEffect)(function () {
        (0, base_utils_1.dispatchEvent)('wc-blocks_render_blocks_frontend', {
            element: document.body.querySelector('.wp-block-woocommerce-cart'),
        });
    }, []);
    if (!cartIsLoading && cartItems.length === 0) {
        return <div className={className}>{children}</div>;
    }
    return null;
};
exports.default = FrontendBlock;
