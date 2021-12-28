"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var html_entities_1 = require("@wordpress/html-entities");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Formats and returns an image element.
 *
 * @param {Object} props       Incoming props for the component.
 * @param {Object} props.image Image properties.
 */
var ProductImage = function (_a) {
    var _b = _a.image, image = _b === void 0 ? {} : _b, _c = _a.fallbackAlt, fallbackAlt = _c === void 0 ? '' : _c;
    var imageProps = image.thumbnail
        ? {
            src: image.thumbnail,
            alt: (0, html_entities_1.decodeEntities)(image.alt) ||
                fallbackAlt ||
                'Product Image',
        }
        : {
            src: settings_1.PLACEHOLDER_IMG_SRC,
            alt: '',
        };
    return (<img className="wc-block-components-product-image" {...imageProps} alt={imageProps.alt}/>);
};
exports.default = ProductImage;
