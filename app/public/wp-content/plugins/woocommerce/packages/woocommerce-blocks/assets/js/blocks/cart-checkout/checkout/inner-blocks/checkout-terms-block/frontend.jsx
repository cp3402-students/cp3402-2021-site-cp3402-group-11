"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var classnames_1 = require("classnames");
var element_1 = require("@wordpress/element");
var blocks_checkout_1 = require("@woocommerce/blocks-checkout");
var hooks_1 = require("@woocommerce/base-context/hooks");
var compose_1 = require("@wordpress/compose");
/**
 * Internal dependencies
 */
var constants_1 = require("./constants");
require("./style.scss");
var FrontendBlock = function (_a) {
    var text = _a.text, checkbox = _a.checkbox, instanceId = _a.instanceId, validation = _a.validation, className = _a.className;
    var _b = (0, element_1.useState)(false), checked = _b[0], setChecked = _b[1];
    var isDisabled = (0, hooks_1.useCheckoutSubmit)().isDisabled;
    var validationErrorId = 'terms-and-conditions-' + instanceId;
    var getValidationError = validation.getValidationError, setValidationErrors = validation.setValidationErrors, clearValidationError = validation.clearValidationError;
    var error = getValidationError(validationErrorId) || {};
    var hasError = error.message && !error.hidden;
    // Track validation errors for this input.
    (0, element_1.useEffect)(function () {
        var _a;
        if (!checkbox) {
            return;
        }
        if (checked) {
            clearValidationError(validationErrorId);
        }
        else {
            setValidationErrors((_a = {},
                _a[validationErrorId] = {
                    message: (0, i18n_1.__)('Please read and accept the terms and conditions.', 'woo-gutenberg-products-block'),
                    hidden: true,
                },
                _a));
        }
        return function () {
            clearValidationError(validationErrorId);
        };
    }, [
        checkbox,
        checked,
        validationErrorId,
        clearValidationError,
        setValidationErrors,
    ]);
    return (<div className={(0, classnames_1.default)('wc-block-checkout__terms', {
            'wc-block-checkout__terms--disabled': isDisabled,
        }, className)}>
			{checkbox ? (<>
					<blocks_checkout_1.CheckboxControl id="terms-and-conditions" checked={checked} onChange={function () { return setChecked(function (value) { return !value; }); }} hasError={hasError} disabled={isDisabled}>
						<span dangerouslySetInnerHTML={{
                __html: text || constants_1.termsCheckboxDefaultText,
            }}/>
					</blocks_checkout_1.CheckboxControl>
				</>) : (<span dangerouslySetInnerHTML={{
                __html: text || constants_1.termsConsentDefaultText,
            }}/>)}
		</div>);
};
exports.default = (0, compose_1.withInstanceId)(FrontendBlock);
