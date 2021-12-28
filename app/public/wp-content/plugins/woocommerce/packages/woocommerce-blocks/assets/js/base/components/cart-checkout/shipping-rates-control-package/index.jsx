"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingRatesControlPackage = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var html_entities_1 = require("@wordpress/html-entities");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var label_1 = require("@woocommerce/base-components/label");
var hooks_1 = require("@woocommerce/base-context/hooks");
/**
 * Internal dependencies
 */
var package_rates_1 = require("./package-rates");
require("./style.scss");
var ShippingRatesControlPackage = function (_a) {
    var packageId = _a.packageId, className = _a.className, noResultsMessage = _a.noResultsMessage, renderOption = _a.renderOption, packageData = _a.packageData, _b = _a.collapsible, collapsible = _b === void 0 ? false : _b, _c = _a.collapse, collapse = _c === void 0 ? false : _c, _d = _a.showItems, showItems = _d === void 0 ? false : _d;
    var _e = (0, hooks_1.useSelectShippingRate)(packageId, packageData.shipping_rates), selectShippingRate = _e.selectShippingRate, selectedShippingRate = _e.selectedShippingRate;
    var header = (<>
			{(showItems || collapsible) && (<div className="wc-block-components-shipping-rates-control__package-title">
					{packageData.name}
				</div>)}
			{showItems && (<ul className="wc-block-components-shipping-rates-control__package-items">
					{Object.values(packageData.items).map(function (v) {
                var name = (0, html_entities_1.decodeEntities)(v.name);
                var quantity = v.quantity;
                return (<li key={v.key} className="wc-block-components-shipping-rates-control__package-item">
								<label_1.default label={quantity > 1
                        ? name + " \u00D7 " + quantity
                        : "" + name} screenReaderLabel={(0, i18n_1.sprintf)(
                    /* translators: %1$s name of the product (ie: Sunglasses), %2$d number of units in the current cart package */
                    (0, i18n_1._n)('%1$s (%2$d unit)', '%1$s (%2$d units)', quantity, 'woo-gutenberg-products-block'), name, quantity)}/>
							</li>);
            })}
				</ul>)}
		</>);
    var body = (<package_rates_1.default className={className} noResultsMessage={noResultsMessage} rates={packageData.shipping_rates} onSelectRate={selectShippingRate} selected={selectedShippingRate} renderOption={renderOption}/>);
    if (collapsible) {
        return (<blocks_checkout_1.Panel className="wc-block-components-shipping-rates-control__package" initialOpen={!collapse} title={header}>
				{body}
			</blocks_checkout_1.Panel>);
    }
    return (<div className={(0, classnames_1.default)('wc-block-components-shipping-rates-control__package', className)}>
			{header}
			{body}
		</div>);
};
exports.ShippingRatesControlPackage = ShippingRatesControlPackage;
exports.default = exports.ShippingRatesControlPackage;
