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
var html_entities_1 = require("@wordpress/html-entities");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Render the Product name.
 *
 * The store API runs titles through `wp_kses_post()` which removes dangerous HTML tags, so using it inside `dangerouslySetInnerHTML` is considered safe.
 */
exports.default = (function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, name = _a.name, _d = _a.permalink, permalink = _d === void 0 ? '' : _d, rel = _a.rel, style = _a.style, onClick = _a.onClick, props = __rest(_a, ["className", "disabled", "name", "permalink", "rel", "style", "onClick"]);
    var classes = (0, classnames_1.default)('wc-block-components-product-name', className);
    if (disabled) {
        // Cast the props as type HTMLSpanElement.
        var disabledProps = props;
        return (<span className={classes} {...disabledProps} dangerouslySetInnerHTML={{
                __html: (0, html_entities_1.decodeEntities)(name),
            }}/>);
    }
    return (<a className={classes} href={permalink} rel={rel} {...props} dangerouslySetInnerHTML={{
            __html: (0, html_entities_1.decodeEntities)(name),
        }} style={style}/>);
});
