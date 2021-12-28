"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var summary_1 = require("@woocommerce/base-components/summary");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Returns an element containing a summary of the product.
 *
 * @param {Object} props                  Incoming props for the component.
 * @param {string} props.className        CSS class name used.
 * @param {string} props.shortDescription Short description for the product.
 * @param {string} props.fullDescription  Full description for the product.
 */
var ProductSummary = function (_a) {
    var className = _a.className, _b = _a.shortDescription, shortDescription = _b === void 0 ? '' : _b, _c = _a.fullDescription, fullDescription = _c === void 0 ? '' : _c;
    var source = shortDescription ? shortDescription : fullDescription;
    if (!source) {
        return null;
    }
    return (<summary_1.default className={className} source={source} maxLength={15} countType={block_settings_1.blocksConfig.wordCountType || 'words'}/>);
};
exports.default = ProductSummary;
