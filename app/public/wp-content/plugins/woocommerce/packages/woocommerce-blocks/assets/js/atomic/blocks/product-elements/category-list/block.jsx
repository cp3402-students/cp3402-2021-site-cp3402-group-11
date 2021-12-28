"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var shared_context_1 = require("@woocommerce/shared-context");
var lodash_1 = require("lodash");
var shared_hocs_1 = require("@woocommerce/shared-hocs");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Product Category Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @return {*} The component.
 */
var Block = function (_a) {
    var _b;
    var className = _a.className;
    var parentClassName = (0, shared_context_1.useInnerBlockLayoutContext)().parentClassName;
    var product = (0, shared_context_1.useProductDataContext)().product;
    if ((0, lodash_1.isEmpty)(product.categories)) {
        return null;
    }
    return (<div className={(0, classnames_1.default)(className, 'wc-block-components-product-category-list', (_b = {},
            _b[parentClassName + "__product-category-list"] = parentClassName,
            _b))}>
			{(0, i18n_1.__)('Categories:', 'woo-gutenberg-products-block')}{' '}
			<ul>
				{Object.values(product.categories).map(function (_a) {
            var name = _a.name, link = _a.link, slug = _a.slug;
            return (<li key={"category-list-item-" + slug}>
								<a href={link}>{name}</a>
							</li>);
        })}
			</ul>
		</div>);
};
exports.default = (0, shared_hocs_1.withProductDataContext)(Block);
