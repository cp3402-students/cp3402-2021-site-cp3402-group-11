"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconsFromPaymentMethods = void 0;
/**
 * Get the provider icons from payment methods data.
 *
 * @todo Refactor the Cart blocks to use getIconsFromPaymentMethods utility instead of the local copy.
 *
 * @param {PaymentMethods} paymentMethods Payment Method data
 * @return {PaymentMethodIconsType} Payment Method icons data.
 */
var getIconsFromPaymentMethods = function (paymentMethods) {
    return Object.values(paymentMethods).reduce(function (acc, paymentMethod) {
        if (paymentMethod.icons !== null) {
            acc = acc.concat(paymentMethod.icons);
        }
        return acc;
    }, []);
};
exports.getIconsFromPaymentMethods = getIconsFromPaymentMethods;
