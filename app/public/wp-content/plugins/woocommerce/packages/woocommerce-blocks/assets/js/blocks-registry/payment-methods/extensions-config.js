"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensionsConfig = exports.canMakePaymentExtensionsCallbacks = void 0;
// Keeps callbacks registered by extensions for different payment methods
//  eslint-disable-next-line prefer-const
exports.canMakePaymentExtensionsCallbacks = {};
exports.extensionsConfig = {
    canMakePayment: exports.canMakePaymentExtensionsCallbacks,
};
