"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEntriesPolyfill = void 0;
/**
 * A polyfill for Object.fromEntries function.
 *
 * @param {Array<[string, unknown]>} array Array to be turned back to object
 * @return {Record< string, unknown >} the newly created object
 */
var fromEntriesPolyfill = function (array) {
    return array.reduce(function (obj, _a) {
        var key = _a[0], val = _a[1];
        obj[key] = val;
        return obj;
    }, {});
};
exports.fromEntriesPolyfill = fromEntriesPolyfill;
