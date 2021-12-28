"use strict";
/** @typedef { import('@woocommerce/type-defs/hooks').StoreCartCoupon } StoreCartCoupon */
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreCartCoupons = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var data_1 = require("@wordpress/data");
var block_data_1 = require("@woocommerce/block-data");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
var use_store_cart_1 = require("./use-store-cart");
var use_store_snackbar_notices_1 = require("../use-store-snackbar-notices");
var validation_1 = require("../../providers/validation");
var use_store_notices_1 = require("../use-store-notices");
/**
 * This is a custom hook for loading the Store API /cart/coupons endpoint and an
 * action for adding a coupon _to_ the cart.
 * See also: https://github.com/woocommerce/woocommerce-gutenberg-products-block/tree/trunk/src/RestApi/StoreApi
 *
 * @return {StoreCartCoupon} An object exposing data and actions from/for the
 * store api /cart/coupons endpoint.
 */
var useStoreCartCoupons = function () {
    var _a = (0, use_store_cart_1.useStoreCart)(), cartCoupons = _a.cartCoupons, cartIsLoading = _a.cartIsLoading;
    var addErrorNotice = (0, use_store_notices_1.useStoreNotices)().addErrorNotice;
    var addSnackbarNotice = (0, use_store_snackbar_notices_1.useStoreSnackbarNotices)().addSnackbarNotice;
    var setValidationErrors = (0, validation_1.useValidationContext)().setValidationErrors;
    var results = (0, data_1.useSelect)(function (select, _a) {
        var dispatch = _a.dispatch;
        var store = select(block_data_1.CART_STORE_KEY);
        var isApplyingCoupon = store.isApplyingCoupon();
        var isRemovingCoupon = store.isRemovingCoupon();
        var _b = dispatch(block_data_1.CART_STORE_KEY), applyCoupon = _b.applyCoupon, removeCoupon = _b.removeCoupon, receiveApplyingCoupon = _b.receiveApplyingCoupon;
        var applyCouponWithNotices = function (couponCode) {
            applyCoupon(couponCode)
                .then(function (result) {
                if (result === true) {
                    addSnackbarNotice((0, i18n_1.sprintf)(
                    /* translators: %s coupon code. */
                    (0, i18n_1.__)('Coupon code "%s" has been applied to your cart.', 'woo-gutenberg-products-block'), couponCode), {
                        id: 'coupon-form',
                    });
                }
            })
                .catch(function (error) {
                setValidationErrors({
                    coupon: {
                        message: (0, html_entities_1.decodeEntities)(error.message),
                        hidden: false,
                    },
                });
                // Finished handling the coupon.
                receiveApplyingCoupon('');
            });
        };
        var removeCouponWithNotices = function (couponCode) {
            removeCoupon(couponCode)
                .then(function (result) {
                if (result === true) {
                    addSnackbarNotice((0, i18n_1.sprintf)(
                    /* translators: %s coupon code. */
                    (0, i18n_1.__)('Coupon code "%s" has been removed from your cart.', 'woo-gutenberg-products-block'), couponCode), {
                        id: 'coupon-form',
                    });
                }
            })
                .catch(function (error) {
                addErrorNotice(error.message, {
                    id: 'coupon-form',
                });
                // Finished handling the coupon.
                receiveApplyingCoupon('');
            });
        };
        return {
            applyCoupon: applyCouponWithNotices,
            removeCoupon: removeCouponWithNotices,
            isApplyingCoupon: isApplyingCoupon,
            isRemovingCoupon: isRemovingCoupon,
        };
    }, [addErrorNotice, addSnackbarNotice]);
    return __assign({ appliedCoupons: cartCoupons, isLoading: cartIsLoading }, results);
};
exports.useStoreCartCoupons = useStoreCartCoupons;
