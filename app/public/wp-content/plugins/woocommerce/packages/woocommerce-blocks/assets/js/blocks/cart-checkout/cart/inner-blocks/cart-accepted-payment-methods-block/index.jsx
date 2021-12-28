"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
var icons_1 = require("@woocommerce/icons");
/**
 * Internal dependencies
 */
var edit_1 = require("./edit");
var block_json_1 = require("./block.json");
(0, block_settings_1.registerFeaturePluginBlockType)(block_json_1.default, {
    icon: {
        src: <icons_1.Icon srcElement={icons_1.card}/>,
        foreground: '#874FB9',
    },
    edit: edit_1.Edit,
    save: edit_1.Save,
});
