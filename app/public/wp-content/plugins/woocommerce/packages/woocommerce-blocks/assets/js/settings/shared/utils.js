"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminLink = exports.isWcVersion = exports.isWpVersion = exports.getSetting = void 0;
/**
 * External dependencies
 */
var compare_versions_1 = require("compare-versions");
/**
 * Internal dependencies
 */
var settings_init_1 = require("./settings-init");
/**
 * Retrieves a setting value from the setting state.
 *
 * If a setting with key `name` does not exist or is undefined,
 * the `fallback` will be returned instead. An optional `filter`
 * callback can be passed to format the returned value.
 */
var getSetting = function (name, fallback, filter) {
    if (fallback === void 0) { fallback = false; }
    if (filter === void 0) { filter = function (val, fb) {
        return typeof val !== 'undefined' ? val : fb;
    }; }
    var value = name in settings_init_1.allSettings ? settings_init_1.allSettings[name] : fallback;
    return filter(value, fallback);
};
exports.getSetting = getSetting;
/**
 * Note: this attempts to coerce the wpVersion to a semver for comparison
 * This will result in dropping any beta/rc values.
 *
 * `5.3-beta1-4252` would get converted to `5.3.0-rc.4252`
 * `5.3-beta1` would get converted to `5.3.0-rc`.
 * `5.3` would not be touched.
 *
 * For the purpose of these comparisons all pre-release versions are normalized
 * to `rc`.
 *
 * @param {string} setting Setting name (e.g. wpVersion or wcVersion).
 * @param {string} version Version to compare.
 * @param {compareVersions.CompareOperator} operator Comparison operator.
 */
var compareVersionSettingIgnorePrerelease = function (setting, version, operator) {
    var settingValue = (0, exports.getSetting)(setting, '');
    var replacement = settingValue.replace(/-[a-zA-Z0-9]*[\-]*/, '.0-rc.');
    replacement = replacement.endsWith('.')
        ? replacement.substring(0, replacement.length - 1)
        : replacement;
    return compare_versions_1.default.compare(replacement, version, operator);
};
/**
 * Compare the current WP version with the provided `version` param using the
 * `operator`.
 *
 * For example `isWpVersion( '5.6', '<=' )` returns true if the site WP version
 * is smaller or equal than `5.6` .
 */
var isWpVersion = function (version, operator) {
    if (operator === void 0) { operator = '='; }
    return compareVersionSettingIgnorePrerelease('wpVersion', version, operator);
};
exports.isWpVersion = isWpVersion;
/**
 * Compare the current WC version with the provided `version` param using the
 * `operator`.
 *
 * For example `isWcVersion( '4.9.0', '<=' )` returns true if the site WC version
 * is smaller or equal than `4.9`.
 */
var isWcVersion = function (version, operator) {
    if (operator === void 0) { operator = '='; }
    return compareVersionSettingIgnorePrerelease('wcVersion', version, operator);
};
exports.isWcVersion = isWcVersion;
/**
 * Returns a string with the site's wp-admin URL appended. JS version of `admin_url`.
 *
 * @param {string} path Relative path.
 * @return {string} Full admin URL.
 */
var getAdminLink = function (path) {
    return (0, exports.getSetting)('adminUrl') + path;
};
exports.getAdminLink = getAdminLink;
