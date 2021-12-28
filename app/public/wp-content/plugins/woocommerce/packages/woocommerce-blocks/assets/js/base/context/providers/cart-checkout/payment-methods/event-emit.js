"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitEventWithAbort = exports.emitEvent = exports.reducer = exports.useEventEmitters = exports.EMIT_TYPES = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var event_emit_1 = require("../../../event-emit");
Object.defineProperty(exports, "reducer", { enumerable: true, get: function () { return event_emit_1.reducer; } });
Object.defineProperty(exports, "emitEvent", { enumerable: true, get: function () { return event_emit_1.emitEvent; } });
Object.defineProperty(exports, "emitEventWithAbort", { enumerable: true, get: function () { return event_emit_1.emitEventWithAbort; } });
var EMIT_TYPES = {
    PAYMENT_PROCESSING: 'payment_processing',
};
exports.EMIT_TYPES = EMIT_TYPES;
/**
 * Receives a reducer dispatcher and returns an object with the
 * various event emitters for the payment processing events.
 *
 * Calling the event registration function with the callback will register it
 * for the event emitter and will return a dispatcher for removing the
 * registered callback (useful for implementation in `useEffect`).
 *
 * @param {Function} observerDispatch The emitter reducer dispatcher.
 * @return {Object} An object with the various payment event emitter registration functions
 */
var useEventEmitters = function (observerDispatch) {
    var eventEmitters = (0, element_1.useMemo)(function () { return ({
        onPaymentProcessing: (0, event_emit_1.emitterCallback)(EMIT_TYPES.PAYMENT_PROCESSING, observerDispatch),
    }); }, [observerDispatch]);
    return eventEmitters;
};
exports.useEventEmitters = useEventEmitters;
