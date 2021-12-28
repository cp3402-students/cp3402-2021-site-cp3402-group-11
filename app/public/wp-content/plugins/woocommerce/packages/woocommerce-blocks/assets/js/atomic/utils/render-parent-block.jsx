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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderParentBlock = void 0;
/**
 * External dependencies
 */
var base_utils_1 = require("@woocommerce/base-utils");
var element_1 = require("@wordpress/element");
var html_react_parser_1 = require("html-react-parser");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
/**
 * This file contains logic used on the frontend to convert DOM elements (saved by the block editor) to React
 * Components. These components are registered using registerBlockComponent() and registerCheckoutBlock() and map 1:1
 * to a block by name.
 *
 * Blocks using this system will have their blockName stored as a data attribute, for example:
 * 		<div data-block-name="woocommerce/product-title"></div>
 *
 * This block name is then read, and using the map, dynamically converted to a real React Component.
 *
 * @see registerBlockComponent
 * @see registerCheckoutBlock
 */
/**
 * Gets a component from the block map for a given block name, or returns null if a component is not registered.
 */
var getBlockComponentFromMap = function (block, blockMap) {
    return block && blockMap[block]
        ? blockMap[block]
        : null;
};
/**
 * Render forced blocks which are missing from the template.
 *
 * Forced blocks are registered in registerCheckoutBlock. If a block is forced, it will be inserted in the editor
 * automatically, however, until that happens they may be missing from the frontend. To fix this, we look up what blocks
 * are registered as forced, and then append them here if they are missing.
 *
 * @see registerCheckoutBlock
 */
var renderForcedBlocks = function (block, blockMap, 
// Current children from the parent (siblings of the forced block)
blockChildren, 
// Wrapper for inner components.
blockWrapper) {
    if (!(0, blocks_checkout_1.hasInnerBlocks)(block)) {
        return null;
    }
    var currentBlocks = blockChildren
        ? Array.from(blockChildren)
            .map(function (element) {
            return element instanceof HTMLElement
                ? (element === null || element === void 0 ? void 0 : element.dataset.blockName) || null
                : null;
        })
            .filter(Boolean)
        : [];
    var forcedBlocks = (0, blocks_checkout_1.getRegisteredBlocks)(block).filter(function (_a) {
        var blockName = _a.blockName, force = _a.force;
        return force === true && !currentBlocks.includes(blockName);
    });
    // This will wrap inner blocks with the provided wrapper. If no wrapper is provided, we default to Fragment.
    var InnerBlockComponentWrapper = blockWrapper ? blockWrapper : element_1.Fragment;
    return (<InnerBlockComponentWrapper>
			{forcedBlocks.map(function (_a, index) {
            var blockName = _a.blockName, component = _a.component;
            var ForcedComponent = component
                ? component
                : getBlockComponentFromMap(blockName, blockMap);
            return ForcedComponent ? (<ForcedComponent key={blockName + "_forced_" + index}/>) : null;
        })}
		</InnerBlockComponentWrapper>);
};
/**
 * Recursively replace block markup in the DOM with React Components.
 */
var renderInnerBlocks = function (_a) {
    var 
    // This is the parent block we're working within (see renderParentBlock)
    block = _a.block, 
    // This is the map of blockNames->components
    blockMap = _a.blockMap, 
    // Component which inner blocks are wrapped with.
    blockWrapper = _a.blockWrapper, 
    // The children from the DOM we're currently iterating over.
    children = _a.children, 
    // Current depth of the children. Used to ensure keys are unique.
    _b = _a.depth, 
    // Current depth of the children. Used to ensure keys are unique.
    depth = _b === void 0 ? 1 : _b;
    if (!children || children.length === 0) {
        return null;
    }
    return Array.from(children).map(function (element, index) {
        /**
         * This will grab the blockName from the data- attributes stored in block markup. Without a blockName, we cannot
         * convert the HTMLElement to a React component.
         */
        var _a = __assign(__assign({ key: block + "_" + depth + "_" + index }, (element instanceof HTMLElement ? element.dataset : {})), { className: element.className || '' }), _b = _a.blockName, blockName = _b === void 0 ? '' : _b, componentProps = __rest(_a, ["blockName"]);
        var InnerBlockComponent = getBlockComponentFromMap(blockName, blockMap);
        /**
         * If the component cannot be found, or blockName is missing, return the original element. This also ensures
         * that children within the element are processed also, since it may be an element containing block markup.
         *
         * Note we use childNodes rather than children so that text nodes are also rendered.
         */
        if (!InnerBlockComponent) {
            var parsedElement = (0, html_react_parser_1.default)((element === null || element === void 0 ? void 0 : element.outerHTML) || (element === null || element === void 0 ? void 0 : element.textContent) || '');
            // Returns text nodes without manipulation.
            if (typeof parsedElement === 'string' && !!parsedElement) {
                return parsedElement;
            }
            // Do not render invalid elements.
            if (!(0, element_1.isValidElement)(parsedElement)) {
                return null;
            }
            var renderedChildren = element.childNodes.length
                ? renderInnerBlocks({
                    block: block,
                    blockMap: blockMap,
                    children: element.childNodes,
                    depth: depth + 1,
                    blockWrapper: blockWrapper,
                })
                : undefined;
            return renderedChildren
                ? (0, element_1.cloneElement)(parsedElement, componentProps, renderedChildren)
                : (0, element_1.cloneElement)(parsedElement, componentProps);
        }
        // This will wrap inner blocks with the provided wrapper. If no wrapper is provided, we default to Fragment.
        var InnerBlockComponentWrapper = blockWrapper
            ? blockWrapper
            : element_1.Fragment;
        return (<element_1.Suspense key={block + "_" + depth + "_" + index + "_suspense"} fallback={<div className="wc-block-placeholder"/>}>
				<InnerBlockComponentWrapper>
					<InnerBlockComponent {...componentProps}>
						{
            /**
             * Within this Inner Block Component we also need to recursively render it's children. This
             * is done here with a depth+1. The same block map and parent is used, but we pass new
             * children from this element.
             */
            renderInnerBlocks({
                block: block,
                blockMap: blockMap,
                children: element.children,
                depth: depth + 1,
                blockWrapper: blockWrapper,
            })}
						{
            /**
             * In addition to the inner blocks, we may also need to render FORCED blocks which have not
             * yet been added to the inner block template. We do this by comparing the current children
             * to the list of registered forced blocks.
             *
             * @see registerCheckoutBlock
             */
            renderForcedBlocks(blockName, blockMap, element.children, blockWrapper)}
					</InnerBlockComponent>
				</InnerBlockComponentWrapper>
			</element_1.Suspense>);
    });
};
/**
 * Render a parent block on the frontend.
 *
 * This is the main entry point used on the frontend to convert Block Markup (with inner blocks) in the DOM to React
 * Components.
 *
 * This uses renderFrontend(). The difference is, renderFrontend renders a single block, but renderParentBlock() also
 * handles inner blocks by recursively running over children from the DOM.
 *
 * @see renderInnerBlocks
 * @see renderFrontend
 */
var renderParentBlock = function (_a) {
    var Block = _a.Block, selector = _a.selector, blockName = _a.blockName, _b = _a.getProps, getProps = _b === void 0 ? function () { return ({}); } : _b, blockMap = _a.blockMap, blockWrapper = _a.blockWrapper;
    /**
     * In addition to getProps, we need to render and return the children. This adds children to props.
     */
    var getPropsWithChildren = function (element, i) {
        var children = renderInnerBlocks({
            block: blockName,
            blockMap: blockMap,
            children: element.children || [],
            blockWrapper: blockWrapper,
        });
        return __assign(__assign({}, getProps(element, i)), { children: children });
    };
    /**
     * The only difference between using renderParentBlock and renderFrontend is that here we provide children.
     */
    (0, base_utils_1.renderFrontend)({
        Block: Block,
        selector: selector,
        getProps: getPropsWithChildren,
    });
};
exports.renderParentBlock = renderParentBlock;
