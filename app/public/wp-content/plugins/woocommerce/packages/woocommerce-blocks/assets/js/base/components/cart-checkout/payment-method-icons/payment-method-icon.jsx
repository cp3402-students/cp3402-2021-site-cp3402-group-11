"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get a class name for an icon.
 *
 * @param {string} id Icon ID.
 */
var getIconClassName = function (id) {
    return "wc-block-components-payment-method-icon wc-block-components-payment-method-icon--" + id;
};
/**
 * Return an element for an icon.
 *
 * @param {Object}      props     Incoming props for component.
 * @param {string}      props.id  Id for component.
 * @param {string|null} props.src Optional src value for icon.
 * @param {string}      props.alt Optional alt value for icon.
 */
var PaymentMethodIcon = function (_a) {
    var id = _a.id, _b = _a.src, src = _b === void 0 ? null : _b, _c = _a.alt, alt = _c === void 0 ? '' : _c;
    if (!src) {
        return null;
    }
    return <img className={getIconClassName(id)} src={src} alt={alt}/>;
};
exports.default = PaymentMethodIcon;
