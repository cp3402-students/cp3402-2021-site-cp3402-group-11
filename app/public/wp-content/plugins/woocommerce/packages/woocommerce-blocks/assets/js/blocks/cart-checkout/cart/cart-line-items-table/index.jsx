"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var cart_line_item_row_1 = require("./cart-line-item-row");
var placeholderRows = __spreadArray([], Array(3), true).map(function (_x, i) { return (<cart_line_item_row_1.default lineItem={{}} key={i}/>); });
var setRefs = function (lineItems) {
    var refs = {};
    lineItems.forEach(function (_a) {
        var key = _a.key;
        refs[key] = (0, element_1.createRef)();
    });
    return refs;
};
var CartLineItemsTable = function (_a) {
    var _b = _a.lineItems, lineItems = _b === void 0 ? [] : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, className = _a.className;
    var tableRef = (0, element_1.useRef)(null);
    var rowRefs = (0, element_1.useRef)(setRefs(lineItems));
    (0, element_1.useEffect)(function () {
        rowRefs.current = setRefs(lineItems);
    }, [lineItems]);
    var onRemoveRow = function (nextItemKey) { return function () {
        if ((rowRefs === null || rowRefs === void 0 ? void 0 : rowRefs.current) &&
            nextItemKey &&
            rowRefs.current[nextItemKey].current instanceof HTMLElement) {
            rowRefs.current[nextItemKey].current.focus();
        }
        else if (tableRef.current instanceof HTMLElement) {
            tableRef.current.focus();
        }
    }; };
    var products = isLoading
        ? placeholderRows
        : lineItems.map(function (lineItem, i) {
            var nextItemKey = lineItems.length > i + 1 ? lineItems[i + 1].key : null;
            return (<cart_line_item_row_1.default key={lineItem.key} lineItem={lineItem} onRemove={onRemoveRow(nextItemKey)} ref={rowRefs.current[lineItem.key]} tabIndex={-1}/>);
        });
    return (<table className={(0, classnames_1.default)('wc-block-cart-items', className)} ref={tableRef} tabIndex={-1}>
			<thead>
				<tr className="wc-block-cart-items__header">
					<th className="wc-block-cart-items__header-image">
						<span>
							{(0, i18n_1.__)('Product', 'woo-gutenberg-products-block')}
						</span>
					</th>
					<th className="wc-block-cart-items__header-product">
						<span>
							{(0, i18n_1.__)('Details', 'woo-gutenberg-products-block')}
						</span>
					</th>
					<th className="wc-block-cart-items__header-total">
						<span>
							{(0, i18n_1.__)('Total', 'woo-gutenberg-products-block')}
						</span>
					</th>
				</tr>
			</thead>
			<tbody>{products}</tbody>
		</table>);
};
exports.default = CartLineItemsTable;
