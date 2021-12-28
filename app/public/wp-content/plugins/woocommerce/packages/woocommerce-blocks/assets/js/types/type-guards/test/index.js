"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var types_1 = require("@woocommerce/types");
describe('type-guards', function () {
    describe('Testing isObject()', function () {
        it('Correctly identifies an object', function () {
            expect((0, types_1.isObject)({})).toBe(true);
            expect((0, types_1.isObject)({ test: 'object' })).toBe(true);
        });
        it('Correctly rejects object-like things', function () {
            expect((0, types_1.isObject)([])).toBe(false);
            expect((0, types_1.isObject)(null)).toBe(false);
        });
    });
});
