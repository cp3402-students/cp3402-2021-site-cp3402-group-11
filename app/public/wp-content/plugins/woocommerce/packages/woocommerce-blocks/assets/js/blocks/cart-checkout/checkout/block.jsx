"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
var hooks_1 = require("@woocommerce/base-context/hooks");
var base_context_1 = require("@woocommerce/base-context");
var providers_1 = require("@woocommerce/base-context/providers");
var block_error_boundary_1 = require("@woocommerce/base-components/block-error-boundary");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var settings_1 = require("@woocommerce/settings");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var with_scroll_to_top_1 = require("@woocommerce/base-hocs/with-scroll-to-top");
/**
 * Internal dependencies
 */
require("./styles/style.scss");
var empty_cart_1 = require("./empty-cart");
var checkout_order_error_1 = require("./checkout-order-error");
var utils_1 = require("./utils");
var context_1 = require("./context");
var LoginPrompt = function () {
    return (<>
			{(0, i18n_1.__)('You must be logged in to checkout. ', 'woo-gutenberg-products-block')}
			<a href={utils_1.LOGIN_TO_CHECKOUT_URL}>
				{(0, i18n_1.__)('Click here to log in.', 'woo-gutenberg-products-block')}
			</a>
		</>);
};
var Checkout = function (_a) {
    var attributes = _a.attributes, children = _a.children;
    var _b = (0, base_context_1.useCheckoutContext)(), hasOrder = _b.hasOrder, customerId = _b.customerId;
    var _c = (0, hooks_1.useStoreCart)(), cartItems = _c.cartItems, cartIsLoading = _c.cartIsLoading;
    var allowCreateAccount = attributes.allowCreateAccount, showCompanyField = attributes.showCompanyField, requireCompanyField = attributes.requireCompanyField, showApartmentField = attributes.showApartmentField, showPhoneField = attributes.showPhoneField, requirePhoneField = attributes.requirePhoneField;
    if (!cartIsLoading && cartItems.length === 0) {
        return <empty_cart_1.default />;
    }
    if (!hasOrder) {
        return <checkout_order_error_1.default />;
    }
    if ((0, utils_1.isLoginRequired)(customerId) &&
        allowCreateAccount &&
        (0, settings_1.getSetting)('checkoutAllowsSignup', false)) {
        <LoginPrompt />;
    }
    return (<context_1.CheckoutBlockContext.Provider value={{
            allowCreateAccount: allowCreateAccount,
            showCompanyField: showCompanyField,
            requireCompanyField: requireCompanyField,
            showApartmentField: showApartmentField,
            showPhoneField: showPhoneField,
            requirePhoneField: requirePhoneField,
        }}>
			{children}
		</context_1.CheckoutBlockContext.Provider>);
};
var ScrollOnError = function (_a) {
    var scrollToTop = _a.scrollToTop;
    var hasNoticesOfType = (0, hooks_1.useStoreNotices)().hasNoticesOfType;
    var _b = (0, base_context_1.useCheckoutContext)(), checkoutHasError = _b.hasError, checkoutIsIdle = _b.isIdle;
    var _c = (0, base_context_1.useValidationContext)(), hasValidationErrors = _c.hasValidationErrors, showAllValidationErrors = _c.showAllValidationErrors;
    var hasErrorsToDisplay = checkoutIsIdle &&
        checkoutHasError &&
        (hasValidationErrors || hasNoticesOfType('default'));
    (0, element_1.useEffect)(function () {
        var scrollToTopTimeout;
        if (hasErrorsToDisplay) {
            showAllValidationErrors();
            // Scroll after a short timeout to allow a re-render. This will allow focusableSelector to match updated components.
            scrollToTopTimeout = window.setTimeout(function () {
                scrollToTop({
                    focusableSelector: 'input:invalid, .has-error input',
                });
            }, 50);
        }
        return function () {
            clearTimeout(scrollToTopTimeout);
        };
    }, [hasErrorsToDisplay, scrollToTop, showAllValidationErrors]);
    return null;
};
var Block = function (_a) {
    var attributes = _a.attributes, children = _a.children, scrollToTop = _a.scrollToTop;
    return (<block_error_boundary_1.default header={(0, i18n_1.__)('Something went wrong…', 'woo-gutenberg-products-block')} text={(0, element_1.createInterpolateElement)((0, i18n_1.__)('The checkout has encountered an unexpected error. <button>Try reloading the page</button>. If the error persists, please get in touch with us so we can assist.', 'woo-gutenberg-products-block'), {
            button: (<button className="wc-block-link-button" onClick={utils_1.reloadPage}/>),
        })} showErrorMessage={settings_1.CURRENT_USER_IS_ADMIN}>
		<providers_1.StoreSnackbarNoticesProvider context="wc/checkout">
			<base_context_1.StoreNoticesProvider context="wc/checkout">
				<base_context_1.ValidationContextProvider>
					{/* SlotFillProvider need to be defined before CheckoutProvider so fills have the SlotFill context ready when they mount. */}
					<blocks_checkout_1.SlotFillProvider>
						<base_context_1.CheckoutProvider>
							<sidebar_layout_1.SidebarLayout className={(0, classnames_1.default)('wc-block-checkout', {
            'has-dark-controls': attributes.hasDarkControls,
        })}>
								<Checkout attributes={attributes}>
									{children}
								</Checkout>
								<ScrollOnError scrollToTop={scrollToTop}/>
							</sidebar_layout_1.SidebarLayout>
						</base_context_1.CheckoutProvider>
					</blocks_checkout_1.SlotFillProvider>
				</base_context_1.ValidationContextProvider>
			</base_context_1.StoreNoticesProvider>
		</providers_1.StoreSnackbarNoticesProvider>
	</block_error_boundary_1.default>);
};
exports.default = (0, with_scroll_to_top_1.default)(Block);
