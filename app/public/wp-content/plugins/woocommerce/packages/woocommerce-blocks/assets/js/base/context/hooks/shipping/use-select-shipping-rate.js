"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelectShippingRate = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var is_shallow_equal_1 = require("@wordpress/is-shallow-equal");
/**
 * Internal dependencies
 */
var use_select_shipping_rates_1 = require("./use-select-shipping-rates");
var use_store_events_1 = require("../use-store-events");
/**
 * Selected rates are derived by looping over the shipping rates.
 *
 * @param {Array} shippingRates Array of shipping rates.
 * @return {string} Selected rate id.
 */
// This will find the selected rate ID in an array of shipping rates.
var deriveSelectedRateId = function (shippingRates) { var _a; return (_a = shippingRates.find(function (rate) { return rate.selected; })) === null || _a === void 0 ? void 0 : _a.rate_id; };
/**
 * This is a custom hook for tracking selected shipping rates for a package and selecting a rate. State is used so
 * changes are reflected in the UI instantly.
 *
 * @param {string} packageId Package ID to select rates for.
 * @param {Array} shippingRates an array of packages with shipping rates.
 * @return {Object} This hook will return an object with these properties:
 * 		- selectShippingRate: A function that immediately returns the selected rate and dispatches an action generator.
 * 		- selectedShippingRate: The selected rate id.
 *		- isSelectingRate: True when rates are being resolved to the API.
 */
var useSelectShippingRate = function (packageId, shippingRates) {
    var dispatchCheckoutEvent = (0, use_store_events_1.useStoreEvents)().dispatchCheckoutEvent;
    // Rates are selected via the shipping data context provider.
    var _a = (0, use_select_shipping_rates_1.useSelectShippingRates)(), selectShippingRate = _a.selectShippingRate, isSelectingRate = _a.isSelectingRate;
    // Selected rates are stored in state. This allows shipping rates changes to be shown in the UI instantly.
    // Defaults to the currently selected rate_id.
    var _b = (0, element_1.useState)(function () {
        return deriveSelectedRateId(shippingRates);
    }), selectedShippingRate = _b[0], setSelectedShippingRate = _b[1];
    // This ref is used to track when changes come in via the props. When the incoming shipping rates change, update our local state if there are changes to selected methods.
    var currentShippingRates = (0, element_1.useRef)(shippingRates);
    (0, element_1.useEffect)(function () {
        if (!(0, is_shallow_equal_1.default)(currentShippingRates.current, shippingRates)) {
            currentShippingRates.current = shippingRates;
            setSelectedShippingRate(deriveSelectedRateId(shippingRates));
        }
    }, [shippingRates]);
    // Sets a rate for a package in state (so changes are shown right away to consumers of the hook) and in the stores.
    var setPackageRateId = (0, element_1.useCallback)(function (newShippingRateId) {
        setSelectedShippingRate(newShippingRateId);
        selectShippingRate(newShippingRateId, packageId);
        dispatchCheckoutEvent('set-selected-shipping-rate', {
            shippingRateId: newShippingRateId,
        });
    }, [packageId, selectShippingRate, dispatchCheckoutEvent]);
    return {
        selectShippingRate: setPackageRateId,
        selectedShippingRate: selectedShippingRate,
        isSelectingRate: isSelectingRate,
    };
};
exports.useSelectShippingRate = useSelectShippingRate;
