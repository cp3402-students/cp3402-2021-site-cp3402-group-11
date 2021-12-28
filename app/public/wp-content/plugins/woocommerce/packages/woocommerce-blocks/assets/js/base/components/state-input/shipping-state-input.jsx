"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var state_input_1 = require("./state-input");
var ShippingStateInput = function (props) {
    return <state_input_1.default states={block_settings_1.SHIPPING_STATES} {...props}/>;
};
exports.default = ShippingStateInput;
