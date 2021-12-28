"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var classnames_1 = require("classnames");
var FrontendBlock = function (_a) {
    var children = _a.children, className = _a.className;
    return (<sidebar_layout_1.Main className={(0, classnames_1.default)('wc-block-cart__main', className)}>
			{children}
		</sidebar_layout_1.Main>);
};
exports.default = FrontendBlock;
