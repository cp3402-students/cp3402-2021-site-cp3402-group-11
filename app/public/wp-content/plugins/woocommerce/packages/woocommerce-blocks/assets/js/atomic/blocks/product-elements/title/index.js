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
var blocks_1 = require("@wordpress/blocks");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var config_1 = require("../shared/config");
var attributes_1 = require("./attributes");
var edit_1 = require("./edit");
var constants_1 = require("./constants");
var blockConfig = __assign(__assign({}, config_1.default), { apiVersion: 2, title: constants_1.BLOCK_TITLE, description: constants_1.BLOCK_DESCRIPTION, icon: {
        src: constants_1.BLOCK_ICON,
        foreground: '#7f54b3',
    }, attributes: attributes_1.default, edit: edit_1.default, supports: (0, block_settings_1.isFeaturePluginBuild)()
        ? {
            html: false,
            color: {
                background: false,
            },
            typography: {
                fontSize: true,
            },
        }
        : config_1.default.supports });
(0, blocks_1.registerBlockType)('woocommerce/product-title', blockConfig);
