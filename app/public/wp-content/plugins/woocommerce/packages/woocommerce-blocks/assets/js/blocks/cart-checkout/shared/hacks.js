"use strict";
/**
 * HACKS
 *
 * This file contains functionality to "lock" blocks i.e. to prevent blocks being moved or deleted. This needs to be
 * kept in place until native support for locking is available in WordPress (estimated WordPress 5.9).
 */
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
exports.useBlockPropsWithLocking = exports.addClassToBody = void 0;
/**
 * @todo Remove custom block locking (requires native WordPress support)
 */
/**
 * External dependencies
 */
var block_editor_1 = require("@wordpress/block-editor");
var dom_1 = require("@wordpress/dom");
var data_1 = require("@wordpress/data");
var element_1 = require("@wordpress/element");
var keycodes_1 = require("@wordpress/keycodes");
var hooks_1 = require("@wordpress/hooks");
var blocks_1 = require("@wordpress/blocks");
/**
 * Toggle class on body.
 *
 * @param {string} className CSS Class name.
 * @param {boolean} add True to add, false to remove.
 */
var toggleBodyClass = function (className, add) {
    if (add === void 0) { add = true; }
    if (add) {
        window.document.body.classList.add(className);
    }
    else {
        window.document.body.classList.remove(className);
    }
};
/**
 * addClassToBody
 *
 * This components watches the current selected block and adds a class name to the body if that block is locked. If the
 * current block is not locked, it removes the class name. The appended body class is used to hide UI elements to prevent
 * the block from being deleted.
 *
 * We use a component so we can react to changes in the store.
 */
var addClassToBody = function () {
    if (!(0, hooks_1.hasFilter)('blocks.registerBlockType', 'core/lock/addAttribute')) {
        (0, data_1.subscribe)(function () {
            var _a, _b, _c, _d;
            var blockEditorSelect = (0, data_1.select)(block_editor_1.store);
            if (!blockEditorSelect) {
                return;
            }
            var selectedBlock = blockEditorSelect.getSelectedBlock();
            if (!selectedBlock) {
                return;
            }
            toggleBodyClass('wc-lock-selected-block--remove', !!((_b = (_a = selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.attributes) === null || _a === void 0 ? void 0 : _a.lock) === null || _b === void 0 ? void 0 : _b.remove));
            toggleBodyClass('wc-lock-selected-block--move', !!((_d = (_c = selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.attributes) === null || _c === void 0 ? void 0 : _c.lock) === null || _d === void 0 ? void 0 : _d.move));
        });
    }
};
exports.addClassToBody = addClassToBody;
var isBlockLocked = function (clientId) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (!clientId) {
        return false;
    }
    var getBlock = (0, data_1.select)(block_editor_1.store).getBlock;
    var block = getBlock(clientId);
    // If lock.remove is defined at the block instance (not using the default value)
    // Then we use it.
    if (typeof ((_b = (_a = block === null || block === void 0 ? void 0 : block.attributes) === null || _a === void 0 ? void 0 : _a.lock) === null || _b === void 0 ? void 0 : _b.remove) === 'boolean') {
        return block.attributes.lock.remove;
    }
    // If we don't have lock on the block instance, we check the type
    var blockType = (0, blocks_1.getBlockType)(block.name);
    if (typeof ((_e = (_d = (_c = blockType === null || blockType === void 0 ? void 0 : blockType.attributes) === null || _c === void 0 ? void 0 : _c.lock) === null || _d === void 0 ? void 0 : _d.default) === null || _e === void 0 ? void 0 : _e.remove) === 'boolean') {
        return (_h = (_g = (_f = blockType === null || blockType === void 0 ? void 0 : blockType.attributes) === null || _f === void 0 ? void 0 : _f.lock) === null || _g === void 0 ? void 0 : _g.default) === null || _h === void 0 ? void 0 : _h.remove;
    }
    // If nothing is defined, return false
    return false;
};
/**
 * This is a hook we use in conjunction with useBlockProps. Its goal is to check if of the block's children is locked and being deleted.
 * It will stop the keydown event from propagating to stop it from being deleted via the keyboard.
 *
 */
var useLockedChildren = function (_a) {
    var ref = _a.ref;
    var lockInCore = (0, hooks_1.hasFilter)('blocks.registerBlockType', 'core/lock/addAttribute');
    var node = ref.current;
    return (0, element_1.useEffect)(function () {
        if (!node || lockInCore) {
            return;
        }
        function onKeyDown(event) {
            var keyCode = event.keyCode, target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            // We're not trying to delete something here.
            if (keyCode !== keycodes_1.BACKSPACE && keyCode !== keycodes_1.DELETE) {
                return;
            }
            // We're in a field, so we should let text be deleted.
            if ((0, dom_1.isTextField)(target)) {
                return;
            }
            // Typecast to fix issue with isTextField.
            var targetNode = target;
            // Our target isn't a block.
            if (targetNode.dataset.block === undefined) {
                return;
            }
            var clientId = targetNode.dataset.block;
            var isLocked = isBlockLocked(clientId);
            // Prevent the keyboard event from propogating if it supports locking.
            if (isLocked) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();
            }
        }
        node.addEventListener('keydown', onKeyDown, {
            capture: true,
            passive: false,
        });
        return function () {
            node.removeEventListener('keydown', onKeyDown, {
                capture: true,
            });
        };
    }, [node, lockInCore]);
};
/**
 * This hook is a light wrapper to useBlockProps, it wraps that hook plus useLockBlock to pass data between them.
 */
var useBlockPropsWithLocking = function (props) {
    if (props === void 0) { props = {}; }
    var ref = (0, element_1.useRef)();
    var blockProps = (0, block_editor_1.useBlockProps)(__assign({ ref: ref }, props));
    useLockedChildren({
        ref: ref,
    });
    return blockProps;
};
exports.useBlockPropsWithLocking = useBlockPropsWithLocking;
