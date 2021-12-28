"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var classnames_1 = require("classnames");
var i18n_1 = require("@wordpress/i18n");
var element_1 = require("@wordpress/element");
var compose_1 = require("@wordpress/compose");
var wordpress_components_1 = require("wordpress-components");
var base_context_1 = require("@woocommerce/base-context");
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
require("./style.scss");
/**
 * Wrapper for the WordPress ComboboxControl which supports validation.
 */
var Combobox = function (_a) {
    var id = _a.id, className = _a.className, label = _a.label, onChange = _a.onChange, options = _a.options, value = _a.value, _b = _a.required, required = _b === void 0 ? false : _b, _c = _a.errorMessage, errorMessage = _c === void 0 ? (0, i18n_1.__)('Please select a value.', 'woo-gutenberg-products-block') : _c, incomingErrorId = _a.errorId, _d = _a.instanceId, instanceId = _d === void 0 ? '0' : _d, _e = _a.autoComplete, autoComplete = _e === void 0 ? 'off' : _e;
    var _f = (0, base_context_1.useValidationContext)(), getValidationError = _f.getValidationError, setValidationErrors = _f.setValidationErrors, clearValidationError = _f.clearValidationError;
    var controlRef = (0, element_1.useRef)(null);
    var controlId = id || 'control-' + instanceId;
    var errorId = incomingErrorId || controlId;
    var error = (getValidationError(errorId) || {
        message: '',
        hidden: false,
    });
    (0, element_1.useEffect)(function () {
        var _a;
        if (!required || value) {
            clearValidationError(errorId);
        }
        else {
            setValidationErrors((_a = {},
                _a[errorId] = {
                    message: errorMessage,
                    hidden: true,
                },
                _a));
        }
        return function () {
            clearValidationError(errorId);
        };
    }, [
        clearValidationError,
        value,
        errorId,
        errorMessage,
        required,
        setValidationErrors,
    ]);
    // @todo Remove patch for ComboboxControl once https://github.com/WordPress/gutenberg/pull/33928 is released
    // Also see https://github.com/WordPress/gutenberg/pull/34090
    return (<div id={controlId} className={(0, classnames_1.default)('wc-block-components-combobox', className, {
            'is-active': value,
            'has-error': error.message && !error.hidden,
        })} ref={controlRef}>
			<wordpress_components_1.ComboboxControl className={'wc-block-components-combobox-control'} label={label} onChange={onChange} onFilterValueChange={function (filterValue) {
            if (filterValue.length) {
                // If we have a value and the combobox is not focussed, this could be from browser autofill.
                var activeElement = (0, types_1.isObject)(controlRef.current)
                    ? controlRef.current.ownerDocument.activeElement
                    : undefined;
                if (activeElement &&
                    (0, types_1.isObject)(controlRef.current) &&
                    controlRef.current.contains(activeElement)) {
                    return;
                }
                // Try to match.
                var normalizedFilterValue_1 = filterValue.toLocaleUpperCase();
                var foundOption = options.find(function (option) {
                    return option.label
                        .toLocaleUpperCase()
                        .startsWith(normalizedFilterValue_1) ||
                        option.value.toLocaleUpperCase() ===
                            normalizedFilterValue_1;
                });
                if (foundOption) {
                    onChange(foundOption.value);
                }
            }
        }} options={options} value={value || ''} allowReset={false} autoComplete={autoComplete} aria-invalid={error.message && !error.hidden}/>
			<base_context_1.ValidationInputError propertyName={errorId}/>
		</div>);
};
exports.default = (0, compose_1.withInstanceId)(Combobox);
