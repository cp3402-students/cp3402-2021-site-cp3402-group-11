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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var settings_1 = require("@woocommerce/settings");
var preload_script_1 = require("@woocommerce/base-utils/preload-script");
var lazy_load_script_1 = require("@woocommerce/base-utils/lazy-load-script");
var legacy_events_1 = require("@woocommerce/base-utils/legacy-events");
// eslint-disable-next-line @wordpress/no-global-event-listener
window.addEventListener('load', function () {
    var miniCartBlocks = document.querySelectorAll('.wc-block-mini-cart');
    var wasLoadScriptsCalled = false;
    if (miniCartBlocks.length === 0) {
        return;
    }
    var dependencies = (0, settings_1.getSetting)('mini_cart_block_frontend_dependencies', {});
    // Preload scripts
    for (var dependencyHandle in dependencies) {
        var dependency = dependencies[dependencyHandle];
        (0, preload_script_1.default)(__assign({ handle: dependencyHandle }, dependency));
    }
    // Make it so we can read jQuery events triggered by WC Core elements.
    var removeJQueryAddingToCartEvent = (0, legacy_events_1.translateJQueryEventToNative)('adding_to_cart', 'wc-blocks_adding_to_cart');
    var removeJQueryAddedToCartEvent = (0, legacy_events_1.translateJQueryEventToNative)('added_to_cart', 'wc-blocks_added_to_cart');
    var removeJQueryRemovedFromCartEvent = (0, legacy_events_1.translateJQueryEventToNative)('removed_from_cart', 'wc-blocks_removed_from_cart');
    var loadScripts = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _i, dependencyHandle, dependency;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    // Ensure we only call loadScripts once.
                    if (wasLoadScriptsCalled) {
                        return [2 /*return*/];
                    }
                    wasLoadScriptsCalled = true;
                    // Remove adding to cart event handler.
                    document.body.removeEventListener('wc-blocks_adding_to_cart', loadScripts);
                    removeJQueryAddingToCartEvent();
                    _a = [];
                    for (_b in dependencies)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    dependencyHandle = _a[_i];
                    dependency = dependencies[dependencyHandle];
                    return [4 /*yield*/, (0, lazy_load_script_1.default)(__assign({ handle: dependencyHandle }, dependency))];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    document.body.addEventListener('wc-blocks_adding_to_cart', loadScripts);
    miniCartBlocks.forEach(function (miniCartBlock, i) {
        if (!(miniCartBlock instanceof HTMLElement)) {
            return;
        }
        var miniCartButton = miniCartBlock.querySelector('.wc-block-mini-cart__button');
        var miniCartDrawerPlaceholderOverlay = miniCartBlock.querySelector('.wc-block-components-drawer__screen-overlay');
        if (!miniCartButton || !miniCartDrawerPlaceholderOverlay) {
            // Markup is not correct, abort.
            return;
        }
        var loadContents = function () {
            if (!wasLoadScriptsCalled) {
                loadScripts();
            }
            document.body.removeEventListener('wc-blocks_added_to_cart', 
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            openDrawerWithRefresh);
            document.body.removeEventListener('wc-blocks_removed_from_cart', 
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            loadContentsWithRefresh);
            removeJQueryAddedToCartEvent();
            removeJQueryRemovedFromCartEvent();
        };
        var openDrawer = function () {
            miniCartBlock.dataset.isInitiallyOpen = 'true';
            miniCartDrawerPlaceholderOverlay.classList.add('wc-block-components-drawer__screen-overlay--with-slide-in');
            miniCartDrawerPlaceholderOverlay.classList.remove('wc-block-components-drawer__screen-overlay--is-hidden');
            loadContents();
        };
        var openDrawerWithRefresh = function () {
            miniCartBlock.dataset.isDataOutdated = 'true';
            openDrawer();
        };
        var loadContentsWithRefresh = function () {
            miniCartBlock.dataset.isDataOutdated = 'true';
            miniCartBlock.dataset.isInitiallyOpen = 'false';
            loadContents();
        };
        miniCartButton.addEventListener('mouseover', loadScripts);
        miniCartButton.addEventListener('focus', loadScripts);
        miniCartButton.addEventListener('click', openDrawer);
        // There might be more than one Mini Cart block in the page. Make sure
        // only one opens when adding a product to the cart.
        if (i === 0) {
            document.body.addEventListener('wc-blocks_added_to_cart', openDrawerWithRefresh);
            document.body.addEventListener('wc-blocks_removed_from_cart', loadContentsWithRefresh);
        }
    });
});
