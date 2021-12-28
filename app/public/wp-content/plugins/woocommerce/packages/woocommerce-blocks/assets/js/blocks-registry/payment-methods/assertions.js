"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertConfigHasProperties = exports.assertValidElementOrString = exports.assertValidElement = exports.assertValidPaymentMethodComponent = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var assertValidPaymentMethodComponent = function (component, componentName) {
    if (typeof component !== 'function') {
        throw new TypeError("The " + componentName + " property for the payment method must be a functional component");
    }
};
exports.assertValidPaymentMethodComponent = assertValidPaymentMethodComponent;
var assertValidElement = function (element, elementName) {
    if (element !== null && !(0, element_1.isValidElement)(element)) {
        throw new TypeError("The " + elementName + " property for the payment method must be a React element or null.");
    }
};
exports.assertValidElement = assertValidElement;
var assertValidElementOrString = function (element, elementName) {
    if (element !== null &&
        !(0, element_1.isValidElement)(element) &&
        typeof element !== 'string') {
        throw new TypeError("The " + elementName + " property for the payment method must be a React element, a string, or null.");
    }
};
exports.assertValidElementOrString = assertValidElementOrString;
var assertConfigHasProperties = function (config, expectedProperties) {
    if (expectedProperties === void 0) { expectedProperties = []; }
    var missingProperties = expectedProperties.reduce(function (acc, property) {
        if (!config.hasOwnProperty(property)) {
            acc.push(property);
        }
        return acc;
    }, []);
    if (missingProperties.length > 0) {
        var message = 'The payment method configuration object is missing the following properties:';
        throw new TypeError(message + missingProperties.join(', '));
    }
};
exports.assertConfigHasProperties = assertConfigHasProperties;
