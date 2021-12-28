"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allSettings = void 0;
var defaults = {
    adminUrl: '',
    countries: [],
    currency: {
        code: 'USD',
        precision: 2,
        symbol: '$',
        symbolPosition: 'left',
        decimalSeparator: '.',
        priceFormat: '%1$s%2$s',
        thousandSeparator: ',',
    },
    currentUserIsAdmin: false,
    homeUrl: '',
    locale: {
        siteLocale: 'en_US',
        userLocale: 'en_US',
        weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    orderStatuses: [],
    placeholderImgSrc: '',
    siteTitle: '',
    storePages: [],
    wcAssetUrl: '',
    wcVersion: '',
    wpLoginUrl: '',
    wpVersion: '',
};
var globalSharedSettings = typeof window.wcSettings === 'object' ? window.wcSettings : {};
// Use defaults or global settings, depending on what is set.
var allSettings = __assign(__assign({}, defaults), globalSharedSettings);
exports.allSettings = allSettings;
allSettings.currency = __assign(__assign({}, defaults.currency), allSettings.currency);
allSettings.locale = __assign(__assign({}, defaults.locale), allSettings.locale);
