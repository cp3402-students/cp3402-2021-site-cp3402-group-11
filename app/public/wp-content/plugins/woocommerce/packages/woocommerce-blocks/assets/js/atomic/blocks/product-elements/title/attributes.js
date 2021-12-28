"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
var blockAttributes = {
    headingLevel: {
        type: 'number',
        default: 2,
    },
    showProductLink: {
        type: 'boolean',
        default: true,
    },
    productId: {
        type: 'number',
        default: 0,
    },
};
if ((0, block_settings_1.isFeaturePluginBuild)()) {
    blockAttributes = __assign(__assign({}, blockAttributes), { align: {
            type: 'string',
        }, color: {
            type: 'string',
        }, customColor: {
            type: 'string',
        }, fontSize: {
            type: 'string',
        }, customFontSize: {
            type: 'number',
        } });
}
exports.default = blockAttributes;
