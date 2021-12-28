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
    var _b = attributes.checkoutPageId, checkoutPageId = _b === void 0 ? 0 : _b, className = attributes.className;
    var savedCheckoutPageId = (0, element_1.useRef)(checkoutPageId).current;
    var currentPostId = (0, data_1.useSelect)(function (select) {
        if (!savedCheckoutPageId) {
            var store = select('core/editor');
            return store.getCurrentPostId();
        }
        return savedCheckoutPageId;
    }, [savedCheckoutPageId]);
    return (<div {...blockProps}>
			<block_editor_1.InspectorControls>
				{!(currentPostId === block_settings_1.CART_PAGE_ID && savedCheckoutPageId === 0) && (<page_selector_1.default pageId={checkoutPageId} setPageId={function (id) {
                return setAttributes({ checkoutPageId: id });
            }} labels={{
                title: (0, i18n_1.__)('Proceed to Checkout button', 'woo-gutenberg-products-block'),
                default: (0, i18n_1.__)('WooCommerce Checkout Page', 'woo-gutenberg-products-block'),
            }}/>)}
			</block_editor_1.InspectorControls>
			<components_1.Disabled>
				<block_1.default checkoutPageId={checkoutPageId} className={className}/>
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
