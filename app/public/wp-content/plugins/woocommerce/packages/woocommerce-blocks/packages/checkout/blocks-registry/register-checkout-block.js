"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCheckoutBlock = void 0;
/**
 * External dependencies
 */
var blocks_registry_1 = require("@woocommerce/blocks-registry");
var utils_1 = require("./utils");
var registered_blocks_1 = require("./registered-blocks");
/**
 * Main API for registering a new checkout block within areas.
 */
var registerCheckoutBlock = function (options) {
    var _a, _b, _c, _d;
    (0, utils_1.assertOption)(options, 'metadata', 'object');
    (0, utils_1.assertBlockName)(options.metadata.name);
    (0, utils_1.assertBlockParent)(options.metadata.parent);
    (0, utils_1.assertBlockComponent)(options, 'component');
    /**
     * This ensures the frontend component for the checkout block is available.
     */
    (0, blocks_registry_1.registerBlockComponent)({
        blockName: options.metadata.name,
        component: options.component,
    });
    /**
     * Store block metadata for later lookup.
     */
    registered_blocks_1.registeredBlocks[options.metadata.name] = {
        blockName: options.metadata.name,
        metadata: options.metadata,
        component: options.component,
        force: !!((_d = (_c = (_b = (_a = options.metadata) === null || _a === void 0 ? void 0 : _a.attributes) === null || _b === void 0 ? void 0 : _b.lock) === null || _c === void 0 ? void 0 : _c.default) === null || _d === void 0 ? void 0 : _d.remove),
    };
};
exports.registerCheckoutBlock = registerCheckoutBlock;
