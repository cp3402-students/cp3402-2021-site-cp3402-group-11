"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
/**
 * Internal dependencies
 */
require("./style.scss");
var FrontendBlock = function (_a) {
    var children = _a.children, className = _a.className;
    return (<sidebar_layout_1.Sidebar className={(0, classnames_1.default)('wc-block-cart__sidebar', className)}>
			{children}
		</sidebar_layout_1.Sidebar>);
};
exports.default = FrontendBlock;
