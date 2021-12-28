"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var react_1 = require("react");
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var label_1 = require("../label");
require("./style.scss");
var TextInput = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, id = _a.id, _b = _a.type, type = _b === void 0 ? 'text' : _b, ariaLabel = _a.ariaLabel, ariaDescribedBy = _a.ariaDescribedBy, label = _a.label, screenReaderLabel = _a.screenReaderLabel, disabled = _a.disabled, help = _a.help, _c = _a.autoCapitalize, autoCapitalize = _c === void 0 ? 'off' : _c, _d = _a.autoComplete, autoComplete = _d === void 0 ? 'off' : _d, _e = _a.value, value = _e === void 0 ? '' : _e, onChange = _a.onChange, _f = _a.required, required = _f === void 0 ? false : _f, _g = _a.onBlur, onBlur = _g === void 0 ? function () {
        /* Do nothing */
    } : _g, feedback = _a.feedback, rest = __rest(_a, ["className", "id", "type", "ariaLabel", "ariaDescribedBy", "label", "screenReaderLabel", "disabled", "help", "autoCapitalize", "autoComplete", "value", "onChange", "required", "onBlur", "feedback"]);
    var _h = (0, element_1.useState)(false), isActive = _h[0], setIsActive = _h[1];
    return (<div className={(0, classnames_1.default)('wc-block-components-text-input', className, {
            'is-active': isActive || value,
        })}>
				<input type={type} id={id} value={value} ref={ref} autoCapitalize={autoCapitalize} autoComplete={autoComplete} onChange={function (event) {
            onChange(event.target.value);
        }} onFocus={function () { return setIsActive(true); }} onBlur={function (event) {
            onBlur(event.target.value);
            setIsActive(false);
        }} aria-label={ariaLabel || label} disabled={disabled} aria-describedby={!!help && !ariaDescribedBy
            ? id + '__help'
            : ariaDescribedBy} required={required} {...rest}/>
				<label_1.default label={label} screenReaderLabel={screenReaderLabel || label} wrapperElement="label" wrapperProps={{
            htmlFor: id,
        }} htmlFor={id}/>
				{!!help && (<p id={id + '__help'} className="wc-block-components-text-input__help">
						{help}
					</p>)}
				{feedback}
			</div>);
});
exports.default = TextInput;
