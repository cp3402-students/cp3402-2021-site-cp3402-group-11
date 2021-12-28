"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartBlockContext = exports.CartBlockContext = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
exports.CartBlockContext = (0, element_1.createContext)({
    hasDarkControls: false,
});
var useCartBlockContext = function () {
    return (0, element_1.useContext)(exports.CartBlockContext);
};
exports.useCartBlockContext = useCartBlockContext;
