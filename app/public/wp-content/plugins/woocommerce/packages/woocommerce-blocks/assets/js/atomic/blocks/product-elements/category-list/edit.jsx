"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var components_1 = require("@wordpress/components");
var edit_product_link_1 = require("@woocommerce/editor-components/edit-product-link");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var with_product_selector_1 = require("../shared/with-product-selector");
var constants_1 = require("./constants");
var Edit = function (_a) {
    var attributes = _a.attributes;
    return (<>
			<edit_product_link_1.default />
			<components_1.Disabled>
				<block_1.default {...attributes}/>
			</components_1.Disabled>
		</>);
};
exports.default = (0, with_product_selector_1.default)({
    icon: constants_1.BLOCK_ICON,
    label: constants_1.BLOCK_TITLE,
    description: (0, i18n_1.__)('Choose a product to display its categories.', 'woo-gutenberg-products-block'),
})(Edit);
