"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var address_1 = require("./address");
require("./style.scss");
var ShippingCalculator = function (_a) {
    var _b = _a.onUpdate, onUpdate = _b === void 0 ? function () {
        /* Do nothing */
    } : _b, _c = _a.addressFields, addressFields = _c === void 0 ? ['country', 'state', 'city', 'postcode'] : _c;
    var _d = (0, base_context_1.useShippingDataContext)(), shippingAddress = _d.shippingAddress, setShippingAddress = _d.setShippingAddress;
    return (<div className="wc-block-components-shipping-calculator">
			<address_1.default address={shippingAddress} addressFields={addressFields} onUpdate={function (newAddress) {
            setShippingAddress(newAddress);
            onUpdate(newAddress);
        }}/>
		</div>);
};
exports.default = ShippingCalculator;
