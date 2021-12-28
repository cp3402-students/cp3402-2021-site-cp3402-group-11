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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewSwitcher = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var data_1 = require("@wordpress/data");
var components_1 = require("@wordpress/components");
var icons_1 = require("@woocommerce/icons");
var block_editor_1 = require("@wordpress/block-editor");
var useViewSwitcher = function (clientId, views) {
    var initialView = views[0];
    var _a = (0, element_1.useState)(initialView), currentView = _a[0], setCurrentView = _a[1];
    var selectBlock = (0, data_1.useDispatch)('core/block-editor').selectBlock;
    var getBlock = (0, data_1.select)(block_editor_1.store).getBlock;
    var ViewSwitcherComponent = (<components_1.ToolbarGroup>
			<components_1.ToolbarDropdownMenu label={(0, i18n_1.__)('Switch view', 'woo-gutenberg-products-block')} text={currentView.label} icon={<icons_1.Icon srcElement={icons_1.eye} style={{ marginRight: '8px' }}/>} controls={views.map(function (view) { return (__assign(__assign({}, view), { title: <span>{view.label}</span>, isActive: view.view === currentView.view, onClick: function () {
                var _a;
                setCurrentView(view);
                selectBlock(((_a = getBlock(clientId).innerBlocks.find(function (block) {
                    return block.name === view.view;
                })) === null || _a === void 0 ? void 0 : _a.clientId) || clientId);
            } })); })}/>
		</components_1.ToolbarGroup>);
    return {
        currentView: currentView.view,
        component: ViewSwitcherComponent,
    };
};
exports.useViewSwitcher = useViewSwitcher;
