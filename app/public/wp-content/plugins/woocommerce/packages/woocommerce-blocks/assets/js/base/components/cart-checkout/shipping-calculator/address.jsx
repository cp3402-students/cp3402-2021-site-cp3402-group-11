"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var button_1 = require("@woocommerce/base-components/button");
var element_1 = require("@wordpress/element");
var is_shallow_equal_1 = require("@wordpress/is-shallow-equal");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
require("./style.scss");
var address_form_1 = require("../address-form");
var ShippingCalculatorAddress = function (_a) {
    var initialAddress = _a.address, onUpdate = _a.onUpdate, addressFields = _a.addressFields;
    var _b = (0, element_1.useState)(initialAddress), address = _b[0], setAddress = _b[1];
    var _c = (0, base_context_1.useValidationContext)(), hasValidationErrors = _c.hasValidationErrors, showAllValidationErrors = _c.showAllValidationErrors;
    var validateSubmit = function () {
        showAllValidationErrors();
        return !hasValidationErrors;
    };
    return (<form className="wc-block-components-shipping-calculator-address">
			<address_form_1.AddressForm fields={addressFields} onChange={setAddress} values={address}/>
			<button_1.default className="wc-block-components-shipping-calculator-address__button" disabled={(0, is_shallow_equal_1.default)(address, initialAddress)} onClick={function (e) {
            e.preventDefault();
            var isAddressValid = validateSubmit();
            if (isAddressValid) {
                return onUpdate(address);
            }
        }} type="submit">
				{(0, i18n_1.__)('Update', 'woo-gutenberg-products-block')}
			</button_1.default>
		</form>);
};
exports.default = ShippingCalculatorAddress;
