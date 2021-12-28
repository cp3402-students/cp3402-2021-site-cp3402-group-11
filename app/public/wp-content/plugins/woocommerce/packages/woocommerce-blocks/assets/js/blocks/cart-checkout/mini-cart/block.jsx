"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var base_utils_1 = require("@woocommerce/base-utils");
var hooks_1 = require("@woocommerce/base-context/hooks");
var drawer_1 = require("@woocommerce/base-components/drawer");
var price_format_1 = require("@woocommerce/price-format");
var settings_1 = require("@woocommerce/settings");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var payment_method_icons_1 = require("@woocommerce/base-components/cart-checkout/payment-method-icons");
var block_settings_1 = require("@woocommerce/block-settings");
var button_1 = require("@woocommerce/base-components/button");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var cart_line_items_table_1 = require("../cart/cart-line-items-table");
var quantity_badge_1 = require("./quantity-badge");
require("./style.scss");
var PaymentMethodIconsElement = function () {
    var paymentMethods = (0, hooks_1.usePaymentMethods)().paymentMethods;
    return (<payment_method_icons_1.default icons={(0, base_utils_1.getIconsFromPaymentMethods)(paymentMethods)}/>);
};
var MiniCartBlock = function (_a) {
    var _b, _c;
    var _d = _a.isInitiallyOpen, isInitiallyOpen = _d === void 0 ? false : _d, colorClassNames = _a.colorClassNames, style = _a.style;
    var _e = (0, hooks_1.useStoreCart)(), cartItems = _e.cartItems, cartItemsCount = _e.cartItemsCount, cartIsLoading = _e.cartIsLoading, cartTotals = _e.cartTotals;
    var _f = (0, element_1.useState)(isInitiallyOpen), isOpen = _f[0], setIsOpen = _f[1];
    var emptyCartRef = (0, element_1.useRef)(null);
    // We already rendered the HTML drawer placeholder, so we want to skip the
    // slide in animation.
    var _g = (0, element_1.useState)(isInitiallyOpen), skipSlideIn = _g[0], setSkipSlideIn = _g[1];
    (0, element_1.useEffect)(function () {
        var openMiniCart = function () {
            setSkipSlideIn(false);
            setIsOpen(true);
        };
        // Make it so we can read jQuery events triggered by WC Core elements.
        var removeJQueryAddedToCartEvent = (0, base_utils_1.translateJQueryEventToNative)('added_to_cart', 'wc-blocks_added_to_cart');
        document.body.addEventListener('wc-blocks_added_to_cart', openMiniCart);
        return function () {
            removeJQueryAddedToCartEvent();
            document.body.removeEventListener('wc-blocks_added_to_cart', openMiniCart);
        };
    }, []);
    (0, element_1.useEffect)(function () {
        // If the cart has been completely emptied, move focus to empty cart
        // element.
        if (isOpen && !cartIsLoading && cartItems.length === 0) {
            if (emptyCartRef.current instanceof HTMLElement) {
                emptyCartRef.current.focus();
            }
        }
    }, [isOpen, cartIsLoading, cartItems.length, emptyCartRef]);
    var subTotal = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
        ? parseInt(cartTotals.total_items, 10) +
            parseInt(cartTotals.total_items_tax, 10)
        : parseInt(cartTotals.total_items, 10);
    var ariaLabel = (0, i18n_1.sprintf)(
    /* translators: %1$d is the number of products in the cart. %2$s is the cart total */
    (0, i18n_1._n)('%1$d item in cart, total price of %2$s', '%1$d items in cart, total price of %2$s', cartItemsCount, 'woo-gutenberg-products-block'), cartItemsCount, (0, price_format_1.formatPrice)(subTotal, (0, price_format_1.getCurrencyFromPriceResponse)(cartTotals)));
    var colorStyle = {
        backgroundColor: (_b = style === null || style === void 0 ? void 0 : style.color) === null || _b === void 0 ? void 0 : _b.background,
        color: (_c = style === null || style === void 0 ? void 0 : style.color) === null || _c === void 0 ? void 0 : _c.text,
    };
    var contents = !cartIsLoading && cartItems.length === 0 ? (<div className="wc-block-mini-cart__empty-cart" tabIndex={-1} ref={emptyCartRef}>
				{(0, i18n_1.__)('Cart is empty', 'woo-gutenberg-products-block')}
			</div>) : (<>
				<div className="wc-block-mini-cart__items">
					<cart_line_items_table_1.default lineItems={cartItems} isLoading={cartIsLoading}/>
				</div>
				<div className="wc-block-mini-cart__footer">
					<blocks_checkout_1.TotalsItem className="wc-block-mini-cart__footer-subtotal" currency={(0, price_format_1.getCurrencyFromPriceResponse)(cartTotals)} label={(0, i18n_1.__)('Subtotal', 'woo-gutenberg-products-block')} value={subTotal} description={(0, i18n_1.__)('Shipping, taxes, and discounts calculated at checkout.', 'woo-gutenberg-products-block')}/>
					<div className="wc-block-mini-cart__footer-actions">
						<button_1.default className="wc-block-mini-cart__footer-cart" href={block_settings_1.CART_URL}>
							{(0, i18n_1.__)('View my cart', 'woo-gutenberg-products-block')}
						</button_1.default>
						<button_1.default className="wc-block-mini-cart__footer-checkout" href={block_settings_1.CHECKOUT_URL}>
							{(0, i18n_1.__)('Go to checkout', 'woo-gutenberg-products-block')}
						</button_1.default>
					</div>
					<base_context_1.PaymentMethodDataProvider>
						<PaymentMethodIconsElement />
					</base_context_1.PaymentMethodDataProvider>
				</div>
			</>);
    return (<>
			<button className={"wc-block-mini-cart__button " + colorClassNames} style={colorStyle} onClick={function () {
            if (!isOpen) {
                setIsOpen(true);
                setSkipSlideIn(false);
            }
        }} aria-label={ariaLabel}>
				<span className="wc-block-mini-cart__amount">
					{(0, price_format_1.formatPrice)(subTotal, (0, price_format_1.getCurrencyFromPriceResponse)(cartTotals))}
				</span>
				<quantity_badge_1.default count={cartItemsCount} colorClassNames={colorClassNames} style={colorStyle}/>
			</button>
			<drawer_1.default className={(0, classnames_1.default)('wc-block-mini-cart__drawer', 'is-mobile', {
            'is-loading': cartIsLoading,
        })} title={cartIsLoading
            ? (0, i18n_1.__)('Your cart', 'woo-gutenberg-products-block')
            : (0, i18n_1.sprintf)(
            /* translators: %d is the count of items in the cart. */
            (0, i18n_1._n)('Your cart (%d item)', 'Your cart (%d items)', cartItemsCount, 'woo-gutenberg-products-block'), cartItemsCount)} isOpen={isOpen} onClose={function () {
            setIsOpen(false);
        }} slideIn={!skipSlideIn}>
				{contents}
			</drawer_1.default>
		</>);
};
exports.default = MiniCartBlock;
