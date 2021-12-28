"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
require("./style.scss");
var maybeScrollToTop = function (scrollPoint) {
    if (!scrollPoint) {
        return;
    }
    var yPos = scrollPoint.getBoundingClientRect().bottom;
    var isScrollPointVisible = yPos >= 0 && yPos <= window.innerHeight;
    if (!isScrollPointVisible) {
        scrollPoint.scrollIntoView();
    }
};
var moveFocusToElement = function (scrollPoint, focusableSelector) {
    var _a;
    var focusableElements = ((_a = scrollPoint.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll(focusableSelector)) || [];
    if (focusableElements.length) {
        var targetElement = focusableElements[0];
        maybeScrollToTop(targetElement);
        targetElement === null || targetElement === void 0 ? void 0 : targetElement.focus();
    }
    else {
        maybeScrollToTop(scrollPoint);
    }
};
var scrollToHTMLElement = function (scrollPoint, options) {
    var focusableSelector = (options || {}).focusableSelector;
    if (!window || !Number.isFinite(window.innerHeight)) {
        return;
    }
    if (focusableSelector) {
        moveFocusToElement(scrollPoint, focusableSelector);
    }
    else {
        maybeScrollToTop(scrollPoint);
    }
};
/**
 * HOC that provides a function to scroll to the top of the component.
 */
var withScrollToTop = function (OriginalComponent) {
    return function (props) {
        var scrollPointRef = (0, element_1.useRef)(null);
        var scrollToTop = function (args) {
            if (scrollPointRef.current !== null) {
                scrollToHTMLElement(scrollPointRef.current, args);
            }
        };
        return (<>
				<div className="with-scroll-to-top__scroll-point" ref={scrollPointRef} aria-hidden/>
				<OriginalComponent {...props} scrollToTop={scrollToTop}/>
			</>);
    };
};
exports.default = withScrollToTop;
