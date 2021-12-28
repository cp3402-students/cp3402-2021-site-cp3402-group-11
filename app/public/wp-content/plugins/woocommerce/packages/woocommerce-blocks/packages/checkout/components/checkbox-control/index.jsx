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
var compose_1 = require("@wordpress/compose");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Component used to show a checkbox control with styles.
 */
var CheckboxControl = function (_a) {
    var className = _a.className, label = _a.label, id = _a.id, instanceId = _a.instanceId, onChange = _a.onChange, children = _a.children, _b = _a.hasError, hasError = _b === void 0 ? false : _b, rest = __rest(_a, ["className", "label", "id", "instanceId", "onChange", "children", "hasError"]);
    var checkboxId = id || "checkbox-control-" + instanceId;
    return (<label className={(0, classnames_1.default)('wc-block-components-checkbox', {
            'has-error': hasError,
        }, className)} htmlFor={checkboxId}>
			<input id={checkboxId} className="wc-block-components-checkbox__input" type="checkbox" onChange={function (event) { return onChange(event.target.checked); }} aria-invalid={hasError === true} {...rest}/>
			<svg className="wc-block-components-checkbox__mark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 20">
				<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
			</svg>
			{label && (<span className="wc-block-components-checkbox__label">
					{label}
				</span>)}
			{children}
		</label>);
};
exports.default = (0, compose_1.withInstanceId)(CheckboxControl);
