"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var base_context_1 = require("@woocommerce/base-context");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var shared_1 = require("../../../shared");
var icon_data_uri_js_1 = require("./icon-data-uri.js");
require("./style.scss");
var browseStoreTemplate = block_settings_1.SHOP_URL
    ? [
        'core/paragraph',
        {
            align: 'center',
            content: (0, i18n_1.sprintf)(
            /* translators: %s is the link to the store product directory. */
            (0, i18n_1.__)('<a href="%s">Browse store</a>.', 'woo-gutenberg-products-block'), block_settings_1.SHOP_URL),
            dropCap: false,
        },
    ]
    : null;
var defaultTemplate = [
    [
        'core/image',
        {
            align: 'center',
            url: icon_data_uri_js_1.default,
            sizeSlug: 'small',
        },
    ],
    [
        'core/heading',
        {
            textAlign: 'center',
            content: (0, i18n_1.__)('Your cart is currently empty!', 'woo-gutenberg-products-block'),
            level: 2,
            className: 'wc-block-cart__empty-cart__title',
        },
    ],
    browseStoreTemplate,
    [
        'core/separator',
        {
            className: 'is-style-dots',
        },
    ],
    [
        'core/heading',
        {
            textAlign: 'center',
            content: (0, i18n_1.__)('New in store', 'woo-gutenberg-products-block'),
            level: 2,
        },
    ],
    [
        'woocommerce/product-new',
        {
            columns: 3,
            rows: 1,
        },
    ],
].filter(Boolean);
var Edit = function (_a) {
    var clientId = _a.clientId;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var currentView = (0, base_context_1.useEditorContext)().currentView;
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.EMPTY_CART);
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<div {...blockProps} hidden={currentView !== 'woocommerce/empty-cart-block'}>
			<block_editor_1.InnerBlocks template={defaultTemplate} templateLock={false} renderAppender={block_editor_1.InnerBlocks.ButtonBlockAppender}/>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
