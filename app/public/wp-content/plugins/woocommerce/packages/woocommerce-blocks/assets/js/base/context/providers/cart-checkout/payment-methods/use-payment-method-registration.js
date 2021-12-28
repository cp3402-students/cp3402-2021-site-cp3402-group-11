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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpressPaymentMethods = exports.usePaymentMethods = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var blocks_registry_1 = require("@woocommerce/blocks-registry");
var element_1 = require("@wordpress/element");
var base_hooks_1 = require("@woocommerce/base-hooks");
var settings_1 = require("@woocommerce/settings");
var use_debounce_1 = require("use-debounce");
/**
 * Internal dependencies
 */
var editor_context_1 = require("../../editor-context");
var shipping_1 = require("../shipping");
var customer_1 = require("../customer");
var use_store_cart_1 = require("../../../hooks/cart/use-store-cart");
var use_store_notices_1 = require("../../../hooks/use-store-notices");
var use_emit_response_1 = require("../../../hooks/use-emit-response");
/**
 * This hook handles initializing registered payment methods and exposing all
 * registered payment methods that can be used in the current environment (via
 * the payment method's `canMakePayment` property).
 *
 * @param  {function(Object):undefined} dispatcher               A dispatcher for setting registered payment methods to an external state.
 * @param  {Object}                     registeredPaymentMethods Registered payment methods to process.
 * @param  {Array}                      paymentMethodsSortOrder  Array of payment method names to sort by. This should match keys of registeredPaymentMethods.
 * @param  {string}                     noticeContext            Id of the context to append notices to.
 *
 * @return {boolean} Whether the payment methods have been initialized or not. True when all payment methods have been initialized.
 */
var usePaymentMethodRegistration = function (dispatcher, registeredPaymentMethods, paymentMethodsSortOrder, noticeContext) {
    var _a = (0, element_1.useState)(false), isInitialized = _a[0], setIsInitialized = _a[1];
    var isEditor = (0, editor_context_1.useEditorContext)().isEditor;
    var selectedRates = (0, shipping_1.useShippingDataContext)().selectedRates;
    var _b = (0, customer_1.useCustomerDataContext)(), billingData = _b.billingData, shippingAddress = _b.shippingAddress;
    var selectedShippingMethods = (0, base_hooks_1.useShallowEqual)(selectedRates);
    var paymentMethodsOrder = (0, base_hooks_1.useShallowEqual)(paymentMethodsSortOrder);
    var cart = (0, use_store_cart_1.useStoreCart)();
    var cartTotals = cart.cartTotals, cartNeedsShipping = cart.cartNeedsShipping, paymentRequirements = cart.paymentRequirements;
    var canPayArgument = (0, element_1.useRef)({
        cart: cart,
        cartTotals: cartTotals,
        cartNeedsShipping: cartNeedsShipping,
        billingData: billingData,
        shippingAddress: shippingAddress,
        selectedShippingMethods: selectedShippingMethods,
        paymentRequirements: paymentRequirements,
    });
    var addErrorNotice = (0, use_store_notices_1.useStoreNotices)().addErrorNotice;
    (0, element_1.useEffect)(function () {
        canPayArgument.current = {
            cart: cart,
            cartTotals: cartTotals,
            cartNeedsShipping: cartNeedsShipping,
            billingData: billingData,
            shippingAddress: shippingAddress,
            selectedShippingMethods: selectedShippingMethods,
            paymentRequirements: paymentRequirements,
        };
    }, [
        cart,
        cartTotals,
        cartNeedsShipping,
        billingData,
        shippingAddress,
        selectedShippingMethods,
        paymentRequirements,
    ]);
    var refreshCanMakePayments = (0, element_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var availablePaymentMethods, addAvailablePaymentMethod, i, paymentMethodName, paymentMethod, canPay, _a, e_1, errorText;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    availablePaymentMethods = {};
                    addAvailablePaymentMethod = function (paymentMethod) {
                        var _a;
                        availablePaymentMethods = __assign(__assign({}, availablePaymentMethods), (_a = {}, _a[paymentMethod.name] = paymentMethod, _a));
                    };
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < paymentMethodsOrder.length)) return [3 /*break*/, 8];
                    paymentMethodName = paymentMethodsOrder[i];
                    paymentMethod = registeredPaymentMethods[paymentMethodName];
                    if (!paymentMethod) {
                        return [3 /*break*/, 7];
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 6, , 7]);
                    if (!isEditor) return [3 /*break*/, 3];
                    _a = true;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Promise.resolve(paymentMethod.canMakePayment(canPayArgument.current))];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    canPay = _a;
                    if (canPay) {
                        if (typeof canPay === 'object' &&
                            canPay !== null &&
                            canPay.error) {
                            throw new Error(canPay.error.message);
                        }
                        addAvailablePaymentMethod(paymentMethod);
                    }
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _b.sent();
                    if (settings_1.CURRENT_USER_IS_ADMIN || isEditor) {
                        errorText = (0, i18n_1.sprintf)(
                        /* translators: %s the id of the payment method being registered (bank transfer, Stripe...) */
                        (0, i18n_1.__)("There was an error registering the payment method with id '%s': ", 'woo-gutenberg-products-block'), paymentMethod.paymentMethodId);
                        addErrorNotice(errorText + " " + e_1, {
                            context: noticeContext,
                            id: "wc-" + paymentMethod.paymentMethodId + "-registration-error",
                        });
                    }
                    return [3 /*break*/, 7];
                case 7:
                    i++;
                    return [3 /*break*/, 1];
                case 8:
                    // Re-dispatch available payment methods to store.
                    dispatcher(availablePaymentMethods);
                    // Note: some payment methods use the `canMakePayment` callback to initialize / setup.
                    // Example: Stripe CC, Stripe Payment Request.
                    // That's why we track "is initialized" state here.
                    setIsInitialized(true);
                    return [2 /*return*/];
            }
        });
    }); }, [
        addErrorNotice,
        dispatcher,
        isEditor,
        noticeContext,
        paymentMethodsOrder,
        registeredPaymentMethods,
    ]);
    var debouncedRefreshCanMakePayments = (0, use_debounce_1.useDebouncedCallback)(refreshCanMakePayments, 500)[0];
    // Determine which payment methods are available initially and whenever
    // shipping methods, cart or the billing data change.
    // Some payment methods (e.g. COD) can be disabled for specific shipping methods.
    (0, element_1.useEffect)(function () {
        debouncedRefreshCanMakePayments();
    }, [
        debouncedRefreshCanMakePayments,
        cart,
        selectedShippingMethods,
        billingData,
    ]);
    return isInitialized;
};
/**
 * Custom hook for setting up payment methods (standard, non-express).
 *
 * @param  {function(Object):undefined} dispatcher
 *
 * @return {boolean} True when standard payment methods have been initialized.
 */
var usePaymentMethods = function (dispatcher) {
    var standardMethods = (0, blocks_registry_1.getPaymentMethods)();
    var noticeContexts = (0, use_emit_response_1.useEmitResponse)().noticeContexts;
    // Ensure all methods are present in order.
    // Some payment methods may not be present in paymentGatewaySortOrder if they
    // depend on state, e.g. COD can depend on shipping method.
    var displayOrder = new Set(__spreadArray(__spreadArray([], (0, settings_1.getSetting)('paymentGatewaySortOrder', []), true), Object.keys(standardMethods), true));
    return usePaymentMethodRegistration(dispatcher, standardMethods, Array.from(displayOrder), noticeContexts.PAYMENTS);
};
exports.usePaymentMethods = usePaymentMethods;
/**
 * Custom hook for setting up express payment methods.
 *
 * @param  {function(Object):undefined} dispatcher
 *
 * @return {boolean} True when express payment methods have been initialized.
 */
var useExpressPaymentMethods = function (dispatcher) {
    var expressMethods = (0, blocks_registry_1.getExpressPaymentMethods)();
    var noticeContexts = (0, use_emit_response_1.useEmitResponse)().noticeContexts;
    return usePaymentMethodRegistration(dispatcher, expressMethods, Object.keys(expressMethods), noticeContexts.EXPRESS_PAYMENTS);
};
exports.useExpressPaymentMethods = useExpressPaymentMethods;
