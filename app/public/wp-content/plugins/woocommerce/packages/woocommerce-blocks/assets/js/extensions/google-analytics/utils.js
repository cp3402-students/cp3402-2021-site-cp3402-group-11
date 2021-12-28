"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackCheckoutOption = exports.trackCheckoutStep = exports.trackEvent = exports.getProductImpressionObject = exports.getProductFieldObject = void 0;
/**
 * Formats data into the productFieldObject shape.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#product-data
 */
var getProductFieldObject = function (product, quantity) {
    var productIdentifier = product.sku ? product.sku : '#' + product.id;
    var productCategory = 'categories' in product && product.categories.length
        ? product.categories[0].name
        : '';
    return {
        id: productIdentifier,
        name: product.name,
        quantity: quantity,
        category: productCategory,
        price: (parseInt(product.prices.price, 10) /
            Math.pow(10, product.prices.currency_minor_unit)).toString(),
    };
};
exports.getProductFieldObject = getProductFieldObject;
/**
 * Formats data into the impressionFieldObject shape.
 *
 * @see https://developers.google.com/analytics/devguides/collection/gtagjs/enhanced-ecommerce#impression-data
 */
var getProductImpressionObject = function (product, listName) {
    var productIdentifier = product.sku ? product.sku : '#' + product.id;
    var productCategory = product.categories.length
        ? product.categories[0].name
        : '';
    return {
        id: productIdentifier,
        name: product.name,
        list_name: listName,
        category: productCategory,
        price: (parseInt(product.prices.price, 10) /
            Math.pow(10, product.prices.currency_minor_unit)).toString(),
    };
};
exports.getProductImpressionObject = getProductImpressionObject;
/**
 * Track an event using the global gtag function.
 */
var trackEvent = function (eventName, eventParams) {
    if (typeof gtag !== 'function') {
        throw new Error('Function gtag not implemented.');
    }
    // eslint-disable-next-line no-console
    console.log("Tracking event " + eventName);
    window.gtag('event', eventName, eventParams);
};
exports.trackEvent = trackEvent;
var currentStep = -1;
var trackCheckoutStep = function (step) { return function (_a) {
    var _b;
    var storeCart = _a.storeCart;
    if (currentStep === step) {
        return;
    }
    (0, exports.trackEvent)(step === 0 ? 'begin_checkout' : 'checkout_progress', {
        items: storeCart.cartItems.map(exports.getProductFieldObject),
        coupon: ((_b = storeCart.cartCoupons[0]) === null || _b === void 0 ? void 0 : _b.code) || '',
        currency: storeCart.cartTotals.currency_code,
        value: (parseInt(storeCart.cartTotals.total_price, 10) /
            Math.pow(10, storeCart.cartTotals.currency_minor_unit)).toString(),
        checkout_step: step,
    });
    currentStep = step;
}; };
exports.trackCheckoutStep = trackCheckoutStep;
var trackCheckoutOption = function (_a) {
    var step = _a.step, option = _a.option, value = _a.value;
    return function () {
        (0, exports.trackEvent)('set_checkout_option', {
            checkout_step: step,
            checkout_option: option,
            value: value,
        });
        currentStep = step;
    };
};
exports.trackCheckoutOption = trackCheckoutOption;
