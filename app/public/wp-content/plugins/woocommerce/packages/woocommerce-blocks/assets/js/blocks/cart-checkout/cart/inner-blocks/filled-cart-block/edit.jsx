"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var block_editor_1 = require("@wordpress/block-editor");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var sidebar_layout_1 = require("@woocommerce/base-components/sidebar-layout");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var shared_1 = require("../../../shared");
require("./editor.scss");
var context_1 = require("../../context");
var Edit = function (_a) {
    var clientId = _a.clientId;
    var blockProps = (0, block_editor_1.useBlockProps)();
    var currentView = (0, base_context_1.useEditorContext)().currentView;
    var hasDarkControls = (0, context_1.useCartBlockContext)().hasDarkControls;
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.FILLED_CART);
    var defaultTemplate = [
        ['woocommerce/cart-items-block', {}, []],
        ['woocommerce/cart-totals-block', {}, []],
    ];
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<div {...blockProps} hidden={currentView !== 'woocommerce/filled-cart-block'}>
			<sidebar_layout_1.SidebarLayout className={(0, classnames_1.default)('wc-block-cart', {
            'has-dark-controls': hasDarkControls,
        })}>
				<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks} template={defaultTemplate} templateLock="insert"/>
			</sidebar_layout_1.SidebarLayout>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
