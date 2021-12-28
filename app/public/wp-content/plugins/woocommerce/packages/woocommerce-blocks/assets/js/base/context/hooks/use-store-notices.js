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
exports.useStoreNotices = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var context_1 = require("../providers/store-notices/context");
var useStoreNotices = function () {
    var _a = (0, context_1.useStoreNoticesContext)(), notices = _a.notices, createNotice = _a.createNotice, removeNotice = _a.removeNotice, setIsSuppressed = _a.setIsSuppressed;
    // Added to a ref so the surface for notices doesn't change frequently
    // and thus can be used as dependencies on effects.
    var currentNotices = (0, element_1.useRef)(notices);
    // Update notices ref whenever they change
    (0, element_1.useEffect)(function () {
        currentNotices.current = notices;
    }, [notices]);
    var noticesApi = (0, element_1.useMemo)(function () { return ({
        hasNoticesOfType: function (type) {
            return currentNotices.current.some(function (notice) { return notice.type === type; });
        },
        removeNotices: function (status) {
            if (status === void 0) { status = null; }
            currentNotices.current.forEach(function (notice) {
                if (status === null || notice.status === status) {
                    removeNotice(notice.id);
                }
            });
        },
        removeNotice: removeNotice,
    }); }, [removeNotice]);
    var noticeCreators = (0, element_1.useMemo)(function () { return ({
        addDefaultNotice: function (text, noticeProps) {
            if (noticeProps === void 0) { noticeProps = {}; }
            return void createNotice('default', text, __assign({}, noticeProps));
        },
        addErrorNotice: function (text, noticeProps) {
            if (noticeProps === void 0) { noticeProps = {}; }
            return void createNotice('error', text, __assign({}, noticeProps));
        },
        addWarningNotice: function (text, noticeProps) {
            if (noticeProps === void 0) { noticeProps = {}; }
            return void createNotice('warning', text, __assign({}, noticeProps));
        },
        addInfoNotice: function (text, noticeProps) {
            if (noticeProps === void 0) { noticeProps = {}; }
            return void createNotice('info', text, __assign({}, noticeProps));
        },
        addSuccessNotice: function (text, noticeProps) {
            if (noticeProps === void 0) { noticeProps = {}; }
            return void createNotice('success', text, __assign({}, noticeProps));
        },
    }); }, [createNotice]);
    return __assign(__assign(__assign({ notices: notices }, noticesApi), noticeCreators), { setIsSuppressed: setIsSuppressed });
};
exports.useStoreNotices = useStoreNotices;
