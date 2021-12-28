"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var hooks_1 = require("@woocommerce/base-context/hooks");
var element_1 = require("@wordpress/element");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
var context_1 = require("../../context");
var FrontendBlock = function (_a) {
    var children = _a.children, className = _a.className;
    var _b = (0, hooks_1.useStoreCart)(), cartItems = _b.cartItems, cartIsLoading = _b.cartIsLoading, cartItemErrors = _b.cartItemErrors;
    var hasDarkControls = (0, context_1.useCartBlockContext)().hasDarkControls;
    var addErrorNotice = (0, hooks_1.useStoreNotices)().addErrorNotice;
    // Ensures any cart errors listed in the API response get shown.
    (0, element_1.useEffect)(function () {
        cartItemErrors.forEach(function (error) {
            addErrorNotice((0, html_entities_1.decodeEntities)(error.message), {
                isDismissible: true,
                id: error.code,
            });
        });
    }, [addErrorNotice, cartItemErrors]);
    if (cartIsLoading || cartItems.length >= 1) {
        return (<sidebar_layout_1.SidebarLayout className={(0, classnames_1.default)('wc-block-cart', className, {
                'has-dark-controls': hasDarkControls,
            })}>
				{children}
			</sidebar_layout_1.SidebarLayout>);
    }
    return null;
};
exports.default = FrontendBlock;
