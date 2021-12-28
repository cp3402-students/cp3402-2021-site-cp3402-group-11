"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var country_input_1 = require("./country-input");
var BillingCountryInput = function (props) {
    return <country_input_1.default countries={block_settings_1.ALLOWED_COUNTRIES} {...props}/>;
};
exports.default = BillingCountryInput;
