"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
var product_details_1 = require("../product-details");
var product_summary_1 = require("../product-summary");
require("./style.scss");
var ProductMetadata = function (_a) {
    var _b = _a.shortDescription, shortDescription = _b === void 0 ? '' : _b, _c = _a.fullDescription, fullDescription = _c === void 0 ? '' : _c, _d = _a.itemData, itemData = _d === void 0 ? [] : _d, _e = _a.variation, variation = _e === void 0 ? [] : _e;
    return (<div className="wc-block-components-product-metadata">
			<product_summary_1.default className="wc-block-components-product-metadata__description" shortDescription={shortDescription} fullDescription={fullDescription}/>
			<product_details_1.default details={itemData}/>
			<product_details_1.default details={variation.map(function (_a) {
            var _b = _a.attribute, attribute = _b === void 0 ? '' : _b, value = _a.value;
            return ({
                name: attribute,
                value: value,
            });
        })}/>
		</div>);
};
exports.default = ProductMetadata;
