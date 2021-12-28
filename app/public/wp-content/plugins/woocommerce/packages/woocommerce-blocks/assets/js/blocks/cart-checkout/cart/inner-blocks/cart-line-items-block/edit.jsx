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
var Edit = function (_a) {
    var attributes = _a.attributes;
    var className = attributes.className;
    var blockProps = (0, block_editor_1.useBlockProps)();
    return (<div {...blockProps}>
			<components_1.Disabled>
				<block_1.default className={className}/>
			</components_1.Disabled>
		</div>);
};
exports.Edit = Edit;
var Save = function () {
    return <div {...block_editor_1.useBlockProps.save()}/>;
};
exports.Save = Save;
