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
exports.Block = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var shared_context_1 = require("@woocommerce/shared-context");
var block_editor_1 = require("@wordpress/block-editor");
var block_settings_1 = require("@woocommerce/block-settings");
var shared_hocs_1 = require("@woocommerce/shared-hocs");
var product_name_1 = require("@woocommerce/base-components/product-name");
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
require("./style.scss");
var TagName = function (_a) {
    var children = _a.children, headingLevel = _a.headingLevel, _b = _a.elementType, ElementType = _b === void 0 ? "h" + headingLevel : _b, props = __rest(_a, ["children", "headingLevel", "elementType"]);
    return <ElementType {...props}>{children}</ElementType>;
};
/**
 * Product Title Block Component.
 *
 * @param {Object}  props                   Incoming props.
 * @param {string}  [props.className]       CSS Class name for the component.
 * @param {number}  [props.headingLevel]    Heading level (h1, h2 etc)
 * @param {boolean} [props.showProductLink] Whether or not to display a link to the product page.
 * @param {string}  [props.align]           Title alignment.
 * @param {string}  [props.textColor]       Title color name.
 * @param {string}  [props.fontSize]        Title font size name.
 * @param {string}  [props.style]           Title inline style.
 * will be used if this is not provided.
 * @return {*} The component.
 */
var Block = function (_a) {
    var _b, _c, _d, _e;
    var _f, _g, _h, _j;
    var className = _a.className, _k = _a.headingLevel, headingLevel = _k === void 0 ? 2 : _k, _l = _a.showProductLink, showProductLink = _l === void 0 ? true : _l, align = _a.align, textColor = _a.textColor, fontSize = _a.fontSize, style = _a.style;
    var parentClassName = (0, shared_context_1.useInnerBlockLayoutContext)().parentClassName;
    var product = (0, shared_context_1.useProductDataContext)().product;
    var dispatchStoreEvent = (0, hooks_1.useStoreEvents)().dispatchStoreEvent;
    var colorClass = (0, block_editor_1.getColorClassName)('color', textColor);
    var fontSizeClass = (0, block_editor_1.getFontSizeClass)(fontSize);
    var titleClasses = (0, classnames_1.default)('wp-block-woocommerce-product-title', (_b = {
            'has-text-color': textColor || ((_f = style === null || style === void 0 ? void 0 : style.color) === null || _f === void 0 ? void 0 : _f.text) || (style === null || style === void 0 ? void 0 : style.color)
        },
        _b["has-font-size"] = fontSize || ((_g = style === null || style === void 0 ? void 0 : style.typography) === null || _g === void 0 ? void 0 : _g.fontSize) || (style === null || style === void 0 ? void 0 : style.fontSize),
        _b[colorClass] = colorClass,
        _b[fontSizeClass] = fontSizeClass,
        _b));
    var titleStyle = {
        fontSize: (style === null || style === void 0 ? void 0 : style.fontSize) || ((_h = style === null || style === void 0 ? void 0 : style.typography) === null || _h === void 0 ? void 0 : _h.fontSize),
        color: ((_j = style === null || style === void 0 ? void 0 : style.color) === null || _j === void 0 ? void 0 : _j.text) || (style === null || style === void 0 ? void 0 : style.color),
    };
    if (!product.id) {
        return (<TagName headingLevel={headingLevel} className={(0, classnames_1.default)(className, 'wc-block-components-product-title', (_c = {},
                _c[parentClassName + "__product-title"] = parentClassName,
                _c["wc-block-components-product-title--align-" + align] = align && (0, block_settings_1.isFeaturePluginBuild)(),
                _c[titleClasses] = (0, block_settings_1.isFeaturePluginBuild)(),
                _c))}/>);
    }
    return (<TagName headingLevel={headingLevel} className={(0, classnames_1.default)(className, 'wc-block-components-product-title', (_d = {},
            _d[parentClassName + "__product-title"] = parentClassName,
            _d["wc-block-components-product-title--align-" + align] = align && (0, block_settings_1.isFeaturePluginBuild)(),
            _d))}>
			<product_name_1.default className={(0, classnames_1.default)((_e = {},
            _e[titleClasses] = (0, block_settings_1.isFeaturePluginBuild)(),
            _e))} disabled={!showProductLink} name={product.name} permalink={product.permalink} rel={showProductLink ? 'nofollow' : ''} onClick={function () {
            dispatchStoreEvent('product-view-link', {
                product: product,
            });
        }} style={(0, block_settings_1.isFeaturePluginBuild)() ? titleStyle : {}}/>
		</TagName>);
};
exports.Block = Block;
exports.default = (0, shared_hocs_1.withProductDataContext)(exports.Block);
