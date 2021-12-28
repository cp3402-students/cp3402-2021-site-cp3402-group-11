"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = exports.Edit = void 0;
/**
 * External dependencies
 */
var block_editor_1 = require("@wordpress/block-editor");
var components_1 = require("@wordpress/components");
/**
 * Internal dependencies
 */
var block_1 = require("./block");
require("./editor.scss");
var Edit = function () {
    var blockProps = (0, block_editor_1.useBlockProps)();
    return (<div {...blockProps}>
			<components_1.Disabled>
				<block_1.default />
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
