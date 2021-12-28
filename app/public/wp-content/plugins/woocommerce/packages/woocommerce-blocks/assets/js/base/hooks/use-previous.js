"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
/**
 * External dependencies
 */
var react_1 = require("react");
/**
 * Use Previous based on https://usehooks.com/usePrevious/.
 *
 * @param {*}    value
 * @param {Function} [validation] Function that needs to validate for the value
 *                                to be updated.
 */
function usePrevious(value, validation) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (ref.current !== value &&
            (!validation || validation(value, ref.current))) {
            ref.current = value;
        }
    }, [value, validation]);
    return ref.current;
}
exports.usePrevious = usePrevious;
