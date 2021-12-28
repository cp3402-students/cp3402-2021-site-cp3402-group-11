"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var classnames_1 = require("classnames");
var icons_1 = require("@woocommerce/icons");
/**
 * Internal dependencies
 */
require("./style.scss");
var Panel = function (_a) {
    var children = _a.children, className = _a.className, _b = _a.initialOpen, initialOpen = _b === void 0 ? false : _b, _c = _a.hasBorder, hasBorder = _c === void 0 ? false : _c, title = _a.title, _d = _a.titleTag, TitleTag = _d === void 0 ? 'div' : _d;
    var _e = (0, element_1.useState)(initialOpen), isOpen = _e[0], setIsOpen = _e[1];
    return (<div className={(0, classnames_1.default)(className, 'wc-block-components-panel', {
            'has-border': hasBorder,
        })}>
			<TitleTag>
				<button aria-expanded={isOpen} className="wc-block-components-panel__button" onClick={function () { return setIsOpen(!isOpen); }}>
					<icons_1.Icon aria-hidden="true" className="wc-block-components-panel__button-icon" srcElement={isOpen ? icons_1.chevronUp : icons_1.chevronDown}/>
					{title}
				</button>
			</TitleTag>
			{isOpen && (<div className="wc-block-components-panel__content">
					{children}
				</div>)}
		</div>);
};
exports.default = Panel;
