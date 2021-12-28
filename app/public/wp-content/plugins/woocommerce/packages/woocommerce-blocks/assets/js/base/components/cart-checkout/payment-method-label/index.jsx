"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodLabel = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var icons_1 = require("@woocommerce/icons");
var types_1 = require("@woocommerce/types");
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
require("./style.scss");
var namedIcons = {
    bank: icons_1.bank,
    bill: icons_1.bill,
    card: icons_1.card,
    checkPayment: icons_1.checkPayment,
};
/**
 * Exposed to payment methods for the label shown on checkout. Allows icons to be added as well as
 * text.
 *
 * @param {Object} props Component props.
 * @param {*} props.icon Show an icon beside the text if provided. Can be a string to use a named
 *                       icon, or an SVG element.
 * @param {string} props.text Text shown next to icon.
 */
var PaymentMethodLabel = function (_a) {
    var _b = _a.icon, icon = _b === void 0 ? '' : _b, _c = _a.text, text = _c === void 0 ? '' : _c;
    var hasIcon = !!icon;
    var hasNamedIcon = (0, element_1.useCallback)(function (iconToCheck) {
        return hasIcon &&
            (0, types_1.isString)(iconToCheck) &&
            (0, types_1.objectHasProp)(namedIcons, iconToCheck);
    }, [hasIcon]);
    var className = (0, classnames_1.default)('wc-block-components-payment-method-label', {
        'wc-block-components-payment-method-label--with-icon': hasIcon,
    });
    return (<span className={className}>
			{hasNamedIcon(icon) ? (<icons_1.Icon srcElement={namedIcons[icon]}/>) : (icon)}
			{text}
		</span>);
};
exports.PaymentMethodLabel = PaymentMethodLabel;
exports.default = exports.PaymentMethodLabel;
