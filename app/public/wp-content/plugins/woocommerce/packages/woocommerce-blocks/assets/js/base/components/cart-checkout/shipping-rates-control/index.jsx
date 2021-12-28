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
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var a11y_1 = require("@wordpress/a11y");
var loading_mask_1 = require("@woocommerce/base-components/loading-mask");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var base_utils_1 = require("@woocommerce/base-utils");
var base_context_1 = require("@woocommerce/base-context");
/**
 * Internal dependencies
 */
var shipping_rates_control_package_1 = require("../shipping-rates-control-package");
/**
 * Renders multiple packages within the slotfill.
 *
 * @param {Object} props Incoming props.
 * @param {Array} props.packages Array of packages.
 * @param {boolean} props.collapsible If the package should be rendered as a
 * @param {ReactElement} props.noResultsMessage Rendered when there are no rates in a package.
 * collapsible panel.
 * @param {boolean} props.collapse If the panel should be collapsed by default,
 * only works if collapsible is true.
 * @param {boolean} props.showItems If we should items below the package name.
 * @param {PackageRateRenderOption} [props.renderOption] Function to render a shipping rate.
 * @return {JSX.Element|null} Rendered components.
 */
var Packages = function (_a) {
    var packages = _a.packages, collapse = _a.collapse, showItems = _a.showItems, collapsible = _a.collapsible, noResultsMessage = _a.noResultsMessage, renderOption = _a.renderOption;
    // If there are no packages, return nothing.
    if (!packages.length) {
        return null;
    }
    return (<>
			{packages.map(function (_a) {
            var packageId = _a.package_id, packageData = __rest(_a, ["package_id"]);
            return (<shipping_rates_control_package_1.default key={packageId} packageId={packageId} packageData={packageData} collapsible={collapsible} collapse={collapse} showItems={showItems} noResultsMessage={noResultsMessage} renderOption={renderOption}/>);
        })}
		</>);
};
/**
 * Renders the shipping rates control element.
 *
 * @param {Object} props Incoming props.
 * @param {Array} props.shippingRates Array of packages containing shipping rates.
 * @param {boolean} props.shippingRatesLoading True when rates are being loaded.
 * @param {string} props.className Class name for package rates.
 * @param {boolean} [props.collapsible] If true, when multiple packages are rendered they can be toggled open and closed.
 * @param {ReactElement} props.noResultsMessage Rendered when there are no packages.
 * @param {Function} [props.renderOption] Function to render a shipping rate.
 */
var ShippingRatesControl = function (_a) {
    var shippingRates = _a.shippingRates, shippingRatesLoading = _a.shippingRatesLoading, className = _a.className, _b = _a.collapsible, collapsible = _b === void 0 ? false : _b, noResultsMessage = _a.noResultsMessage, renderOption = _a.renderOption;
    (0, element_1.useEffect)(function () {
        if (shippingRatesLoading) {
            return;
        }
        var packageCount = (0, base_utils_1.getShippingRatesPackageCount)(shippingRates);
        var shippingOptions = (0, base_utils_1.getShippingRatesRateCount)(shippingRates);
        if (packageCount === 1) {
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %d number of shipping options found. */
            (0, i18n_1._n)('%d shipping option was found.', '%d shipping options were found.', shippingOptions, 'woo-gutenberg-products-block'), shippingOptions));
        }
        else {
            (0, a11y_1.speak)((0, i18n_1.sprintf)(
            /* translators: %d number of shipping packages packages. */
            (0, i18n_1._n)('Shipping option searched for %d package.', 'Shipping options searched for %d packages.', packageCount, 'woo-gutenberg-products-block'), packageCount) +
                ' ' +
                (0, i18n_1.sprintf)(
                /* translators: %d number of shipping options available. */
                (0, i18n_1._n)('%d shipping option was found', '%d shipping options were found', shippingOptions, 'woo-gutenberg-products-block'), shippingOptions));
        }
    }, [shippingRatesLoading, shippingRates]);
    // Prepare props to pass to the ExperimentalOrderShippingPackages slot fill.
    // We need to pluck out receiveCart.
    // eslint-disable-next-line no-unused-vars
    var _c = (0, base_context_1.useStoreCart)(), extensions = _c.extensions, receiveCart = _c.receiveCart, cart = __rest(_c, ["extensions", "receiveCart"]);
    var slotFillProps = {
        className: className,
        collapsible: collapsible,
        noResultsMessage: noResultsMessage,
        renderOption: renderOption,
        extensions: extensions,
        cart: cart,
        components: {
            ShippingRatesControlPackage: shipping_rates_control_package_1.default,
        },
    };
    var isEditor = (0, base_context_1.useEditorContext)().isEditor;
    return (<loading_mask_1.default isLoading={shippingRatesLoading} screenReaderLabel={(0, i18n_1.__)('Loading shipping rates…', 'woo-gutenberg-products-block')} showSpinner={true}>
			{isEditor ? (<Packages packages={shippingRates} noResultsMessage={noResultsMessage} renderOption={renderOption}/>) : (<>
					<blocks_checkout_1.ExperimentalOrderShippingPackages.Slot {...slotFillProps}/>
					<blocks_checkout_1.ExperimentalOrderShippingPackages>
						<Packages packages={shippingRates} noResultsMessage={noResultsMessage} renderOption={renderOption}/>
					</blocks_checkout_1.ExperimentalOrderShippingPackages>
				</>)}
		</loading_mask_1.default>);
};
exports.default = ShippingRatesControl;
