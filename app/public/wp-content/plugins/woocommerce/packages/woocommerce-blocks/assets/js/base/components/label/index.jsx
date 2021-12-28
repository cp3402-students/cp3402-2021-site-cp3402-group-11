"use strict";
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
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var classnames_1 = require("classnames");
/**
 * Component used to render an accessible text given a label and/or a
 * screenReaderLabel. The wrapper element and wrapper props can also be
 * specified via props.
 *
 */
var Label = function (_a) {
    var label = _a.label, screenReaderLabel = _a.screenReaderLabel, wrapperElement = _a.wrapperElement, _b = _a.wrapperProps, wrapperProps = _b === void 0 ? {} : _b;
    var Wrapper;
    var hasLabel = typeof label !== 'undefined' && label !== null;
    var hasScreenReaderLabel = typeof screenReaderLabel !== 'undefined' && screenReaderLabel !== null;
    if (!hasLabel && hasScreenReaderLabel) {
        Wrapper = wrapperElement || 'span';
        wrapperProps = __assign(__assign({}, wrapperProps), { className: (0, classnames_1.default)(wrapperProps.className, 'screen-reader-text') });
        return <Wrapper {...wrapperProps}>{screenReaderLabel}</Wrapper>;
    }
    Wrapper = wrapperElement || element_1.Fragment;
    if (hasLabel && hasScreenReaderLabel && label !== screenReaderLabel) {
        return (<Wrapper {...wrapperProps}>
				<span aria-hidden="true">{label}</span>
				<span className="screen-reader-text">
					{screenReaderLabel}
				</span>
			</Wrapper>);
    }
    return <Wrapper {...wrapperProps}>{label}</Wrapper>;
};
exports.default = Label;
