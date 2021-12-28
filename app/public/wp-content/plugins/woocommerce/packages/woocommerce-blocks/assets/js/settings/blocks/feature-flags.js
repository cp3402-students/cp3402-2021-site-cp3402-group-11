"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFeaturePluginBuild = exports.isExperimentalBuild = exports.registerFeaturePluginBlockType = exports.registerExperimentalBlockType = void 0;
/**
 * External dependencies
 */
var blocks_1 = require("@wordpress/blocks");
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
/**
 * Registers a new experimental block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 */
var registerExperimentalBlockType = function (blockNameOrMetadata, settings) {
    if (constants_1.WC_BLOCKS_PHASE > 2) {
        return (0, blocks_1.registerBlockType)(blockNameOrMetadata, settings);
    }
};
exports.registerExperimentalBlockType = registerExperimentalBlockType;
/**
 * Registers a new feature plugin block provided a unique name and an object
 * defining its behavior. Once registered, the block is made available as an
 * option to any editor interface where blocks are implemented.
 */
var registerFeaturePluginBlockType = function (blockNameOrMetadata, settings) {
    if (constants_1.WC_BLOCKS_PHASE > 1) {
        return (0, blocks_1.registerBlockType)(blockNameOrMetadata, settings);
    }
};
exports.registerFeaturePluginBlockType = registerFeaturePluginBlockType;
/**
 * Checks if we're executing the code in an experimental build mode.
 *
 * @return {boolean} True if this is an experimental build, false otherwise.
 */
var isExperimentalBuild = function () { return constants_1.WC_BLOCKS_PHASE > 2; };
exports.isExperimentalBuild = isExperimentalBuild;
/**
 * Checks if we're executing the code in an feature plugin or experimental build mode.
 *
 * @return {boolean} True if this is an experimental or feature plugin build, false otherwise.
 */
var isFeaturePluginBuild = function () { return constants_1.WC_BLOCKS_PHASE > 1; };
exports.isFeaturePluginBuild = isFeaturePluginBuild;
