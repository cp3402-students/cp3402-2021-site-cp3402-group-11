"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var block_editor_1 = require("@wordpress/block-editor");
var wordpress_components_1 = require("wordpress-components");
var hooks_1 = require("@woocommerce/base-context/hooks");
var icons_1 = require("@woocommerce/icons");
var settings_1 = require("@woocommerce/settings");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
require("./editor.scss");
/**
 * Renders a placeholder in the editor.
 */
var NoExpressPaymentMethodsPlaceholder = function () {
    return (<wordpress_components_1.Placeholder icon={<icons_1.Icon srcElement={icons_1.card}/>} label={(0, i18n_1.__)('Express Checkout', 'woo-gutenberg-products-block')} className="wp-block-woocommerce-checkout-express-payment-block-placeholder">
			<span className="wp-block-woocommerce-checkout-express-payment-block-placeholder__description">
				{(0, i18n_1.__)("Your store doesn't have any Payment Methods that support the Express Checkout Block. If they are added, they will be shown here.", 'woo-gutenberg-products-block')}
			</span>
			<wordpress_components_1.Button isPrimary href={settings_1.ADMIN_URL + "admin.php?page=wc-settings&tab=checkout"} target="_blank" rel="noopener noreferrer" className="wp-block-woocommerce-checkout-express-payment-block-placeholder__button">
				{(0, i18n_1.__)('Configure Payment Methods', 'woo-gutenberg-products-block')}
			</wordpress_components_1.Button>
		</wordpress_components_1.Placeholder>);
};
var Edit = function (_a) {
    var attributes = _a.attributes;
    var _b = (0, hooks_1.useExpressPaymentMethods)(), paymentMethods = _b.paymentMethods, isInitialized = _b.isInitialized;
    var hasExpressPaymentMethods = Object.keys(paymentMethods).length > 0;
    var blockProps = (0, block_editor_1.useBlockProps)({
        className: (0, classnames_1.default)({
            'wp-block-woocommerce-cart-express-payment-block--has-express-payment-methods': hasExpressPaymentMethods,
        }),
    });
    var className = attributes.className;
    if (!isInitialized) {
        return null;
    }
    return (<div {...blockProps}>
			{hasExpressPaymentMethods ? (<block_1.default className={className}/>) : (<NoExpressPaymentMethodsPlaceholder />)}
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
