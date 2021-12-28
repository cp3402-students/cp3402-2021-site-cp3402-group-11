"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var shared_hocs_1 = require("@woocommerce/shared-hocs");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
var attributes_1 = require("./attributes");
exports.default = (0, shared_hocs_1.withFilteredAttributes)(attributes_1.default)(block_1.default);
