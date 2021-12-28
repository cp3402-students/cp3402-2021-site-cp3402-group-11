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
exports.reducer = exports.actions = void 0;
/**
 * External dependencies
 */
var lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
var types_1 = require("./types");
exports.actions = {
    addEventCallback: function (eventType, callback, priority) {
        if (priority === void 0) { priority = 10; }
        return {
            id: (0, lodash_1.uniqueId)(),
            type: types_1.ACTION.ADD_EVENT_CALLBACK,
            eventType: eventType,
            callback: callback,
            priority: priority,
        };
    },
    removeEventCallback: function (eventType, id) {
        return {
            id: id,
            type: types_1.ACTION.REMOVE_EVENT_CALLBACK,
            eventType: eventType,
        };
    },
};
var initialState = {};
/**
 * Handles actions for emitters
 */
var reducer = function (state, _a) {
    var _b, _c;
    if (state === void 0) { state = initialState; }
    var type = _a.type, eventType = _a.eventType, id = _a.id, callback = _a.callback, priority = _a.priority;
    var newEvents = state.hasOwnProperty(eventType)
        ? new Map(state[eventType])
        : new Map();
    switch (type) {
        case types_1.ACTION.ADD_EVENT_CALLBACK:
            newEvents.set(id, { priority: priority, callback: callback });
            return __assign(__assign({}, state), (_b = {}, _b[eventType] = newEvents, _b));
        case types_1.ACTION.REMOVE_EVENT_CALLBACK:
            newEvents.delete(id);
            return __assign(__assign({}, state), (_c = {}, _c[eventType] = newEvents, _c));
    }
};
exports.reducer = reducer;
