"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonIconProps = exports.commonIcons = void 0;
/**
 * External dependencies
 */
var block_settings_1 = require("@woocommerce/block-settings");
/**
 * Array of common assets.
 */
exports.commonIcons = [
    {
        id: 'alipay',
        alt: 'Alipay',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/alipay.svg',
    },
    {
        id: 'amex',
        alt: 'American Express',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/amex.svg',
    },
    {
        id: 'bancontact',
        alt: 'Bancontact',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/bancontact.svg',
    },
    {
        id: 'diners',
        alt: 'Diners Club',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/diners.svg',
    },
    {
        id: 'discover',
        alt: 'Discover',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/discover.svg',
    },
    {
        id: 'eps',
        alt: 'EPS',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/eps.svg',
    },
    {
        id: 'giropay',
        alt: 'Giropay',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/giropay.svg',
    },
    {
        id: 'ideal',
        alt: 'iDeal',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/ideal.svg',
    },
    {
        id: 'jcb',
        alt: 'JCB',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/jcb.svg',
    },
    {
        id: 'laser',
        alt: 'Laser',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/laser.svg',
    },
    {
        id: 'maestro',
        alt: 'Maestro',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/maestro.svg',
    },
    {
        id: 'mastercard',
        alt: 'Mastercard',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/mastercard.svg',
    },
    {
        id: 'multibanco',
        alt: 'Multibanco',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/multibanco.svg',
    },
    {
        id: 'p24',
        alt: 'Przelewy24',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/p24.svg',
    },
    {
        id: 'sepa',
        alt: 'Sepa',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/sepa.svg',
    },
    {
        id: 'sofort',
        alt: 'Sofort',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/sofort.svg',
    },
    {
        id: 'unionpay',
        alt: 'Union Pay',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/unionpay.svg',
    },
    {
        id: 'visa',
        alt: 'Visa',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/visa.svg',
    },
    {
        id: 'wechat',
        alt: 'WeChat',
        src: block_settings_1.WC_BLOCKS_IMAGE_URL + 'payment-methods/wechat.svg',
    },
];
/**
 * For a given ID, see if a common icon exists and return it's props.
 *
 * @param {string} id Icon ID.
 */
var getCommonIconProps = function (id) {
    return (exports.commonIcons.find(function (icon) {
        return icon.id === id;
    }) || {});
};
exports.getCommonIconProps = getCommonIconProps;
