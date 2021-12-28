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
require("./style.scss");
var shared_1 = require("../../../shared");
var Edit = function (_a) {
    var clientId = _a.clientId;
    var blockProps = (0, block_editor_1.useBlockProps)({ className: 'wc-block-cart__sidebar' });
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.CART_TOTALS);
    var defaultTemplate = [
        ['woocommerce/cart-order-summary-block', {}, []],
        ['woocommerce/cart-express-payment-block', {}, []],
        ['woocommerce/proceed-to-checkout-block', {}, []],
        ['woocommerce/cart-accepted-payment-methods-block', {}, []],
    ];
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<sidebar_layout_1.Sidebar {...blockProps}>
			<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks} template={defaultTemplate} templateLock={false} renderAppender={block_editor_1.InnerBlocks.ButtonBlockAppender}/>
		</sidebar_layout_1.Sidebar>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
