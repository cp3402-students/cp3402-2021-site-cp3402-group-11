"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitterCallback = void 0;
/**
 * Internal dependencies
 */
var reducer_1 = require("./reducer");
var emitterCallback = function (type, observerDispatch) { return function (callback, priority) {
    if (priority === void 0) { priority = 10; }
    var action = reducer_1.actions.addEventCallback(type, callback, priority);
    observerDispatch(action);
    return function () {
        observerDispatch(reducer_1.actions.removeEventCallback(type, action.id));
    };
}; };
exports.emitterCallback = emitterCallback;
