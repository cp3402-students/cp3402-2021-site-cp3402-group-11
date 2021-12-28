"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorageState = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var useLocalStorageState = function (key, initialValue) {
    var _a = (0, element_1.useState)(function () {
        var valueInLocalStorage = window.localStorage.getItem(key);
        if (valueInLocalStorage) {
            try {
                return JSON.parse(valueInLocalStorage);
            }
            catch (_a) {
                // eslint-disable-next-line no-console
                console.error("Value for key '" + key + "' could not be retrieved from localStorage because it can't be parsed.");
            }
        }
        return initialValue;
    }), state = _a[0], setState = _a[1];
    (0, element_1.useEffect)(function () {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        }
        catch (_a) {
            // eslint-disable-next-line no-console
            console.error("Value for key '" + key + "' could not be saved in localStorage because it can't be converted into a string.");
        }
    }, [key, state]);
    return [state, setState];
};
exports.useLocalStorageState = useLocalStorageState;
