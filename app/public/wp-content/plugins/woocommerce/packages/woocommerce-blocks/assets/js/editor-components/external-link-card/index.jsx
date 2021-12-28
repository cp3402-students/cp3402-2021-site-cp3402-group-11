"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var icons_1 = require("@wordpress/icons");
var components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
require("./editor.scss");
/**
 * Show a link that displays a title, description, and optional icon. Links are opened in a new tab.
 */
var ExternalLinkCard = function (_a) {
    var href = _a.href, title = _a.title, description = _a.description;
    return (<a href={href} className="wc-block-editor-components-external-link-card" target="_blank" rel="noreferrer">
			<span className="wc-block-editor-components-external-link-card__content">
				<strong className="wc-block-editor-components-external-link-card__title">
					{title}
				</strong>
				{description && (<span className="wc-block-editor-components-external-link-card__description">
						{description}
					</span>)}
			</span>
			<components_1.VisuallyHidden as="span">
				{
        /* translators: accessibility text */
        (0, i18n_1.__)('(opens in a new tab)', 'woo-gutenberg-products-block')}
			</components_1.VisuallyHidden>
			<icons_1.Icon icon={icons_1.external} className="wc-block-editor-components-external-link-card__icon"/>
		</a>);
};
exports.default = ExternalLinkCard;
