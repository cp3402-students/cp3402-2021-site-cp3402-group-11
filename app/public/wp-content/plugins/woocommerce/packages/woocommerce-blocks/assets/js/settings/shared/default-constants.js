"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WP_VERSION = exports.WP_LOGIN_URL = exports.WC_VERSION = exports.WC_ASSET_URL = exports.STORE_PAGES = exports.SITE_TITLE = exports.PLACEHOLDER_IMG_SRC = exports.ORDER_STATUSES = exports.LOCALE = exports.HOME_URL = exports.CURRENT_USER_IS_ADMIN = exports.CURRENCY = exports.COUNTRIES = exports.ADMIN_URL = void 0;
/**
 * Internal dependencies
 */
var settings_init_1 = require("./settings-init");
/**
 * This exports all default core settings as constants.
 */
exports.ADMIN_URL = settings_init_1.allSettings.adminUrl;
exports.COUNTRIES = settings_init_1.allSettings.countries;
exports.CURRENCY = settings_init_1.allSettings.currency;
exports.CURRENT_USER_IS_ADMIN = settings_init_1.allSettings.currentUserIsAdmin;
exports.HOME_URL = settings_init_1.allSettings.homeUrl;
exports.LOCALE = settings_init_1.allSettings.locale;
exports.ORDER_STATUSES = settings_init_1.allSettings.orderStatuses;
exports.PLACEHOLDER_IMG_SRC = settings_init_1.allSettings.placeholderImgSrc;
exports.SITE_TITLE = settings_init_1.allSettings.siteTitle;
exports.STORE_PAGES = settings_init_1.allSettings.storePages;
exports.WC_ASSET_URL = settings_init_1.allSettings.wcAssetUrl;
exports.WC_VERSION = settings_init_1.allSettings.wcVersion;
exports.WP_LOGIN_URL = settings_init_1.allSettings.wpLoginUrl;
exports.WP_VERSION = settings_init_1.allSettings.wpVersion;
