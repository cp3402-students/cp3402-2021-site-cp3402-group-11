"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var react_1 = require("react");
/**
 * Internal dependencies
 */
require("./style.scss");
var TotalsWrapper = function (_a) {
    var children = _a.children, _b = _a.slotWrapper, slotWrapper = _b === void 0 ? false : _b;
    return react_1.Children.count(children) ? (<div className={"wc-block-components-totals-wrapper" + (slotWrapper ? ' slot-wrapper' : '')}>
			{children}
		</div>) : null;
};
exports.default = TotalsWrapper;
