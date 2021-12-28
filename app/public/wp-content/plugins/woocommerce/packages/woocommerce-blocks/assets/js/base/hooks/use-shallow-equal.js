"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShallowEqual = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var is_shallow_equal_1 = require("@wordpress/is-shallow-equal");
/**
 * A custom hook that compares the provided value across renders and returns the
 * previous instance if shallow equality with previous instance exists.
 *
 * This is particularly useful when non-primitive types are used as
 * dependencies for react hooks.
 *
 * @param {*} value Value to keep the same if satisfies shallow equality.
 *
 * @return {*} The previous cached instance of the value if the current has  shallow equality with it.
 */
function useShallowEqual(value) {
    var ref = (0, element_1.useRef)(value);
    if (!(0, is_shallow_equal_1.default)(value, ref.current)) {
        ref.current = value;
    }
    return ref.current;
}
exports.useShallowEqual = useShallowEqual;
