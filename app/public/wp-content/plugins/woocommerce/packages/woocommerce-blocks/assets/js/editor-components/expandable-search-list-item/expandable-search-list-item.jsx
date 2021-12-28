"use strict";
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
/**
 * External dependencies
 */
var components_1 = require("@woocommerce/components");
var components_2 = require("@wordpress/components");
var classnames_1 = require("classnames");
var ExpandableSearchListItem = function (_a) {
    var className = _a.className, item = _a.item, isSelected = _a.isSelected, isLoading = _a.isLoading, onSelect = _a.onSelect, disabled = _a.disabled, rest = __rest(_a, ["className", "item", "isSelected", "isLoading", "onSelect", "disabled"]);
    return (<>
			<components_1.SearchListItem {...rest} key={item.id} className={className} isSelected={isSelected} item={item} onSelect={onSelect} isSingle disabled={disabled}/>
			{isSelected && isLoading && (<div key="loading" className={(0, classnames_1.default)('woocommerce-search-list__item', 'woocommerce-product-attributes__item', 'depth-1', 'is-loading', 'is-not-active')}>
					<components_2.Spinner />
				</div>)}
		</>);
};
exports.default = ExpandableSearchListItem;
