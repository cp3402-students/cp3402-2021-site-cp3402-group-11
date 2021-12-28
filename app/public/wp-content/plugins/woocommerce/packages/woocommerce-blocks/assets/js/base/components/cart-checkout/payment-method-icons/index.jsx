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
exports.PaymentMethodIcons = void 0;
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
var payment_method_icon_1 = require("./payment-method-icon");
var common_icons_1 = require("./common-icons");
var utils_1 = require("./utils");
require("./style.scss");
/**
 * For a given list of icons, render each as a list item, using common icons
 * where available.
 */
var PaymentMethodIcons = function (_a) {
    var _b = _a.icons, icons = _b === void 0 ? [] : _b, _c = _a.align, align = _c === void 0 ? 'center' : _c, className = _a.className;
    var iconConfigs = (0, utils_1.normalizeIconConfig)(icons);
    if (iconConfigs.length === 0) {
        return null;
    }
    var containerClass = (0, classnames_1.default)('wc-block-components-payment-method-icons', {
        'wc-block-components-payment-method-icons--align-left': align === 'left',
        'wc-block-components-payment-method-icons--align-right': align === 'right',
    }, className);
    return (<div className={containerClass}>
			{iconConfigs.map(function (icon) {
            var iconProps = __assign(__assign({}, icon), (0, common_icons_1.getCommonIconProps)(icon.id));
            return (<payment_method_icon_1.default key={'payment-method-icon-' + icon.id} {...iconProps}/>);
        })}
		</div>);
};
exports.PaymentMethodIcons = PaymentMethodIcons;
exports.default = exports.PaymentMethodIcons;
