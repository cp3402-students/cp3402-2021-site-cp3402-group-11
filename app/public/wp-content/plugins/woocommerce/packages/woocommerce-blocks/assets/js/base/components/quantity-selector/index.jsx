"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var a11y_1 = require("@wordpress/a11y");
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
var keycodes_1 = require("@wordpress/keycodes");
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
require("./style.scss");
var QuantitySelector = function (_a) {
    var className = _a.className, _b = _a.quantity, quantity = _b === void 0 ? 1 : _b, _c = _a.minimum, minimum = _c === void 0 ? 1 : _c, maximum = _a.maximum, _d = _a.onChange, onChange = _d === void 0 ? function () {
        /* Do nothing. */
    } : _d, _e = _a.itemName, itemName = _e === void 0 ? '' : _e, disabled = _a.disabled;
    var classes = (0, classnames_1.default)('wc-block-components-quantity-selector', className);
    var hasMaximum = typeof maximum !== 'undefined';
    var canDecrease = quantity > minimum;
    var canIncrease = !hasMaximum || quantity < maximum;
    /**
     * Handles keyboard up and down keys to change quantity value.
     *
     * @param {Object} event event data.
     */
    var quantityInputOnKeyDown = (0, element_1.useCallback)(function (event) {
        var isArrowDown = typeof event.key !== undefined
            ? event.key === 'ArrowDown'
            : event.keyCode === keycodes_1.DOWN;
        var isArrowUp = typeof event.key !== undefined
            ? event.key === 'ArrowUp'
            : event.keyCode === keycodes_1.UP;
        if (isArrowDown && canDecrease) {
            event.preventDefault();
            onChange(quantity - 1);
        }
        if (isArrowUp && canIncrease) {
            event.preventDefault();
            onChange(quantity + 1);
        }
    }, [quantity, onChange, canIncrease, canDecrease]);
    return (<div className={classes}>
			<input className="wc-block-components-quantity-selector__input" disabled={disabled} type="number" step="1" min="0" value={quantity} onKeyDown={quantityInputOnKeyDown} onChange={function (event) {
            var value = !(0, types_1.isNumber)(event.target.value) || !event.target.value
                ? 0
                : parseInt(event.target.value, 10);
            if (hasMaximum) {
                value = Math.min(value, maximum);
            }
            value = Math.max(value, minimum);
            if (value !== quantity) {
                onChange(value);
            }
        }} aria-label={(0, i18n_1.sprintf)(
        /* translators: %s refers to the item name in the cart. */
        (0, i18n_1.__)('Quantity of %s in your cart.', 'woo-gutenberg-products-block'), itemName)}/>
			<button aria-label={(0, i18n_1.__)('Reduce quantity', 'woo-gutenberg-products-block')} className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--minus" disabled={disabled || !canDecrease} onClick={function () {
            var newQuantity = quantity - 1;
            onChange(newQuantity);
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %s refers to the item name in the cart. */
            (0, i18n_1.__)('Quantity reduced to %s.', 'woo-gutenberg-products-block'), newQuantity));
        }}>
				&#65293;
			</button>
			<button aria-label={(0, i18n_1.__)('Increase quantity', 'woo-gutenberg-products-block')} disabled={disabled || !canIncrease} className="wc-block-components-quantity-selector__button wc-block-components-quantity-selector__button--plus" onClick={function () {
            var newQuantity = quantity + 1;
            onChange(newQuantity);
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %s refers to the item name in the cart. */
            (0, i18n_1.__)('Quantity increased to %s.', 'woo-gutenberg-products-block'), newQuantity));
        }}>
				&#65291;
			</button>
		</div>);
};
exports.default = QuantitySelector;
