"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedBlocks = void 0;
/**
 * External dependencies
 */
var blocks_1 = require("@wordpress/blocks");
// List of core block types to allow in inner block areas.
var coreBlockTypes = ['core/paragraph', 'core/image', 'core/separator'];
/**
 * Gets a list of allowed blocks types under a specific parent block type.
 */
var getAllowedBlocks = function (block) { return __spreadArray(__spreadArray([], (0, blocks_1.getBlockTypes)()
    .filter(function (blockType) {
    return ((blockType === null || blockType === void 0 ? void 0 : blockType.parent) || []).includes(block);
})
    .map(function (_a) {
    var name = _a.name;
    return name;
}), true), coreBlockTypes, true); };
exports.getAllowedBlocks = getAllowedBlocks;
