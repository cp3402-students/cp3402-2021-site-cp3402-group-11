"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var icons_1 = require("@woocommerce/icons");
/**
 * Internal dependencies
 */
require("./style.scss");
var QuantityBadge = function (_a) {
    var count = _a.count, colorClassNames = _a.colorClassNames, style = _a.style;
    return (<span className="wc-block-mini-cart__quantity-badge">
			<icons_1.Icon className="wc-block-mini-cart__icon" size={20} srcElement={icons_1.miniCart}/>
			<span className={"wc-block-mini-cart__badge " + colorClassNames} style={style}>
				{count}
			</span>
		</span>);
};
exports.default = QuantityBadge;
