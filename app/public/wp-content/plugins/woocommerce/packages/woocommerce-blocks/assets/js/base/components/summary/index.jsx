"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var utils_1 = require("./utils");
/**
 * Summary component.
 *
 * @param {Object} props Component props.
 * @param {string} props.source Source text.
 * @param {number} props.maxLength Max length of the summary, using countType.
 * @param {string} props.countType One of words, characters_excluding_spaces, or characters_including_spaces.
 * @param {string} props.className Class name for rendered component.
 */
var Summary = function (_a) {
    var source = _a.source, _b = _a.maxLength, maxLength = _b === void 0 ? 15 : _b, _c = _a.countType, countType = _c === void 0 ? 'words' : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var summaryText = (0, element_1.useMemo)(function () {
        return (0, utils_1.generateSummary)(source, maxLength, countType);
    }, [source, maxLength, countType]);
    return <element_1.RawHTML className={className}>{summaryText}</element_1.RawHTML>;
};
exports.Summary = Summary;
exports.default = exports.Summary;
