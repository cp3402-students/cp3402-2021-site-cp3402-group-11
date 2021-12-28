"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var block_editor_1 = require("@wordpress/block-editor");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
var shared_1 = require("../../../shared");
var Edit = function (_a) {
    var clientId = _a.clientId;
    var blockProps = (0, block_editor_1.useBlockProps)({ className: 'wc-block-cart__main' });
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.CART_ITEMS);
    var defaultTemplate = [
        ['woocommerce/cart-line-items-block', {}, []],
    ];
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<sidebar_layout_1.Main {...blockProps}>
			<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks} template={defaultTemplate} templateLock={false} renderAppender={block_editor_1.InnerBlocks.ButtonBlockAppender}/>
		</sidebar_layout_1.Main>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
