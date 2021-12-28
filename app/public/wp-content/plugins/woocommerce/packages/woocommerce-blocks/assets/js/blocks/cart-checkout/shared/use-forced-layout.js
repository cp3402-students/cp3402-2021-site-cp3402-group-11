"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForcedLayout = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var data_1 = require("@wordpress/data");
var blocks_1 = require("@wordpress/blocks");
var lodash_1 = require("lodash");
var isBlockLocked = function (_a) {
    var _b, _c, _d;
    var attributes = _a.attributes;
    return Boolean(((_b = attributes.lock) === null || _b === void 0 ? void 0 : _b.remove) || ((_d = (_c = attributes.lock) === null || _c === void 0 ? void 0 : _c.default) === null || _d === void 0 ? void 0 : _d.remove));
};
/**
 * useForcedLayout hook
 *
 * Responsible for ensuring FORCED blocks exist in the inner block layout. Forced blocks cannot be removed.
 */
var useForcedLayout = function (_a) {
    var clientId = _a.clientId, registeredBlocks = _a.registeredBlocks, _b = _a.defaultTemplate, defaultTemplate = _b === void 0 ? [] : _b;
    var currentRegisteredBlocks = (0, element_1.useRef)(registeredBlocks);
    var currentDefaultTemplate = (0, element_1.useRef)(defaultTemplate);
    var _c = (0, data_1.useDispatch)('core/block-editor'), insertBlock = _c.insertBlock, replaceInnerBlocks = _c.replaceInnerBlocks;
    var _d = (0, data_1.useSelect)(function (select) {
        return {
            innerBlocks: select('core/block-editor').getBlocks(clientId),
            registeredBlockTypes: currentRegisteredBlocks.current.map(function (blockName) { return (0, blocks_1.getBlockType)(blockName); }),
        };
    }, [clientId, currentRegisteredBlocks.current]), innerBlocks = _d.innerBlocks, registeredBlockTypes = _d.registeredBlockTypes;
    var appendBlock = (0, element_1.useCallback)(function (block, position) {
        var newBlock = (0, blocks_1.createBlock)(block.name);
        insertBlock(newBlock, position, clientId, false);
    }, [clientId, insertBlock]);
    var lockedBlockTypes = (0, element_1.useMemo)(function () {
        return registeredBlockTypes.filter(function (block) { return block && isBlockLocked(block); });
    }, [registeredBlockTypes]);
    /**
     * If the current inner blocks differ from the registered blocks, push the differences.
     */
    (0, element_1.useLayoutEffect)(function () {
        if (!clientId) {
            return;
        }
        // If there are NO inner blocks, sync with the given template.
        if (innerBlocks.length === 0 &&
            currentDefaultTemplate.current.length > 0) {
            var nextBlocks = (0, blocks_1.synchronizeBlocksWithTemplate)(innerBlocks, currentDefaultTemplate.current);
            if (!(0, lodash_1.isEqual)(nextBlocks, innerBlocks)) {
                replaceInnerBlocks(clientId, nextBlocks);
                return;
            }
        }
        // Find registered locked blocks missing from Inner Blocks and append them.
        lockedBlockTypes.forEach(function (block) {
            // If the locked block type is already in the layout, we can skip this one.
            if (innerBlocks.find(function (_a) {
                var name = _a.name;
                return name === block.name;
            })) {
                return;
            }
            // Is the forced block part of the default template, find it's original position.
            var defaultTemplatePosition = currentDefaultTemplate.current.findIndex(function (_a) {
                var blockName = _a[0];
                return blockName === block.name;
            });
            switch (defaultTemplatePosition) {
                case -1:
                    // The block is not part of the default template so we append it to the current layout.
                    appendBlock(block, innerBlocks.length);
                    break;
                case 0:
                    // The block was the first block in the default layout, so prepend it to the current layout.
                    appendBlock(block, 0);
                    break;
                default:
                    // The new layout may have extra blocks compared to the default template, so rather than insert
                    // at the default position, we should append it after another default block.
                    var adjacentBlock_1 = currentDefaultTemplate.current[defaultTemplatePosition - 1];
                    var position = innerBlocks.findIndex(function (_a) {
                        var blockName = _a.name;
                        return blockName === adjacentBlock_1[0];
                    });
                    appendBlock(block, position === -1 ? defaultTemplatePosition : position + 1);
                    break;
            }
        });
    }, [
        clientId,
        innerBlocks,
        lockedBlockTypes,
        replaceInnerBlocks,
        appendBlock,
    ]);
};
exports.useForcedLayout = useForcedLayout;
