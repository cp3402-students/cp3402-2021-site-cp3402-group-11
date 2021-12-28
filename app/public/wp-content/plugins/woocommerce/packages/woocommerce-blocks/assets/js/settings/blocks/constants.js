"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_STATES = exports.SHIPPING_STATES = exports.ALLOWED_COUNTRIES = exports.SHIPPING_COUNTRIES = exports.LOGIN_URL = exports.CART_URL = exports.CART_PAGE_ID = exports.TERMS_PAGE_NAME = exports.TERMS_URL = exports.PRIVACY_PAGE_NAME = exports.PRIVACY_URL = exports.CHECKOUT_URL = exports.CHECKOUT_PAGE_ID = exports.SHOP_URL = exports.WC_BLOCKS_PHASE = exports.WC_BLOCKS_BUILD_URL = exports.WC_BLOCKS_IMAGE_URL = exports.blocksConfig = void 0;
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
exports.blocksConfig = (0, settings_1.getSetting)('wcBlocksConfig', {
    buildPhase: 1,
    pluginUrl: '',
    productCount: 0,
    defaultAvatar: '',
    restApiRoutes: {},
    wordCountType: 'words',
});
exports.WC_BLOCKS_IMAGE_URL = exports.blocksConfig.pluginUrl + 'images/';
exports.WC_BLOCKS_BUILD_URL = exports.blocksConfig.pluginUrl + 'build/';
exports.WC_BLOCKS_PHASE = exports.blocksConfig.buildPhase;
exports.SHOP_URL = (_a = settings_1.STORE_PAGES.shop) === null || _a === void 0 ? void 0 : _a.permalink;
exports.CHECKOUT_PAGE_ID = settings_1.STORE_PAGES.checkout.id;
exports.CHECKOUT_URL = settings_1.STORE_PAGES.checkout.permalink;
exports.PRIVACY_URL = settings_1.STORE_PAGES.privacy.permalink;
exports.PRIVACY_PAGE_NAME = settings_1.STORE_PAGES.privacy.title;
exports.TERMS_URL = settings_1.STORE_PAGES.terms.permalink;
exports.TERMS_PAGE_NAME = settings_1.STORE_PAGES.terms.title;
exports.CART_PAGE_ID = settings_1.STORE_PAGES.cart.id;
exports.CART_URL = settings_1.STORE_PAGES.cart.permalink;
exports.LOGIN_URL = settings_1.STORE_PAGES.myaccount.permalink
    ? settings_1.STORE_PAGES.myaccount.permalink
    : (0, settings_1.getSetting)('wpLoginUrl', '/wp-login.php');
exports.SHIPPING_COUNTRIES = (0, settings_1.getSetting)('shippingCountries', {});
exports.ALLOWED_COUNTRIES = (0, settings_1.getSetting)('allowedCountries', {});
exports.SHIPPING_STATES = (0, settings_1.getSetting)('shippingStates', {});
exports.ALLOWED_STATES = (0, settings_1.getSetting)('allowedStates', {});
