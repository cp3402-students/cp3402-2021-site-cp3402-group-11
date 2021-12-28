"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultCartState = exports.EMPTY_PENDING_DELETE = exports.EMPTY_PENDING_QUANTITY = void 0;
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
exports.EMPTY_PENDING_QUANTITY = [];
exports.EMPTY_PENDING_DELETE = [];
exports.defaultCartState = {
    cartItemsPendingQuantity: exports.EMPTY_PENDING_QUANTITY,
    cartItemsPendingDelete: exports.EMPTY_PENDING_DELETE,
    cartData: {
        coupons: constants_1.EMPTY_CART_COUPONS,
        shippingRates: constants_1.EMPTY_SHIPPING_RATES,
        shippingAddress: {
            first_name: '',
            last_name: '',
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            phone: '',
        },
        billingAddress: {
            first_name: '',
            last_name: '',
            company: '',
            address_1: '',
            address_2: '',
            city: '',
            state: '',
            postcode: '',
            country: '',
            phone: '',
            email: '',
        },
        items: constants_1.EMPTY_CART_ITEMS,
        itemsCount: 0,
        itemsWeight: 0,
        needsShipping: true,
        needsPayment: false,
        hasCalculatedShipping: true,
        fees: constants_1.EMPTY_CART_FEES,
        totals: {
            currency_code: '',
            currency_symbol: '',
            currency_minor_unit: 2,
            currency_decimal_separator: '.',
            currency_thousand_separator: ',',
            currency_prefix: '',
            currency_suffix: '',
            total_items: '0',
            total_items_tax: '0',
            total_fees: '0',
            total_fees_tax: '0',
            total_discount: '0',
            total_discount_tax: '0',
            total_shipping: '0',
            total_shipping_tax: '0',
            total_price: '0',
            total_tax: '0',
            tax_lines: constants_1.EMPTY_TAX_LINES,
        },
        errors: constants_1.EMPTY_CART_ITEM_ERRORS,
        paymentRequirements: constants_1.EMPTY_PAYMENT_REQUIREMENTS,
        extensions: constants_1.EMPTY_EXTENSIONS,
    },
    metaData: {
        updatingCustomerData: false,
        updatingSelectedRate: false,
        applyingCoupon: '',
        removingCoupon: '',
        isCartDataStale: false,
    },
    errors: constants_1.EMPTY_CART_ERRORS,
};
