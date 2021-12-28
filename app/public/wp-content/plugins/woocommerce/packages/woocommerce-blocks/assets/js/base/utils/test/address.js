"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var base_utils_1 = require("@woocommerce/base-utils");
describe('emptyHiddenAddressFields', function () {
    it("Removes state from an address where the country doesn't use states", function () {
        var address = {
            first_name: 'Jonny',
            last_name: 'Awesome',
            company: 'WordPress',
            address_1: '123 Address Street',
            address_2: 'Address 2',
            city: 'Vienna',
            postcode: '1120',
            country: 'AT',
            state: 'CA',
            email: 'jonny.awesome@email.com',
            phone: '',
        };
        var filteredAddress = (0, base_utils_1.emptyHiddenAddressFields)(address);
        expect(filteredAddress).toHaveProperty('state', '');
    });
});
