"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var wordpress_components_1 = require("wordpress-components");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
var base_context_1 = require("@woocommerce/base-context");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var phone_number_1 = require("../../phone-number");
var Block = function (_a) {
    var _b = _a.showCompanyField, showCompanyField = _b === void 0 ? false : _b, _c = _a.showApartmentField, showApartmentField = _c === void 0 ? false : _c, _d = _a.showPhoneField, showPhoneField = _d === void 0 ? false : _d, _e = _a.requireCompanyField, requireCompanyField = _e === void 0 ? false : _e, _f = _a.requirePhoneField, requirePhoneField = _f === void 0 ? false : _f;
    var _g = (0, base_context_1.useCheckoutAddress)(), defaultAddressFields = _g.defaultAddressFields, setShippingFields = _g.setShippingFields, shippingFields = _g.shippingFields, setShippingAsBilling = _g.setShippingAsBilling, shippingAsBilling = _g.shippingAsBilling, setShippingPhone = _g.setShippingPhone;
    var dispatchCheckoutEvent = (0, base_context_1.useStoreEvents)().dispatchCheckoutEvent;
    var isEditor = (0, base_context_1.useEditorContext)().isEditor;
    // Clears data if fields are hidden.
    (0, element_1.useEffect)(function () {
        if (!showPhoneField) {
            setShippingPhone('');
        }
    }, [showPhoneField, setShippingPhone]);
    var addressFieldsConfig = (0, element_1.useMemo)(function () {
        return {
            company: {
                hidden: !showCompanyField,
                required: requireCompanyField,
            },
            address_2: {
                hidden: !showApartmentField,
            },
        };
    }, [showCompanyField, requireCompanyField, showApartmentField]);
    var AddressFormWrapperComponent = isEditor ? wordpress_components_1.Disabled : element_1.Fragment;
    return (<>
			<AddressFormWrapperComponent>
				<cart_checkout_1.AddressForm id="shipping" type="shipping" onChange={function (values) {
            setShippingFields(values);
            dispatchCheckoutEvent('set-shipping-address');
        }} values={shippingFields} fields={Object.keys(defaultAddressFields)} fieldConfig={addressFieldsConfig}/>
				{showPhoneField && (<phone_number_1.default id="shipping-phone" isRequired={requirePhoneField} value={shippingFields.phone} onChange={function (value) {
                setShippingPhone(value);
                dispatchCheckoutEvent('set-phone-number', {
                    step: 'shipping',
                });
            }}/>)}
			</AddressFormWrapperComponent>
			<blocks_checkout_1.CheckboxControl className="wc-block-checkout__use-address-for-billing" label={(0, i18n_1.__)('Use same address for billing', 'woo-gutenberg-products-block')} checked={shippingAsBilling} onChange={function (checked) {
            return setShippingAsBilling(checked);
        }}/>
		</>);
};
exports.default = Block;
