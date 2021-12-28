"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartCheckoutCompatibilityNotice = void 0;
/**
 * External dependencies
 */
var components_1 = require("@wordpress/components");
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var use_compatibility_notice_1 = require("./use-compatibility-notice");
var woo_image_1 = require("./woo-image");
function CartCheckoutCompatibilityNotice(_a) {
    var blockName = _a.blockName;
    var _b = (0, use_compatibility_notice_1.useCompatibilityNotice)(blockName), isVisible = _b[0], dismissNotice = _b[1];
    if ((0, settings_1.isWpVersion)('5.4', '<=') || !isVisible) {
        return null;
    }
    return (<components_1.Guide className="edit-post-welcome-guide" contentLabel={(0, i18n_1.__)('Compatibility notice', 'woo-gutenberg-products-block')} onFinish={function () { return dismissNotice(); }} finishButtonText={(0, i18n_1.__)('Got it!', 'woo-gutenberg-products-block')} pages={[
            {
                image: <woo_image_1.default />,
                content: (<>
							<h1 className="edit-post-welcome-guide__heading">
								{(0, i18n_1.__)('Compatibility notice', 'woo-gutenberg-products-block')}
							</h1>
							<p className="edit-post-welcome-guide__text">
								{(0, element_1.createInterpolateElement)((0, i18n_1.__)('This block may not be compatible with <em>all</em> checkout extensions and integrations.', 'woo-gutenberg-products-block'), {
                        em: <em />,
                    })}
							</p>
							<p className="edit-post-welcome-guide__text">
								{(0, element_1.createInterpolateElement)((0, i18n_1.__)('We recommend reviewing our <a>expanding list</a> of compatible extensions prior to using this block on a live store.', 'woo-gutenberg-products-block'), {
                        a: (
                        // eslint-disable-next-line jsx-a11y/anchor-has-content
                        <a href="https://docs.woocommerce.com/document/cart-checkout-blocks-support-status/" target="_blank" rel="noopener noreferrer"/>),
                    })}
							</p>
						</>),
            },
        ]}/>);
}
exports.CartCheckoutCompatibilityNotice = CartCheckoutCompatibilityNotice;
