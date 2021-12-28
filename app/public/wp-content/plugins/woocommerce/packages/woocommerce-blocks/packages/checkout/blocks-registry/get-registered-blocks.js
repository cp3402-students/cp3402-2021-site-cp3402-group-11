"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegisteredBlocks = exports.hasInnerBlocks = void 0;
/**
 * Internal dependencies
 */
var types_1 = require("./types");
var registered_blocks_1 = require("./registered-blocks");
/**
 * Check if a block/area supports inner block registration.
 */
var hasInnerBlocks = function (block) {
    return Object.values(types_1.innerBlockAreas).includes(block);
};
exports.hasInnerBlocks = hasInnerBlocks;
/**
 * Returns an array of registered block objects available within a specific parent block/area.
 */
var getRegisteredBlocks = function (block) {
    return (0, exports.hasInnerBlocks)(block)
        ? Object.values(registered_blocks_1.registeredBlocks).filter(function (_a) {
            var metadata = _a.metadata;
            return ((metadata === null || metadata === void 0 ? void 0 : metadata.parent) || []).includes(block);
        })
        : [];
};
exports.getRegisteredBlocks = getRegisteredBlocks;
