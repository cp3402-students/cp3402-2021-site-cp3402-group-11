"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectShippingRates = void 0;
/**
 * External dependencies
 */
var data_1 = require("@wordpress/data");
var element_1 = require("@wordpress/element");
var block_data_1 = require("@woocommerce/block-data");
var base_hooks_1 = require("@woocommerce/base-hooks");
/**
 * This is a custom hook for selecting shipping rates
 *
 * @return {Object} This hook will return an object with these properties:
 * 		- selectShippingRate: A function that immediately returns the selected rate and dispatches an action generator.
 *		- isSelectingRate: True when rates are being resolved to the API.
 */
var useSelectShippingRates = function () {
    var throwError = (0, base_hooks_1.useThrowError)();
    var selectShippingRate = (0, data_1.useDispatch)(block_data_1.CART_STORE_KEY).selectShippingRate;
    // Sets a rate for a package in state (so changes are shown right away to consumers of the hook) and in the stores.
    var setRate = (0, element_1.useCallback)(function (newShippingRateId, packageId) {
        selectShippingRate(newShippingRateId, packageId).catch(function (error) {
            // we throw this error because an error on selecting a rate is problematic.
            throwError(error);
        });
    }, [throwError, selectShippingRate]);
    // See if rates are being selected.
    var isSelectingRate = (0, data_1.useSelect)(function (select) {
        return select(block_data_1.CART_STORE_KEY).isShippingRateBeingSelected();
    }, []);
    return {
        selectShippingRate: setRate,
        isSelectingRate: isSelectingRate,
    };
};
exports.useSelectShippingRates = useSelectShippingRates;
