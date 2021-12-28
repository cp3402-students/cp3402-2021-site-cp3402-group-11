"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * Internal dependencies
 */
require("./style.scss");
var shared_1 = require("../../../shared");
var context_1 = require("../../context");
var Edit = function (_a) {
    var clientId = _a.clientId, attributes = _a.attributes;
    var blockProps = (0, block_editor_1.useBlockProps)({
        className: (0, classnames_1.default)('wc-block-checkout__sidebar', attributes === null || attributes === void 0 ? void 0 : attributes.className),
    });
    var showRateAfterTaxName = (0, context_1.useCheckoutBlockContext)().showRateAfterTaxName;
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.CHECKOUT_TOTALS);
    var defaultTemplate = [
        [
            'woocommerce/checkout-order-summary-block',
            {
                showRateAfterTaxName: showRateAfterTaxName,
            },
            [],
        ],
    ];
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<sidebar_layout_1.Sidebar {...blockProps}>
			<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks} templateLock={false} template={defaultTemplate} renderAppender={block_editor_1.InnerBlocks.ButtonBlockAppender}/>
		</sidebar_layout_1.Sidebar>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
