"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var data_1 = require("@wordpress/data");
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var page_selector_1 = require("@woocommerce/editor-components/page-selector");
var components_1 = require("@wordpress/components");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var Edit = function (_a) {
    var attributes = _a.attributes, setAttributes = _a.setAttributes;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var _b = attributes.cartPageId, cartPageId = _b === void 0 ? 0 : _b, _c = attributes.showReturnToCart, showReturnToCart = _c === void 0 ? true : _c;
    var savedCartPageId = (0, element_1.useRef)(cartPageId).current;
    var currentPostId = (0, data_1.useSelect)(function (select) {
        if (!savedCartPageId) {
            var store = select('core/editor');
            return store.getCurrentPostId();
        }
        return savedCartPageId;
    }, [savedCartPageId]);
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				<components_1.PanelBody title={(0, i18n_1.__)('Account options', 'woo-gutenberg-products-block')}>
					<components_1.ToggleControl label={(0, i18n_1.__)('Show a "Return to Cart" link', 'woo-gutenberg-products-block')} checked={showReturnToCart} onChange={function () {
            return setAttributes({
                showReturnToCart: !showReturnToCart,
            });
        }}/>
				</components_1.PanelBody>
				{showReturnToCart &&
            !(currentPostId === block_settings_1.CHECKOUT_PAGE_ID &&
                savedCartPageId === 0) && (<page_selector_1.default pageId={cartPageId} setPageId={function (id) {
                return setAttributes({ cartPageId: id });
            }} labels={{
                title: (0, i18n_1.__)('Return to Cart button', 'woo-gutenberg-products-block'),
                default: (0, i18n_1.__)('WooCommerce Cart Page', 'woo-gutenberg-products-block'),
            }}/>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default showReturnToCart={showReturnToCart} cartPageId={cartPageId}/>
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
