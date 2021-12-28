"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var wordpress_components_1 = require("wordpress-components");
var base_context_1 = require("@woocommerce/base-context");
var cart_checkout_1 = require("@woocommerce/base-components/cart-checkout");
/**
 * Internal dependencies
 */
var phone_number_1 = require("../../phone-number");
var Block = function (_a) {
    var _b = _a.showCompanyField, showCompanyField = _b === void 0 ? false : _b, _c = _a.showApartmentField, showApartmentField = _c === void 0 ? false : _c, _d = _a.showPhoneField, showPhoneField = _d === void 0 ? false : _d, _e = _a.requireCompanyField, requireCompanyField = _e === void 0 ? false : _e, _f = _a.requirePhoneField, requirePhoneField = _f === void 0 ? false : _f;
    var _g = (0, base_context_1.useCheckoutAddress)(), defaultAddressFields = _g.defaultAddressFields, billingFields = _g.billingFields, setBillingFields = _g.setBillingFields, setPhone = _g.setPhone;
    var dispatchCheckoutEvent = (0, base_context_1.useStoreEvents)().dispatchCheckoutEvent;
    var isEditor = (0, base_context_1.useEditorContext)().isEditor;
    // Clears data if fields are hidden.
    (0, element_1.useEffect)(function () {
        if (!showPhoneField) {
            setPhone('');
        }
    }, [showPhoneField, setPhone]);
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
    return (<AddressFormWrapperComponent>
			<cart_checkout_1.AddressForm id="billing" type="billing" onChange={function (values) {
            setBillingFields(values);
            dispatchCheckoutEvent('set-billing-address');
        }} values={billingFields} fields={Object.keys(defaultAddressFields)} fieldConfig={addressFieldsConfig}/>
			{showPhoneField && (<phone_number_1.default isRequired={requirePhoneField} value={billingFields.phone} onChange={function (value) {
                setPhone(value);
                dispatchCheckoutEvent('set-phone-number', {
                    step: 'billing',
                });
            }}/>)}
		</AddressFormWrapperComponent>);
};
exports.default = Block;
