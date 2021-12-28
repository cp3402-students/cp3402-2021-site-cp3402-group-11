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
Object.defineProperty(exports, "__esModule", { value: true });
exports.__experimentalApplyCheckoutFilter = exports.__experimentalRegisterCheckoutFilters = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var i18n_1 = require("@wordpress/i18n");
var settings_1 = require("@woocommerce/settings");
var deprecated_1 = require("@wordpress/deprecated");
/**
 * A function that always return true.
 * We need to have a single instance of this function so it doesn't
 * invalidate our memo comparison.
 */
var returnTrue = function () { return true; };
var checkoutFilters = {};
/**
 * Register filters for a specific extension.
 */
var __experimentalRegisterCheckoutFilters = function (namespace, filters) {
    var _a;
    /**
     * Let developers know snackbarNotices is no longer available as a filter.
     *
     * See: https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4417
     */
    if (Object.keys(filters).includes('couponName')) {
        (0, deprecated_1.default)('snackbarNotices', {
            alternative: 'snackbarNoticeVisibility',
            plugin: 'WooCommerce Blocks',
            link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4417',
        });
    }
    /**
     * Let the user know couponName is no longer available as a filter.
     *
     * See https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/4312
     */
    if (Object.keys(filters).includes('couponName')) {
        (0, deprecated_1.default)('couponName', {
            alternative: 'coupons',
            plugin: 'WooCommerce Blocks',
            link: 'https://github.com/woocommerce/woocommerce-gutenberg-products-block/blob/bb921d21f42e21f38df2b1c87b48e07aa4cb0538/docs/extensibility/available-filters.md#coupons',
        });
    }
    checkoutFilters = __assign(__assign({}, checkoutFilters), (_a = {}, _a[namespace] = filters, _a));
};
exports.__experimentalRegisterCheckoutFilters = __experimentalRegisterCheckoutFilters;
/**
 * Get all filters with a specific name.
 *
 * @param {string} filterName   Name of the filter to search for.
 * @return {Function[]} Array of functions that are registered for that filter
 *                      name.
 */
var getCheckoutFilters = function (filterName) {
    var namespaces = Object.keys(checkoutFilters);
    var filters = namespaces
        .map(function (namespace) { return checkoutFilters[namespace][filterName]; })
        .filter(Boolean);
    return filters;
};
/**
 * Apply a filter.
 */
var __experimentalApplyCheckoutFilter = function (_a) {
    var filterName = _a.filterName, defaultValue = _a.defaultValue, _b = _a.extensions, extensions = _b === void 0 ? null : _b, _c = _a.arg, arg = _c === void 0 ? null : _c, _d = _a.validation, validation = _d === void 0 ? returnTrue : _d;
    return (0, element_1.useMemo)(function () {
        var filters = getCheckoutFilters(filterName);
        var value = defaultValue;
        filters.forEach(function (filter) {
            try {
                var newValue = filter(value, extensions || {}, arg);
                if (typeof newValue !== typeof value) {
                    throw new Error((0, i18n_1.sprintf)(
                    /* translators: %1$s is the type of the variable passed to the filter function, %2$s is the type of the value returned by the filter function. */
                    (0, i18n_1.__)('The type returned by checkout filters must be the same as the type they receive. The function received %1$s but returned %2$s.', 'woo-gutenberg-products-block'), typeof value, typeof newValue));
                }
                value = validation(newValue) ? newValue : value;
            }
            catch (e) {
                if (settings_1.CURRENT_USER_IS_ADMIN) {
                    throw e;
                }
                else {
                    // eslint-disable-next-line no-console
                    console.error(e);
                }
            }
        });
        return value;
    }, [filterName, defaultValue, extensions, arg, validation]);
};
exports.__experimentalApplyCheckoutFilter = __experimentalApplyCheckoutFilter;
