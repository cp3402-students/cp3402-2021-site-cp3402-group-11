"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
var button_1 = require("@woocommerce/base-components/button");
var block_settings_1 = require("@woocommerce/block-settings");
var base_context_1 = require("@woocommerce/base-context");
var base_hooks_1 = require("@woocommerce/base-hooks");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Checkout button rendered in the full cart page.
 */
var Block = function (_a) {
    var checkoutPageId = _a.checkoutPageId, className = _a.className;
    var link = (0, settings_1.getSetting)('page-' + checkoutPageId, false);
    var isCalculating = (0, base_context_1.useCheckoutContext)().isCalculating;
    var _b = (0, base_hooks_1.usePositionRelativeToViewport)(), positionReferenceElement = _b[0], positionRelativeToViewport = _b[1];
    var _c = (0, element_1.useState)(false), showSpinner = _c[0], setShowSpinner = _c[1];
    (0, element_1.useEffect)(function () {
        // Add a listener to remove the spinner on the checkout button, so the saved page snapshot does not
        // contain the spinner class. See https://archive.is/lOEW0 for why this is needed for Safari.
        if (typeof global.addEventListener !== 'function' ||
            typeof global.removeEventListener !== 'function') {
            return;
        }
        var hideSpinner = function () {
            setShowSpinner(false);
        };
        global.addEventListener('pageshow', hideSpinner);
        return function () {
            global.removeEventListener('pageshow', hideSpinner);
        };
    }, []);
    var submitContainerContents = (<button_1.default className="wc-block-cart__submit-button" href={link || block_settings_1.CHECKOUT_URL} disabled={isCalculating} onClick={function () { return setShowSpinner(true); }} showSpinner={showSpinner}>
			{(0, i18n_1.__)('Proceed to Checkout', 'woo-gutenberg-products-block')}
		</button_1.default>);
    return (<div className={(0, classnames_1.default)('wc-block-cart__submit', className)}>
			{positionReferenceElement}
			{/* The non-sticky container must always be visible because it gives height to its parent, which is required to calculate when it becomes visible in the viewport. */}
			<div className="wc-block-cart__submit-container">
				{submitContainerContents}
			</div>
			{/* If the positionReferenceElement is below the viewport, display the sticky container. */}
			{positionRelativeToViewport === 'below' && (<div className="wc-block-cart__submit-container wc-block-cart__submit-container--sticky">
					{submitContainerContents}
				</div>)}
		</div>);
};
exports.default = Block;
