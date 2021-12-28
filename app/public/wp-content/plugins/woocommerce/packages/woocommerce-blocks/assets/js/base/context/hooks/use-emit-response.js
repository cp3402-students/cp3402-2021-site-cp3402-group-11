"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEmitResponse = exports.shouldRetry = exports.isFailResponse = exports.isErrorResponse = exports.isSuccessResponse = exports.noticeContexts = exports.responseTypes = void 0;
/**
 * External dependencies
 */
var types_1 = require("@woocommerce/types");
var responseTypes;
(function (responseTypes) {
    responseTypes["SUCCESS"] = "success";
    responseTypes["FAIL"] = "failure";
    responseTypes["ERROR"] = "error";
})(responseTypes = exports.responseTypes || (exports.responseTypes = {}));
var noticeContexts;
(function (noticeContexts) {
    noticeContexts["PAYMENTS"] = "wc/payment-area";
    noticeContexts["EXPRESS_PAYMENTS"] = "wc/express-payment-area";
})(noticeContexts = exports.noticeContexts || (exports.noticeContexts = {}));
var isResponseOf = function (response, type) {
    return (0, types_1.isObject)(response) && 'type' in response && response.type === type;
};
var isSuccessResponse = function (response) {
    return isResponseOf(response, responseTypes.SUCCESS);
};
exports.isSuccessResponse = isSuccessResponse;
var isErrorResponse = function (response) {
    return isResponseOf(response, responseTypes.ERROR);
};
exports.isErrorResponse = isErrorResponse;
var isFailResponse = function (response) {
    return isResponseOf(response, responseTypes.FAIL);
};
exports.isFailResponse = isFailResponse;
var shouldRetry = function (response) {
    return (!(0, types_1.isObject)(response) ||
        typeof response.retry === 'undefined' ||
        response.retry === true);
};
exports.shouldRetry = shouldRetry;
/**
 * A custom hook exposing response utilities for emitters.
 */
var useEmitResponse = function () {
    return ({
        responseTypes: responseTypes,
        noticeContexts: noticeContexts,
        shouldRetry: exports.shouldRetry,
        isSuccessResponse: exports.isSuccessResponse,
        isErrorResponse: exports.isErrorResponse,
        isFailResponse: exports.isFailResponse,
    });
};
exports.useEmitResponse = useEmitResponse;
