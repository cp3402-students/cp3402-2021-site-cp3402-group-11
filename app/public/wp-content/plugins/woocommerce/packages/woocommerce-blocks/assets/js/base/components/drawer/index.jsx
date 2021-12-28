"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var components_1 = require("@wordpress/components");
var use_debounce_1 = require("use-debounce");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
require("./style.scss");
var Drawer = function (_a) {
    var children = _a.children, className = _a.className, isOpen = _a.isOpen, onClose = _a.onClose, _b = _a.slideIn, slideIn = _b === void 0 ? true : _b, _c = _a.slideOut, slideOut = _c === void 0 ? true : _c, title = _a.title;
    var debouncedIsOpen = (0, use_debounce_1.useDebounce)(isOpen, 300)[0];
    var isClosing = !isOpen && debouncedIsOpen;
    if (!isOpen && !isClosing) {
        return null;
    }
    return (<components_1.Modal title={title} focusOnMount={true} onRequestClose={onClose} className={(0, classnames_1.default)(className, 'wc-block-components-drawer')} overlayClassName={(0, classnames_1.default)('wc-block-components-drawer__screen-overlay', {
            'wc-block-components-drawer__screen-overlay--is-hidden': !isOpen,
            'wc-block-components-drawer__screen-overlay--with-slide-in': slideIn,
            'wc-block-components-drawer__screen-overlay--with-slide-out': slideOut,
        })} closeButtonLabel={(0, i18n_1.__)('Close mini cart', 'woo-gutenberg-products-block')}>
			{children}
		</components_1.Modal>);
};
exports.default = Drawer;
