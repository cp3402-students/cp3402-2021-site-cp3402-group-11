"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var hooks_1 = require("@woocommerce/base-context/hooks");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var settings_1 = require("@woocommerce/settings");
var shipping_via_1 = require("@woocommerce/base-components/cart-checkout/totals/shipping/shipping-via");
/**
 * Internal dependencies
 */
var shipping_rate_selector_1 = require("./shipping-rate-selector");
var has_shipping_rate_1 = require("./has-shipping-rate");
var shipping_calculator_1 = require("../../shipping-calculator");
var shipping_location_1 = require("../../shipping-location");
require("./style.scss");
var CalculatorButton = function (_a) {
    var _b = _a.label, label = _b === void 0 ? (0, i18n_1.__)('Calculate', 'woo-gutenberg-products-block') : _b, isShippingCalculatorOpen = _a.isShippingCalculatorOpen, setIsShippingCalculatorOpen = _a.setIsShippingCalculatorOpen;
    return (<button className="wc-block-components-totals-shipping__change-address-button" onClick={function () {
            setIsShippingCalculatorOpen(!isShippingCalculatorOpen);
        }} aria-expanded={isShippingCalculatorOpen}>
			{label}
		</button>);
};
var ShippingAddress = function (_a) {
    var showCalculator = _a.showCalculator, isShippingCalculatorOpen = _a.isShippingCalculatorOpen, setIsShippingCalculatorOpen = _a.setIsShippingCalculatorOpen, shippingAddress = _a.shippingAddress;
    return (<>
			<shipping_location_1.default address={shippingAddress}/>
			{showCalculator && (<CalculatorButton label={(0, i18n_1.__)('(change address)', 'woo-gutenberg-products-block')} isShippingCalculatorOpen={isShippingCalculatorOpen} setIsShippingCalculatorOpen={setIsShippingCalculatorOpen}/>)}
		</>);
};
var NoShippingPlaceholder = function (_a) {
    var showCalculator = _a.showCalculator, isShippingCalculatorOpen = _a.isShippingCalculatorOpen, setIsShippingCalculatorOpen = _a.setIsShippingCalculatorOpen;
    if (!showCalculator) {
        return (<em>
				{(0, i18n_1.__)('Calculated during checkout', 'woo-gutenberg-products-block')}
			</em>);
    }
    return (<CalculatorButton isShippingCalculatorOpen={isShippingCalculatorOpen} setIsShippingCalculatorOpen={setIsShippingCalculatorOpen}/>);
};
var TotalsShipping = function (_a) {
    var currency = _a.currency, values = _a.values, _b = _a.showCalculator, showCalculator = _b === void 0 ? true : _b, _c = _a.showRateSelector, showRateSelector = _c === void 0 ? true : _c, className = _a.className;
    var _d = (0, element_1.useState)(false), isShippingCalculatorOpen = _d[0], setIsShippingCalculatorOpen = _d[1];
    var _e = (0, hooks_1.useStoreCart)(), shippingAddress = _e.shippingAddress, cartHasCalculatedShipping = _e.cartHasCalculatedShipping, shippingRates = _e.shippingRates, shippingRatesLoading = _e.shippingRatesLoading;
    var totalShippingValue = (0, settings_1.getSetting)('displayCartPricesIncludingTax', false)
        ? parseInt(values.total_shipping, 10) +
            parseInt(values.total_shipping_tax, 10)
        : parseInt(values.total_shipping, 10);
    var hasRates = (0, has_shipping_rate_1.default)(shippingRates) || totalShippingValue;
    var calculatorButtonProps = {
        isShippingCalculatorOpen: isShippingCalculatorOpen,
        setIsShippingCalculatorOpen: setIsShippingCalculatorOpen,
    };
    var selectedShippingRates = shippingRates.flatMap(function (shippingPackage) {
        return shippingPackage.shipping_rates
            .filter(function (rate) { return rate.selected; })
            .flatMap(function (rate) { return rate.name; });
    });
    return (<div className={(0, classnames_1.default)('wc-block-components-totals-shipping', className)}>
			<blocks_checkout_1.TotalsItem label={(0, i18n_1.__)('Shipping', 'woo-gutenberg-products-block')} value={cartHasCalculatedShipping ? (totalShippingValue) : (<NoShippingPlaceholder showCalculator={showCalculator} {...calculatorButtonProps}/>)} description={<>
						{cartHasCalculatedShipping && (<>
								<shipping_via_1.ShippingVia selectedShippingRates={selectedShippingRates}/>
								<ShippingAddress shippingAddress={shippingAddress} showCalculator={showCalculator} {...calculatorButtonProps}/>
							</>)}
					</>} currency={currency}/>
			{showCalculator && isShippingCalculatorOpen && (<shipping_calculator_1.default onUpdate={function () {
                setIsShippingCalculatorOpen(false);
            }}/>)}
			{showRateSelector && cartHasCalculatedShipping && (<shipping_rate_selector_1.default hasRates={hasRates} shippingRates={shippingRates} shippingRatesLoading={shippingRatesLoading}/>)}
		</div>);
};
exports.default = TotalsShipping;
