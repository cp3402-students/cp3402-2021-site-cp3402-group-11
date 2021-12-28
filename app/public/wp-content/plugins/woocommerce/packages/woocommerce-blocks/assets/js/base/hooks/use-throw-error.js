"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrowError = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Helper method for throwing an error in a React Hook.
 *
 * @see https://github.com/facebook/react/issues/14981
 *
 * @return {function(Object)} A function receiving the error that will be thrown.
 */
var useThrowError = function () {
    var _a = (0, element_1.useState)(), setState = _a[1];
    return (0, element_1.useCallback)(function (error) {
        setState(function () {
            throw error;
        });
    }, []);
};
exports.useThrowError = useThrowError;
