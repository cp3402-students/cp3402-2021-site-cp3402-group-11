"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var wordpress_components_1 = require("wordpress-components");
var classnames_1 = require("classnames");
var spinner_1 = require("@woocommerce/base-components/spinner");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Component that visually renders a button but semantically might be `<button>` or `<a>` depending
 * on the props.
 */
var Button = function (_a) {
    var className = _a.className, _b = _a.showSpinner, showSpinner = _b === void 0 ? false : _b, children = _a.children, props = __rest(_a, ["className", "showSpinner", "children"]);
    var buttonClassName = (0, classnames_1.default)('wc-block-components-button', className, {
        'wc-block-components-button--loading': showSpinner,
    });
    return (<wordpress_components_1.Button className={buttonClassName} {...props}>
			{showSpinner && <spinner_1.default />}
			<span className="wc-block-components-button__text">
				{children}
			</span>
		</wordpress_components_1.Button>);
};
exports.default = Button;
