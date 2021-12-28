"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
require("./style.scss");
var ProductBadge = function (_a) {
    var children = _a.children, className = _a.className;
    return (<div className={(0, classnames_1.default)('wc-block-components-product-badge', className)}>
			{children}
		</div>);
};
exports.default = ProductBadge;
