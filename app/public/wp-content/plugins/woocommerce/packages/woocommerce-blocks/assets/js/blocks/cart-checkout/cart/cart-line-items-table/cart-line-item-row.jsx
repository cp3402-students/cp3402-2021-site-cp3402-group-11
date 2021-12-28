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
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var a11y_1 = require("@wordpress/a11y");
var quantity_selector_1 = require("@woocommerce/base-components/quantity-selector");
var product_price_1 = require("@woocommerce/base-components/product-price");
var product_name_1 = require("@woocommerce/base-components/product-name");
var hooks_1 = require("@woocommerce/base-context/hooks");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var price_format_1 = require("@woocommerce/price-format");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var dinero_js_1 = require("dinero.js");
var element_1 = require("@wordpress/element");
var types_1 = require("@woocommerce/types");
var settings_1 = require("@woocommerce/settings");
/**
 * Convert a Dinero object with precision to store currency minor unit.
 *
 * @param {Dinero} priceObject Price object to convert.
 * @param {Object} currency    Currency data.
 * @return {number} Amount with new minor unit precision.
 */
var getAmountFromRawPrice = function (priceObject, currency) {
    return priceObject.convertPrecision(currency.minorUnit).getAmount();
};
var productPriceValidation = function (value) { return (0, blocks_checkout_1.mustContain)(value, '<price/>'); };
/**
 * Cart line item table row component.
 */
var CartLineItemRow = (0, element_1.forwardRef)(function (_a, ref) {
    var lineItem = _a.lineItem, _b = _a.onRemove, onRemove = _b === void 0 ? function () { return void null; } : _b, _c = _a.tabIndex, tabIndex = _c === void 0 ? null : _c;
    var _d = lineItem.name, initialName = _d === void 0 ? '' : _d, _e = lineItem.catalog_visibility, catalogVisibility = _e === void 0 ? 'visible' : _e, _f = lineItem.short_description, shortDescription = _f === void 0 ? '' : _f, _g = lineItem.description, fullDescription = _g === void 0 ? '' : _g, _h = lineItem.low_stock_remaining, lowStockRemaining = _h === void 0 ? null : _h, _j = lineItem.show_backorder_badge, showBackorderBadge = _j === void 0 ? false : _j, _k = lineItem.quantity_limit, quantityLimit = _k === void 0 ? 99 : _k, _l = lineItem.permalink, permalink = _l === void 0 ? '' : _l, _m = lineItem.images, images = _m === void 0 ? [] : _m, _o = lineItem.variation, variation = _o === void 0 ? [] : _o, _p = lineItem.item_data, itemData = _p === void 0 ? [] : _p, _q = lineItem.prices, prices = _q === void 0 ? {
        currency_code: 'USD',
        currency_minor_unit: 2,
        currency_symbol: '$',
        currency_prefix: '$',
        currency_suffix: '',
        currency_decimal_separator: '.',
        currency_thousand_separator: ',',
        price: '0',
        regular_price: '0',
        sale_price: '0',
        price_range: null,
        raw_prices: {
            precision: 6,
            price: '0',
            regular_price: '0',
            sale_price: '0',
        },
    } : _q, _r = lineItem.totals, totals = _r === void 0 ? {
        currency_code: 'USD',
        currency_minor_unit: 2,
        currency_symbol: '$',
        currency_prefix: '$',
        currency_suffix: '',
        currency_decimal_separator: '.',
        currency_thousand_separator: ',',
        line_subtotal: '0',
        line_subtotal_tax: '0',
    } : _r, extensions = lineItem.extensions;
    var _s = (0, hooks_1.useStoreCartItemQuantity)(lineItem), quantity = _s.quantity, setItemQuantity = _s.setItemQuantity, removeItem = _s.removeItem, isPendingDelete = _s.isPendingDelete;
    var dispatchStoreEvent = (0, hooks_1.useStoreEvents)().dispatchStoreEvent;
    // Prepare props to pass to the __experimentalApplyCheckoutFilter filter.
    // We need to pluck out receiveCart.
    // eslint-disable-next-line no-unused-vars
    var _t = (0, hooks_1.useStoreCart)(), receiveCart = _t.receiveCart, cart = __rest(_t, ["receiveCart"]);
    var arg = (0, element_1.useMemo)(function () { return ({
        context: 'cart',
        cartItem: lineItem,
        cart: cart,
    }); }, [lineItem, cart]);
    var priceCurrency = (0, price_format_1.getCurrencyFromPriceResponse)(prices);
    var name = (0, blocks_checkout_1.__experimentalApplyCheckoutFilter)({
        filterName: 'itemName',
        defaultValue: initialName,
        extensions: extensions,
        arg: arg,
    });
    var regularAmountSingle = (0, dinero_js_1.default)({
        amount: parseInt(prices.raw_prices.regular_price, 10),
        precision: prices.raw_prices.precision,
    });
    var purchaseAmountSingle = (0, dinero_js_1.default)({
        amount: parseInt(prices.raw_prices.price, 10),
        precision: prices.raw_prices.precision,
    });
    var saleAmountSingle = regularAmountSingle.subtract(purchaseAmountSingle);
    var saleAmount = saleAmountSingle.multiply(quantity);
    var totalsCurrency = (0, price_format_1.getCurrencyFromPriceResponse)(totals);
    var lineSubtotal = parseInt(totals.line_subtotal, 10);
    if ((0, settings_1.getSetting)('displayCartPricesIncludingTax', false)) {
        lineSubtotal += parseInt(totals.line_subtotal_tax, 10);
    }
    var subtotalPrice = (0, dinero_js_1.default)({
        amount: lineSubtotal,
        precision: totalsCurrency.minorUnit,
    });
    var firstImage = images.length ? images[0] : {};
    var isProductHiddenFromCatalog = catalogVisibility === 'hidden' || catalogVisibility === 'search';
    var cartItemClassNameFilter = (0, blocks_checkout_1.__experimentalApplyCheckoutFilter)({
        filterName: 'cartItemClass',
        defaultValue: '',
        extensions: extensions,
        arg: arg,
    });
    // Allow extensions to filter how the price is displayed. Ie: prepending or appending some values.
    var productPriceFormat = (0, blocks_checkout_1.__experimentalApplyCheckoutFilter)({
        filterName: 'cartItemPrice',
        defaultValue: '<price/>',
        extensions: extensions,
        arg: arg,
        validation: productPriceValidation,
    });
    var subtotalPriceFormat = (0, blocks_checkout_1.__experimentalApplyCheckoutFilter)({
        filterName: 'subtotalPriceFormat',
        defaultValue: '<price/>',
        extensions: extensions,
        arg: arg,
        validation: productPriceValidation,
    });
    var saleBadgePriceFormat = (0, blocks_checkout_1.__experimentalApplyCheckoutFilter)({
        filterName: 'saleBadgePriceFormat',
        defaultValue: '<price/>',
        extensions: extensions,
        arg: arg,
        validation: productPriceValidation,
    });
    return (<tr className={(0, classnames_1.default)('wc-block-cart-items__row', cartItemClassNameFilter, {
            'is-disabled': isPendingDelete,
        })} ref={ref} tabIndex={tabIndex}>
				{/* If the image has no alt text, this link is unnecessary and can be hidden. */}
				<td className="wc-block-cart-item__image" aria-hidden={!(0, types_1.objectHasProp)(firstImage, 'alt') || !firstImage.alt}>
					{/* We don't need to make it focusable, because product name has the same link. */}
					{isProductHiddenFromCatalog ? (<cart_checkout_1.ProductImage image={firstImage} fallbackAlt={name}/>) : (<a href={permalink} tabIndex={-1}>
							<cart_checkout_1.ProductImage image={firstImage} fallbackAlt={name}/>
						</a>)}
				</td>
				<td className="wc-block-cart-item__product">
					<product_name_1.default disabled={isPendingDelete || isProductHiddenFromCatalog} name={name} permalink={permalink}/>
					{showBackorderBadge ? (<cart_checkout_1.ProductBackorderBadge />) : (!!lowStockRemaining && (<cart_checkout_1.ProductLowStockBadge lowStockRemaining={lowStockRemaining}/>))}

					<div className="wc-block-cart-item__prices">
						<product_price_1.default currency={priceCurrency} regularPrice={getAmountFromRawPrice(regularAmountSingle, priceCurrency)} price={getAmountFromRawPrice(purchaseAmountSingle, priceCurrency)} format={subtotalPriceFormat}/>
					</div>

					<cart_checkout_1.ProductSaleBadge currency={priceCurrency} saleAmount={getAmountFromRawPrice(saleAmountSingle, priceCurrency)} format={saleBadgePriceFormat}/>

					<cart_checkout_1.ProductMetadata shortDescription={shortDescription} fullDescription={fullDescription} itemData={itemData} variation={variation}/>

					<div className="wc-block-cart-item__quantity">
						<quantity_selector_1.default disabled={isPendingDelete} quantity={quantity} maximum={quantityLimit} onChange={function (newQuantity) {
            setItemQuantity(newQuantity);
            dispatchStoreEvent('cart-set-item-quantity', {
                product: lineItem,
                quantity: newQuantity,
            });
        }} itemName={name}/>
						<button className="wc-block-cart-item__remove-link" onClick={function () {
            onRemove();
            removeItem();
            dispatchStoreEvent('cart-remove-item', {
                product: lineItem,
                quantity: quantity,
            });
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %s refers to the item name in the cart. */
            (0, i18n_1.__)('%s has been removed from your cart.', 'woo-gutenberg-products-block'), name));
        }} disabled={isPendingDelete}>
							{(0, i18n_1.__)('Remove item', 'woo-gutenberg-products-block')}
						</button>
					</div>
				</td>
				<td className="wc-block-cart-item__total">
					<div className="wc-block-cart-item__total-price-and-sale-badge-wrapper">
						<product_price_1.default currency={totalsCurrency} format={productPriceFormat} price={subtotalPrice.getAmount()}/>

						{quantity > 1 && (<cart_checkout_1.ProductSaleBadge currency={priceCurrency} saleAmount={getAmountFromRawPrice(saleAmount, priceCurrency)} format={saleBadgePriceFormat}/>)}
					</div>
				</td>
			</tr>);
});
exports.default = CartLineItemRow;
