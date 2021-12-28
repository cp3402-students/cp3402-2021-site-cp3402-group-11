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
exports.CART_STORE_KEY = void 0;
/**
 * External dependencies
 */
var data_1 = require("@wordpress/data");
var data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
var selectors = require("./selectors");
var actions = require("./actions");
var resolvers = require("./resolvers");
var reducers_1 = require("./reducers");
var shared_controls_1 = require("../shared-controls");
var controls_1 = require("./controls");
(0, data_1.registerStore)(constants_1.STORE_KEY, {
    reducer: reducers_1.default,
    actions: actions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    controls: __assign(__assign(__assign({}, data_controls_1.controls), shared_controls_1.controls), controls_1.controls),
    selectors: selectors,
    resolvers: resolvers,
});
exports.CART_STORE_KEY = constants_1.STORE_KEY;
