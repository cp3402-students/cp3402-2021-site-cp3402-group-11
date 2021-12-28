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
exports.useCompatibilityNotice = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var base_hooks_1 = require("@woocommerce/base-hooks");
var initialDismissedNotices = [];
var useCompatibilityNotice = function (blockName) {
    var _a = (0, base_hooks_1.useLocalStorageState)("wc-blocks_dismissed_compatibility_notices", initialDismissedNotices), dismissedNotices = _a[0], setDismissedNotices = _a[1];
    var _b = (0, element_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    var isDismissed = dismissedNotices.includes(blockName);
    var dismissNotice = function () {
        var dismissedNoticesSet = new Set(dismissedNotices);
        dismissedNoticesSet.add(blockName);
        setDismissedNotices(__spreadArray([], dismissedNoticesSet, true));
    };
    // This ensures the modal is not loaded on first render. This is required so
    // Gutenberg doesn't steal the focus from the Guide and focuses the block.
    (0, element_1.useEffect)(function () {
        setIsVisible(!isDismissed);
    }, [isDismissed]);
    return [isVisible, dismissNotice];
};
exports.useCompatibilityNotice = useCompatibilityNotice;
