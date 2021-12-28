"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalFieldsContent = exports.AdditionalFields = void 0;
/**
 * External dependencies
 */
var block_editor_1 = require("@wordpress/block-editor");
/**
 * Internal dependencies
 */
require("./editor.scss");
var shared_1 = require("../../shared");
var AdditionalFields = function (_a) {
    var block = _a.block;
    var clientId = (0, block_editor_1.useBlockProps)()["data-block"];
    var allowedBlocks = (0, shared_1.getAllowedBlocks)(block);
    (0, shared_1.useForcedLayout)({
        clientId: clientId,
        registeredBlocks: allowedBlocks,
    });
    return (<div className="wc-block-checkout__additional_fields">
			<block_editor_1.InnerBlocks allowedBlocks={allowedBlocks}/>
		</div>);
};
exports.AdditionalFields = AdditionalFields;
var AdditionalFieldsContent = function () { return (<block_editor_1.InnerBlocks.Content />); };
exports.AdditionalFieldsContent = AdditionalFieldsContent;
