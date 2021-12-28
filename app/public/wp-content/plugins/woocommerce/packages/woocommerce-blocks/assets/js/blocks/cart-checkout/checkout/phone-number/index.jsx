"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var text_input_1 = require("@woocommerce/base-components/text-input");
/**
 * Renders a phone number input.
 */
var PhoneNumber = function (_a) {
    var _b = _a.id, id = _b === void 0 ? 'phone' : _b, _c = _a.isRequired, isRequired = _c === void 0 ? false : _c, _d = _a.value, value = _d === void 0 ? '' : _d, onChange = _a.onChange;
    return (<text_input_1.ValidatedTextInput id={id} type="tel" autoComplete="tel" required={isRequired} label={isRequired
            ? (0, i18n_1.__)('Phone', 'woo-gutenberg-products-block')
            : (0, i18n_1.__)('Phone (optional)', 'woo-gutenberg-products-block')} value={value} onChange={onChange}/>);
};
exports.default = PhoneNumber;
