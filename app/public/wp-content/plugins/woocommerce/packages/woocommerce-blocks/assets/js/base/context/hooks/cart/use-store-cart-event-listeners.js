"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStoreCartEventListeners = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var block_data_1 = require("@woocommerce/block-data");
var data_1 = require("@wordpress/data");
var base_utils_1 = require("@woocommerce/base-utils");
var refreshData = function (e) {
    var eventDetail = e.detail;
    if (!eventDetail || !eventDetail.preserveCartData) {
        (0, data_1.dispatch)(block_data_1.CART_STORE_KEY).invalidateResolutionForStore();
    }
};
var setUp = function () {
    if (!window.wcBlocksStoreCartListeners) {
        window.wcBlocksStoreCartListeners = {
            count: 0,
            remove: function () { return void null; },
        };
    }
};
var addListeners = function () {
    setUp();
    if (!window.wcBlocksStoreCartListeners.count) {
        var removeJQueryAddedToCartEvent_1 = (0, base_utils_1.translateJQueryEventToNative)('added_to_cart', "wc-blocks_added_to_cart");
        var removeJQueryRemovedFromCartEvent_1 = (0, base_utils_1.translateJQueryEventToNative)('removed_from_cart', "wc-blocks_removed_from_cart");
        document.body.addEventListener("wc-blocks_added_to_cart", refreshData);
        document.body.addEventListener("wc-blocks_removed_from_cart", refreshData);
        window.wcBlocksStoreCartListeners.count = 0;
        window.wcBlocksStoreCartListeners.remove = function () {
            removeJQueryAddedToCartEvent_1();
            removeJQueryRemovedFromCartEvent_1();
            document.body.removeEventListener("wc-blocks_added_to_cart", refreshData);
            document.body.removeEventListener("wc-blocks_removed_from_cart", refreshData);
        };
    }
    window.wcBlocksStoreCartListeners.count++;
};
var removeListeners = function () {
    if (window.wcBlocksStoreCartListeners.count === 1) {
        window.wcBlocksStoreCartListeners.remove();
    }
    window.wcBlocksStoreCartListeners.count--;
};
var useStoreCartEventListeners = function () {
    (0, element_1.useEffect)(function () {
        addListeners();
        return removeListeners;
    }, []);
};
exports.useStoreCartEventListeners = useStoreCartEventListeners;
