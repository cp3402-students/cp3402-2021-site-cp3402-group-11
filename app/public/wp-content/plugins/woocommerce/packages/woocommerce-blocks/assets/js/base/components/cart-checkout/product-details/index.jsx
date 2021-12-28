"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var lodash_1 = require("lodash");
var html_entities_1 = require("@wordpress/html-entities");
/**
 * Internal dependencies
 */
require("./style.scss");
// Component to display cart item data and variations.
var ProductDetails = function (_a) {
    var _b = _a.details, details = _b === void 0 ? [] : _b;
    if (!Array.isArray(details)) {
        return null;
    }
    details = details.filter(function (detail) { return !detail.hidden; });
    if (details.length === 0) {
        return null;
    }
    return (<ul className="wc-block-components-product-details">
			{details.map(function (detail) {
            var className = detail.name
                ? "wc-block-components-product-details__" + (0, lodash_1.kebabCase)(detail.name)
                : '';
            return (<li key={detail.name + (detail.display || detail.value)} className={className}>
						{detail.name && (<>
								<span className="wc-block-components-product-details__name">
									{(0, html_entities_1.decodeEntities)(detail.name)}:
								</span>{' '}
							</>)}
						<span className="wc-block-components-product-details__value">
							{(0, html_entities_1.decodeEntities)(detail.display || detail.value)}
						</span>
					</li>);
        })}
		</ul>);
};
exports.default = ProductDetails;
