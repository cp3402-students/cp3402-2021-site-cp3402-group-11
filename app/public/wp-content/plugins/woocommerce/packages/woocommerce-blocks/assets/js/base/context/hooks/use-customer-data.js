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
exports.useCustomerData = void 0;
/**
 * External dependencies
 */
var data_1 = require("@wordpress/data");
var element_1 = require("@wordpress/element");
var block_data_1 = require("@woocommerce/block-data");
var use_debounce_1 = require("use-debounce");
var is_shallow_equal_1 = require("@wordpress/is-shallow-equal");
var base_utils_1 = require("@woocommerce/base-utils");
/**
 * Internal dependencies
 */
var use_store_cart_1 = require("./cart/use-store-cart");
var use_store_notices_1 = require("./use-store-notices");
function instanceOfCartResponseBillingAddress(address) {
    return 'email' in address;
}
/**
 * Does a shallow compare of important address data to determine if the cart needs updating on the server.
 *
 * This takes the current and previous address into account, as well as the billing email field.
 *
 * @param {Object} previousAddress An object containing all previous address information
 * @param {Object} address An object containing all address information
 *
 * @return {boolean} True if the store needs updating due to changed data.
 */
var shouldUpdateAddressStore = function (previousAddress, address) {
    if (instanceOfCartResponseBillingAddress(address) &&
        (0, base_utils_1.pluckEmail)(address) !==
            (0, base_utils_1.pluckEmail)(previousAddress)) {
        return true;
    }
    return (!!address.country &&
        !(0, is_shallow_equal_1.default)((0, base_utils_1.pluckAddress)(previousAddress), (0, base_utils_1.pluckAddress)(address)));
};
/**
 * This is a custom hook for syncing customer address data (billing and shipping) with the server.
 */
var useCustomerData = function () {
    var updateCustomerData = (0, data_1.useDispatch)(block_data_1.CART_STORE_KEY).updateCustomerData;
    var _a = (0, use_store_notices_1.useStoreNotices)(), addErrorNotice = _a.addErrorNotice, removeNotice = _a.removeNotice;
    // Grab the initial values from the store cart hook.
    var _b = (0, use_store_cart_1.useStoreCart)(), initialBillingAddress = _b.billingAddress, initialShippingAddress = _b.shippingAddress;
    // State of customer data is tracked here from this point, using the initial values from the useStoreCart hook.
    var _c = (0, element_1.useState)({
        billingData: initialBillingAddress,
        shippingAddress: initialShippingAddress,
    }), customerData = _c[0], setCustomerData = _c[1];
    // We only want to update the local state once, otherwise the data on the checkout page gets overwritten
    // with the initial state of the addresses here
    var _d = (0, element_1.useState)(false), hasCustomerDataSynced = _d[0], setHasCustomerDataSynced = _d[1];
    if (!hasCustomerDataSynced &&
        shouldUpdateAddressStore(customerData.shippingAddress, initialShippingAddress)) {
        setCustomerData({
            billingData: initialBillingAddress,
            shippingAddress: initialShippingAddress,
        });
        setHasCustomerDataSynced(true);
    }
    // Store values last sent to the server in a ref to avoid requests unless important fields are changed.
    var previousCustomerData = (0, element_1.useRef)(customerData);
    // Debounce updates to the customerData state so it's not triggered excessively.
    var debouncedCustomerData = (0, use_debounce_1.useDebounce)(customerData, 1000, {
        // Default equalityFn is prevData === newData.
        equalityFn: function (prevData, newData) {
            return ((0, is_shallow_equal_1.default)(prevData.billingData, newData.billingData) &&
                (0, is_shallow_equal_1.default)(prevData.shippingAddress, newData.shippingAddress));
        },
    })[0];
    /**
     * Set billing data.
     *
     * Contains special handling for email so those fields are not overwritten if simply updating address.
     */
    var setBillingData = (0, element_1.useCallback)(function (newData) {
        setCustomerData(function (prevState) {
            return __assign(__assign({}, prevState), { billingData: __assign(__assign({}, prevState.billingData), newData) });
        });
    }, []);
    /**
     * Set shipping data.
     */
    var setShippingAddress = (0, element_1.useCallback)(function (newData) {
        setCustomerData(function (prevState) {
            return __assign(__assign({}, prevState), { shippingAddress: __assign(__assign({}, prevState.shippingAddress), newData) });
        });
    }, []);
    /**
     * This pushes changes to the API when the local state differs from the address in the cart.
     */
    (0, element_1.useEffect)(function () {
        // Only push updates when enough fields are populated.
        var shouldUpdateBillingAddress = shouldUpdateAddressStore(previousCustomerData.current.billingData, debouncedCustomerData.billingData);
        var shouldUpdateShippingAddress = shouldUpdateAddressStore(previousCustomerData.current.shippingAddress, debouncedCustomerData.shippingAddress);
        if (!shouldUpdateBillingAddress && !shouldUpdateShippingAddress) {
            return;
        }
        var customerDataToUpdate = {};
        if (shouldUpdateBillingAddress) {
            customerDataToUpdate.billing_address =
                debouncedCustomerData.billingData;
        }
        if (shouldUpdateShippingAddress) {
            customerDataToUpdate.shipping_address =
                debouncedCustomerData.shippingAddress;
        }
        previousCustomerData.current = debouncedCustomerData;
        updateCustomerData(customerDataToUpdate)
            .then(function () {
            removeNotice('checkout');
        })
            .catch(function (response) {
            addErrorNotice((0, base_utils_1.formatStoreApiErrorMessage)(response), {
                id: 'checkout',
            });
        });
    }, [
        debouncedCustomerData,
        addErrorNotice,
        removeNotice,
        updateCustomerData,
    ]);
    return {
        billingData: customerData.billingData,
        shippingAddress: customerData.shippingAddress,
        setBillingData: setBillingData,
        setShippingAddress: setShippingAddress,
    };
};
exports.useCustomerData = useCustomerData;
