"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeIconConfig = void 0;
var types_1 = require("@woocommerce/types");
/**
 * For an array of icons, normalize into objects and remove duplicates.
 */
var normalizeIconConfig = function (icons) {
    var normalizedIcons = {};
    icons.forEach(function (raw) {
        var icon = {};
        if (typeof raw === 'string') {
            icon = {
                id: raw,
                alt: raw,
                src: null,
            };
        }
        if (typeof raw === 'object') {
            icon = {
                id: raw.id || '',
                alt: raw.alt || '',
                src: raw.src || null,
            };
        }
        if (icon.id && (0, types_1.isString)(icon.id) && !normalizedIcons[icon.id]) {
            normalizedIcons[icon.id] = icon;
        }
    });
    return Object.values(normalizedIcons);
};
exports.normalizeIconConfig = normalizeIconConfig;
