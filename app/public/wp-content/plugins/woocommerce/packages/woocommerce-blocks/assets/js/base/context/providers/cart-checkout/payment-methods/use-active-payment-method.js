"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActivePaymentMethod = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var use_store_events_1 = require("../../../hooks/use-store-events");
var useActivePaymentMethod = function () {
    var dispatchCheckoutEvent = (0, use_store_events_1.useStoreEvents)().dispatchCheckoutEvent;
    // The active payment method - e.g. Stripe CC or BACS.
    var _a = (0, element_1.useState)(''), activePaymentMethod = _a[0], setActivePaymentMethod = _a[1];
    // If a previously saved payment method is active, the token for that method. For example, a for a Stripe CC card saved to user account.
    var _b = (0, element_1.useState)(''), activeSavedToken = _b[0], setActiveSavedToken = _b[1];
    // Trigger event on change.
    (0, element_1.useEffect)(function () {
        dispatchCheckoutEvent('set-active-payment-method', {
            activePaymentMethod: activePaymentMethod,
        });
    }, [dispatchCheckoutEvent, activePaymentMethod]);
    return {
        activePaymentMethod: activePaymentMethod,
        activeSavedToken: activeSavedToken,
        setActivePaymentMethod: setActivePaymentMethod,
        setActiveSavedToken: setActiveSavedToken,
    };
};
exports.useActivePaymentMethod = useActivePaymentMethod;
