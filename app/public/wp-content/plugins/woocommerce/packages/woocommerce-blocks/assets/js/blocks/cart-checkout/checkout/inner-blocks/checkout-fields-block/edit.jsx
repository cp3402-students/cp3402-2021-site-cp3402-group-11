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
var context_1 = require("../../context");
var shared_1 = require("../../../shared");
require("./style.scss");
var Edit = function (_a) {
    var clientId = _a.clientId, attributes = _a.attributes;
    var blockProps = (0, block_editor_1.useBlockProps)({
        className: (0, classnames_1.default)('wc-block-checkout__main', attributes === null || attributes === void 0 ? void 0 : attributes.className),
    });
    var _b = (0, context_1.useCheckoutBlockContext)(), showOrderNotes = _b.showOrderNotes, showPolicyLinks = _b.showPolicyLinks, showReturnToCart = _b.showReturnToCart, cartPageId = _b.cartPageId;
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(blocks_checkout_1.innerBlockAreas.CHECKOUT_FIELDS);
    var Controls = (0, context_1.useCheckoutBlockControlsContext)().addressFieldControls;
    var defaultTemplate = [
        ['woocommerce/checkout-express-payment-block', {}, []],
        ['woocommerce/checkout-contact-information-block', {}, []],
        ['woocommerce/checkout-shipping-address-block', {}, []],
        ['woocommerce/checkout-billing-address-block', {}, []],
        ['woocommerce/checkout-shipping-methods-block', {}, []],
        ['woocommerce/checkout-payment-block', {}, []],
        showOrderNotes
            ? ['woocommerce/checkout-order-note-block', {}, []]
            : false,
        showPolicyLinks
            ? ['woocommerce/checkout-terms-block', {}, []]
            : false,
        [
            'woocommerce/checkout-actions-block',
            {
                showReturnToCart: showReturnToCart,
                cartPageId: cartPageId,
            },
            [],
        ],
    ].filter(Boolean);
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
        defaultTemplate: defaultTemplate,
    });
    return (<sidebar_layout_1.Main {...blockProps}>
			<Controls />
			<form className="wc-block-components-form wc-block-checkout__form">
				<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks} templateLock={false} template={defaultTemplate} renderAppender={block_editor_1.InnerBlocks.ButtonBlockAppender}/>
			</form>
		</sidebar_layout_1.Main>);
};
exports.Edit = Edit;
var Save = function () {
    return (<div {...block_editor_1.useBlockProps.save()}>
			<block_editor_1.InnerBlocks.Content />
		</div>);
};
exports.Save = Save;
