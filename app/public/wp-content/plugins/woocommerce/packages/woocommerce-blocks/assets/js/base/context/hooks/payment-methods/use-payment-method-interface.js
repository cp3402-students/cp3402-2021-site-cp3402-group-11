"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePaymentMethodInterface = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var price_format_1 = require("@woocommerce/price-format");
var element_1 = require("@wordpress/element");
var payment_method_label_1 = require("@woocommerce/base-components/cart-checkout/payment-method-label");
var payment_method_icons_1 = require("@woocommerce/base-components/cart-checkout/payment-method-icons");
var settings_1 = require("@woocommerce/settings");
var deprecated_1 = require("@wordpress/deprecated");
/**
 * Internal dependencies
 */
var validation_1 = require("../../providers/validation");
var use_store_cart_1 = require("../cart/use-store-cart");
var use_store_cart_coupons_1 = require("../cart/use-store-cart-coupons");
var use_emit_response_1 = require("../use-emit-response");
var checkout_state_1 = require("../../providers/cart-checkout/checkout-state");
var payment_methods_1 = require("../../providers/cart-checkout/payment-methods");
var shipping_1 = require("../../providers/cart-checkout/shipping");
var customer_1 = require("../../providers/cart-checkout/customer");
var utils_1 = require("./utils");
/**
 * Returns am interface to use as payment method props.
 */
var usePaymentMethodInterface = function () {
    var _a = (0, checkout_state_1.useCheckoutContext)(), isCalculating = _a.isCalculating, isComplete = _a.isComplete, isIdle = _a.isIdle, isProcessing = _a.isProcessing, onCheckoutBeforeProcessing = _a.onCheckoutBeforeProcessing, onCheckoutValidationBeforeProcessing = _a.onCheckoutValidationBeforeProcessing, onCheckoutAfterProcessingWithSuccess = _a.onCheckoutAfterProcessingWithSuccess, onCheckoutAfterProcessingWithError = _a.onCheckoutAfterProcessingWithError, onSubmit = _a.onSubmit, customerId = _a.customerId;
    var _b = (0, payment_methods_1.usePaymentMethodDataContext)(), currentStatus = _b.currentStatus, activePaymentMethod = _b.activePaymentMethod, onPaymentProcessing = _b.onPaymentProcessing, setExpressPaymentError = _b.setExpressPaymentError, shouldSavePayment = _b.shouldSavePayment;
    var _c = (0, shipping_1.useShippingDataContext)(), shippingErrorStatus = _c.shippingErrorStatus, shippingErrorTypes = _c.shippingErrorTypes, shippingRates = _c.shippingRates, shippingRatesLoading = _c.shippingRatesLoading, selectedRates = _c.selectedRates, setSelectedRates = _c.setSelectedRates, isSelectingRate = _c.isSelectingRate, onShippingRateSuccess = _c.onShippingRateSuccess, onShippingRateFail = _c.onShippingRateFail, onShippingRateSelectSuccess = _c.onShippingRateSelectSuccess, onShippingRateSelectFail = _c.onShippingRateSelectFail, needsShipping = _c.needsShipping;
    var _d = (0, customer_1.useCustomerDataContext)(), billingData = _d.billingData, shippingAddress = _d.shippingAddress, setShippingAddress = _d.setShippingAddress;
    var cartTotals = (0, use_store_cart_1.useStoreCart)().cartTotals;
    var appliedCoupons = (0, use_store_cart_coupons_1.useStoreCartCoupons)().appliedCoupons;
    var _e = (0, use_emit_response_1.useEmitResponse)(), noticeContexts = _e.noticeContexts, responseTypes = _e.responseTypes;
    var currentCartTotals = (0, element_1.useRef)((0, utils_1.prepareTotalItems)(cartTotals, needsShipping));
    var currentCartTotal = (0, element_1.useRef)({
        label: (0, i18n_1.__)('Total', 'woo-gutenberg-products-block'),
        value: parseInt(cartTotals.total_price, 10),
    });
    (0, element_1.useEffect)(function () {
        currentCartTotals.current = (0, utils_1.prepareTotalItems)(cartTotals, needsShipping);
        currentCartTotal.current = {
            label: (0, i18n_1.__)('Total', 'woo-gutenberg-products-block'),
            value: parseInt(cartTotals.total_price, 10),
        };
    }, [cartTotals, needsShipping]);
    var deprecatedSetExpressPaymentError = (0, element_1.useCallback)(function (errorMessage) {
        if (errorMessage === void 0) { errorMessage = ''; }
        (0, deprecated_1.default)('setExpressPaymentError should only be used by Express Payment Methods (using the provided onError handler).', {
            alternative: '',
            plugin: 'woocommerce-gutenberg-products-block',
            link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4228',
        });
        setExpressPaymentError(errorMessage);
    }, [setExpressPaymentError]);
    return {
        activePaymentMethod: activePaymentMethod,
        billing: {
            billingData: billingData,
            cartTotal: currentCartTotal.current,
            currency: (0, price_format_1.getCurrencyFromPriceResponse)(cartTotals),
            cartTotalItems: currentCartTotals.current,
            displayPricesIncludingTax: (0, settings_1.getSetting)('displayCartPricesIncludingTax', false),
            appliedCoupons: appliedCoupons,
            customerId: customerId,
        },
        checkoutStatus: {
            isCalculating: isCalculating,
            isComplete: isComplete,
            isIdle: isIdle,
            isProcessing: isProcessing,
        },
        components: {
            ValidationInputError: validation_1.ValidationInputError,
            PaymentMethodIcons: payment_method_icons_1.default,
            PaymentMethodLabel: payment_method_label_1.default,
        },
        emitResponse: {
            noticeContexts: noticeContexts,
            responseTypes: responseTypes,
        },
        eventRegistration: {
            onCheckoutBeforeProcessing: onCheckoutBeforeProcessing,
            onCheckoutValidationBeforeProcessing: onCheckoutValidationBeforeProcessing,
            onCheckoutAfterProcessingWithSuccess: onCheckoutAfterProcessingWithSuccess,
            onCheckoutAfterProcessingWithError: onCheckoutAfterProcessingWithError,
            onShippingRateSuccess: onShippingRateSuccess,
            onShippingRateFail: onShippingRateFail,
            onShippingRateSelectSuccess: onShippingRateSelectSuccess,
            onShippingRateSelectFail: onShippingRateSelectFail,
            onPaymentProcessing: onPaymentProcessing,
        },
        onSubmit: onSubmit,
        paymentStatus: currentStatus,
        setExpressPaymentError: deprecatedSetExpressPaymentError,
        shippingData: {
            shippingRates: shippingRates,
            shippingRatesLoading: shippingRatesLoading,
            selectedRates: selectedRates,
            setSelectedRates: setSelectedRates,
            isSelectingRate: isSelectingRate,
            shippingAddress: shippingAddress,
            setShippingAddress: setShippingAddress,
            needsShipping: needsShipping,
        },
        shippingStatus: {
            shippingErrorStatus: shippingErrorStatus,
            shippingErrorTypes: shippingErrorTypes,
        },
        shouldSavePayment: shouldSavePayment,
    };
};
exports.usePaymentMethodInterface = usePaymentMethodInterface;
