"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var radio_control_1 = require("@woocommerce/base-components/radio-control");
/**
 * Internal dependencies
 */
var render_package_rate_option_1 = require("./render-package-rate-option");
var PackageRates = function (_a) {
    var className = _a.className, noResultsMessage = _a.noResultsMessage, onSelectRate = _a.onSelectRate, rates = _a.rates, _b = _a.renderOption, renderOption = _b === void 0 ? render_package_rate_option_1.renderPackageRateOption : _b, selected = _a.selected;
    if (rates.length === 0) {
        return noResultsMessage;
    }
    if (rates.length > 1) {
        return (<radio_control_1.default className={className} onChange={function (selectedRateId) {
                onSelectRate(selectedRateId);
            }} selected={selected} options={rates.map(renderOption)}/>);
    }
    var _c = renderOption(rates[0]), label = _c.label, secondaryLabel = _c.secondaryLabel, description = _c.description, secondaryDescription = _c.secondaryDescription;
    return (<radio_control_1.RadioControlOptionLayout label={label} secondaryLabel={secondaryLabel} description={description} secondaryDescription={secondaryDescription}/>);
};
exports.default = PackageRates;
