"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTotalItems = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var types_1 = require("@woocommerce/types");
/**
 * Prepares the total items into a shape usable for display as passed on to
 * registered payment methods.
 *
 * @param {Object} totals Current cart total items
 * @param {boolean} needsShipping Whether or not shipping is needed.
 */
var prepareTotalItems = function (totals, needsShipping) {
    var newTotals = [];
    var factory = function (label, property) {
        var taxProperty = property + '_tax';
        var value = (0, types_1.objectHasProp)(totals, property) && (0, types_1.isString)(totals[property])
            ? parseInt(totals[property], 10)
            : 0;
        var tax = (0, types_1.objectHasProp)(totals, taxProperty) &&
            (0, types_1.isString)(totals[taxProperty])
            ? parseInt(totals[taxProperty], 10)
            : 0;
        return {
            key: property,
            label: label,
            value: value,
            valueWithTax: value + tax,
        };
    };
    newTotals.push(factory((0, i18n_1.__)('Subtotal:', 'woo-gutenberg-products-block'), 'total_items'));
    newTotals.push(factory((0, i18n_1.__)('Fees:', 'woo-gutenberg-products-block'), 'total_fees'));
    newTotals.push(factory((0, i18n_1.__)('Discount:', 'woo-gutenberg-products-block'), 'total_discount'));
    newTotals.push({
        key: 'total_tax',
        label: (0, i18n_1.__)('Taxes:', 'woo-gutenberg-products-block'),
        value: parseInt(totals.total_tax, 10),
        valueWithTax: parseInt(totals.total_tax, 10),
    });
    if (needsShipping) {
        newTotals.push(factory((0, i18n_1.__)('Shipping:', 'woo-gutenberg-products-block'), 'total_shipping'));
    }
    return newTotals;
};
exports.prepareTotalItems = prepareTotalItems;
