"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var prop_types_1 = require("prop-types");
var text_input_1 = require("@woocommerce/base-components/text-input");
var country_input_1 = require("@woocommerce/base-components/country-input");
var state_input_1 = require("@woocommerce/base-components/state-input");
var base_context_1 = require("@woocommerce/base-context");
var element_1 = require("@wordpress/element");
var i18n_1 = require("@wordpress/i18n");
var compose_1 = require("@wordpress/compose");
var base_hooks_1 = require("@woocommerce/base-hooks");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var prepare_address_fields_1 = require("./prepare-address-fields");
// If it's the shipping address form and the user starts entering address
// values without having set the country first, show an error.
var validateShippingCountry = function (values, setValidationErrors, clearValidationError, hasValidationError) {
    if (!hasValidationError &&
        !values.country &&
        (values.city || values.state || values.postcode)) {
        setValidationErrors({
            'shipping-missing-country': {
                message: (0, i18n_1.__)('Please select a country to calculate rates.', 'woo-gutenberg-products-block'),
                hidden: false,
            },
        });
    }
    if (hasValidationError && values.country) {
        clearValidationError('shipping-missing-country');
    }
};
/**
 * Checkout address form.
 *
 * @param {Object} props Incoming props for component.
 * @param {string} props.id Id for component.
 * @param {Array}  props.fields Array of fields in form.
 * @param {Object} props.fieldConfig Field configuration for fields in form.
 * @param {string} props.instanceId Unique id for form.
 * @param {function(any):any} props.onChange Function to all for an form onChange event.
 * @param {string} props.type Type of form.
 * @param {Object} props.values Values for fields.
 */
var AddressForm = function (_a) {
    var id = _a.id, _b = _a.fields, fields = _b === void 0 ? Object.keys(settings_1.defaultAddressFields) : _b, _c = _a.fieldConfig, fieldConfig = _c === void 0 ? {} : _c, instanceId = _a.instanceId, onChange = _a.onChange, _d = _a.type, type = _d === void 0 ? 'shipping' : _d, values = _a.values;
    var _e = (0, base_context_1.useValidationContext)(), getValidationError = _e.getValidationError, setValidationErrors = _e.setValidationErrors, clearValidationError = _e.clearValidationError;
    var currentFields = (0, base_hooks_1.useShallowEqual)(fields);
    var countryValidationError = (getValidationError('shipping-missing-country') || {});
    var addressFormFields = (0, element_1.useMemo)(function () {
        return (0, prepare_address_fields_1.default)(currentFields, fieldConfig, values.country);
    }, [currentFields, fieldConfig, values.country]);
    // Clear values for hidden fields.
    (0, element_1.useEffect)(function () {
        addressFormFields.forEach(function (field) {
            var _a;
            if (field.hidden && values[field.key]) {
                onChange(__assign(__assign({}, values), (_a = {}, _a[field.key] = '', _a)));
            }
        });
    }, [addressFormFields, onChange, values]);
    (0, element_1.useEffect)(function () {
        if (type === 'shipping') {
            validateShippingCountry(values, setValidationErrors, clearValidationError, !!countryValidationError.message &&
                !countryValidationError.hidden);
        }
    }, [
        values,
        countryValidationError.message,
        countryValidationError.hidden,
        setValidationErrors,
        clearValidationError,
        type,
    ]);
    id = id || instanceId;
    return (<div id={id} className="wc-block-components-address-form">
			{addressFormFields.map(function (field) {
            if (field.hidden) {
                return null;
            }
            if (field.key === 'country') {
                var Tag = type === 'shipping'
                    ? country_input_1.ShippingCountryInput
                    : country_input_1.BillingCountryInput;
                return (<Tag key={field.key} id={id + "-" + field.key} label={field.required
                        ? field.label
                        : field.optionalLabel} value={values.country} autoComplete={field.autocomplete} onChange={function (newValue) {
                        return onChange(__assign(__assign({}, values), { country: newValue, state: '' }));
                    }} errorId={type === 'shipping'
                        ? 'shipping-missing-country'
                        : null} errorMessage={field.errorMessage} required={field.required}/>);
            }
            if (field.key === 'state') {
                var Tag = type === 'shipping'
                    ? state_input_1.ShippingStateInput
                    : state_input_1.BillingStateInput;
                return (<Tag key={field.key} id={id + "-" + field.key} country={values.country} label={field.required
                        ? field.label
                        : field.optionalLabel} value={values.state} autoComplete={field.autocomplete} onChange={function (newValue) {
                        return onChange(__assign(__assign({}, values), { state: newValue }));
                    }} errorMessage={field.errorMessage} required={field.required}/>);
            }
            return (<text_input_1.ValidatedTextInput key={field.key} id={id + "-" + field.key} className={"wc-block-components-address-form__" + field.key} label={field.required ? field.label : field.optionalLabel} value={values[field.key]} autoCapitalize={field.autocapitalize} autoComplete={field.autocomplete} onChange={function (newValue) {
                    var _a;
                    return onChange(__assign(__assign({}, values), (_a = {}, _a[field.key] = newValue, _a)));
                }} errorMessage={field.errorMessage} required={field.required}/>);
        })}
		</div>);
};
AddressForm.propTypes = {
    onChange: prop_types_1.default.func.isRequired,
    values: prop_types_1.default.object.isRequired,
    fields: prop_types_1.default.arrayOf(prop_types_1.default.oneOf(Object.keys(settings_1.defaultAddressFields))),
    fieldConfig: prop_types_1.default.object,
    type: prop_types_1.default.oneOf(['billing', 'shipping']),
};
exports.default = (0, compose_1.withInstanceId)(AddressForm);
