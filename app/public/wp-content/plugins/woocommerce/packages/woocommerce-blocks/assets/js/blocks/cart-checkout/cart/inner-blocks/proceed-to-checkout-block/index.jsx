"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var icons_1 = require("@wordpress/icons");
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Internal dependencies
 */
var attributes_1 = require("./attributes");
var edit_1 = require("./edit");
var block_json_1 = require("./block.json");
(0, block_settings_1.registerFeaturePluginBlockType)(block_json_1.default, {
    icon: {
        src: <icons_1.Icon icon={icons_1.button}/>,
        foreground: '#7f54b3',
    },
    attributes: attributes_1.default,
    edit: edit_1.Edit,
    save: edit_1.Save,
});
