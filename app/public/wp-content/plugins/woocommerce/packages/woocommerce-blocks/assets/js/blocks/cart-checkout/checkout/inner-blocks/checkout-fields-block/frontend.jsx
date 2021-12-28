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
    return (<sidebar_layout_1.Main className={(0, classnames_1.default)('wc-block-checkout__main', className)}>
			<form className="wc-block-components-form wc-block-checkout__form">
				{children}
			</form>
		</sidebar_layout_1.Main>);
};
exports.default = FrontendBlock;
