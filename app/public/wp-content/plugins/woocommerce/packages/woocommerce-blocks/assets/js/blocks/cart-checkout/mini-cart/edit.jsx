"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var block_editor_1 = require("@wordpress/block-editor");
var price_format_1 = require("@woocommerce/price-format");
var compatibility_notices_1 = require("@woocommerce/editor-components/compatibility-notices");
var components_1 = require("@wordpress/components");
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
var quantity_badge_1 = require("./quantity-badge");
var MiniCartBlock = function (_a) {
    var _b, _c, _d, _e;
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var transparentButton = attributes.transparentButton, backgroundColor = attributes.backgroundColor, textColor = attributes.textColor, style = attributes.style;
    var blockProps = (0, block_editor_1.useBlockProps)({
        className: (0, classnames_1.default)('wc-block-mini-cart', {
            'is-transparent': transparentButton,
        }),
    });
    /**
     * @todo Replace `getColorClassName` and manual style manipulation with
     * `useColorProps` once the hook is no longer experimental.
     */
    var backgroundClass = (0, block_editor_1.getColorClassName)('background-color', backgroundColor);
    var textColorClass = (0, block_editor_1.getColorClassName)('color', textColor);
    var colorStyle = {
        backgroundColor: (_b = style === null || style === void 0 ? void 0 : style.color) === null || _b === void 0 ? void 0 : _b.background,
        color: (_c = style === null || style === void 0 ? void 0 : style.color) === null || _c === void 0 ? void 0 : _c.text,
    };
    var colorClassNames = (0, classnames_1.default)(backgroundClass, textColorClass, {
        'has-background': backgroundClass || ((_d = style === null || style === void 0 ? void 0 : style.color) === null || _d === void 0 ? void 0 : _d.background),
        'has-text-color': textColorClass || ((_e = style === null || style === void 0 ? void 0 : style.color) === null || _e === void 0 ? void 0 : _e.text),
    });
    var productCount = 0;
    var productTotal = 0;
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				<components_1.PanelBody title={(0, i18n_1.__)('Button style', 'woo-gutenberg-products-block')}>
					<components_1.ToggleControl label={(0, i18n_1.__)('Use transparent button', 'woo-gutenberg-products-block')} checked={transparentButton} onChange={function () {
            return setAttributes({
                transparentButton: !transparentButton,
            });
        }}/>
				</components_1.PanelBody>
			</block_editor_1.InspectorControls>
			<button className={(0, classnames_1.default)('wc-block-mini-cart__button', colorClassNames)} style={colorStyle}>
				<span className="wc-block-mini-cart__amount">
					{(0, price_format_1.formatPrice)(productTotal)}
				</span>
				<quantity_badge_1.default count={productCount} colorClassNames={colorClassNames} style={colorStyle}/>
			</button>
			<compatibility_notices_1.CartCheckoutCompatibilityNotice blockName="mini-cart"/>
		</div>);
};
exports.default = MiniCartBlock;
