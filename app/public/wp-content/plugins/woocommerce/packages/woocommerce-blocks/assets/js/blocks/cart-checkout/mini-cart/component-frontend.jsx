"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var base_utils_1 = require("@woocommerce/base-utils");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
require("./style.scss");
var renderMiniCartFrontend = function () {
    // Check if button is focused. In that case, we want to refocus it after we
    // replace it with the React equivalent.
    var focusedMiniCartBlock = null;
    /* eslint-disable @wordpress/no-global-active-element */
    if (document.activeElement &&
        document.activeElement.classList.contains('wc-block-mini-cart__button') &&
        document.activeElement.parentNode instanceof HTMLElement) {
        focusedMiniCartBlock = document.activeElement.parentNode;
    }
    /* eslint-enable @wordpress/no-global-active-element */
    (0, base_utils_1.renderFrontend)({
        selector: '.wc-block-mini-cart',
        Block: block_1.default,
        getProps: function (el) {
            var colorClassNames = '';
            var button = el.querySelector('.wc-block-mini-cart__button');
            if (button !== null) {
                colorClassNames = button.classList
                    .toString()
                    .replace('wc-block-mini-cart__button', '');
            }
            return {
                isDataOutdated: el.dataset.isDataOutdated,
                isInitiallyOpen: el.dataset.isInitiallyOpen === 'true',
                colorClassNames: colorClassNames,
                style: el.dataset.style ? JSON.parse(el.dataset.style) : {},
            };
        },
    });
    // Refocus previously focused button if drawer is not open.
    if (focusedMiniCartBlock instanceof HTMLElement &&
        !focusedMiniCartBlock.dataset.isInitiallyOpen) {
        var innerButton = focusedMiniCartBlock.querySelector('.wc-block-mini-cart__button');
        if (innerButton instanceof HTMLElement) {
            innerButton.focus();
        }
    }
};
renderMiniCartFrontend();
