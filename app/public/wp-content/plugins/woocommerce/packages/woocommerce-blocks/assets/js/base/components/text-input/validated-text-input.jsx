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
var react_1 = require("react");
var classnames_1 = require("classnames");
var base_context_1 = require("@woocommerce/base-context");
var compose_1 = require("@wordpress/compose");
var types_1 = require("@woocommerce/types");
/**
 * Internal dependencies
 */
var text_input_1 = require("./text-input");
require("./style.scss");
var ValidatedTextInput = function (_a) {
    var className = _a.className, instanceId = _a.instanceId, id = _a.id, ariaDescribedBy = _a.ariaDescribedBy, errorId = _a.errorId, _b = _a.validateOnMount, validateOnMount = _b === void 0 ? true : _b, _c = _a.focusOnMount, focusOnMount = _c === void 0 ? false : _c, onChange = _a.onChange, _d = _a.showError, showError = _d === void 0 ? true : _d, _e = _a.errorMessage, passedErrorMessage = _e === void 0 ? '' : _e, rest = __rest(_a, ["className", "instanceId", "id", "ariaDescribedBy", "errorId", "validateOnMount", "focusOnMount", "onChange", "showError", "errorMessage"]);
    var _f = (0, react_1.useState)(true), isPristine = _f[0], setIsPristine = _f[1];
    var inputRef = (0, react_1.useRef)(null);
    var _g = (0, base_context_1.useValidationContext)(), getValidationError = _g.getValidationError, hideValidationError = _g.hideValidationError, setValidationErrors = _g.setValidationErrors, clearValidationError = _g.clearValidationError, getValidationErrorId = _g.getValidationErrorId;
    var isBeforeProcessing = (0, base_context_1.useCheckoutContext)().isBeforeProcessing;
    var textInputId = typeof id !== 'undefined' ? id : 'textinput-' + instanceId;
    var errorIdString = errorId !== undefined ? errorId : textInputId;
    var validateInput = (0, react_1.useCallback)(function (errorsHidden) {
        var _a;
        if (errorsHidden === void 0) { errorsHidden = true; }
        var inputObject = inputRef.current || null;
        if (!inputObject) {
            return;
        }
        // Trim white space before validation.
        inputObject.value = inputObject.value.trim();
        var inputIsValid = inputObject.checkValidity();
        if (inputIsValid) {
            clearValidationError(errorIdString);
        }
        else {
            setValidationErrors((_a = {},
                _a[errorIdString] = {
                    message: inputObject.validationMessage ||
                        (0, i18n_1.__)('Invalid value.', 'woo-gutenberg-products-block'),
                    hidden: errorsHidden,
                },
                _a));
        }
    }, [clearValidationError, errorIdString, setValidationErrors]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (isPristine) {
            if (focusOnMount) {
                (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            }
            setIsPristine(false);
        }
    }, [focusOnMount, isPristine, setIsPristine]);
    (0, react_1.useEffect)(function () {
        if (isPristine) {
            if (validateOnMount) {
                validateInput();
            }
            setIsPristine(false);
        }
    }, [isPristine, setIsPristine, validateOnMount, validateInput]);
    /**
     * @todo Remove extra validation call after refactoring the validation system.
     */
    (0, react_1.useEffect)(function () {
        if (isBeforeProcessing) {
            validateInput();
        }
    }, [isBeforeProcessing, validateInput]);
    // Remove validation errors when unmounted.
    (0, react_1.useEffect)(function () {
        return function () {
            clearValidationError(errorIdString);
        };
    }, [clearValidationError, errorIdString]);
    // @todo - When useValidationContext is converted to TypeScript, remove this cast and use the correct type.
    var errorMessage = (getValidationError(errorIdString) || {});
    if ((0, types_1.isString)(passedErrorMessage) && passedErrorMessage !== '') {
        errorMessage.message = passedErrorMessage;
    }
    var hasError = errorMessage.message && !errorMessage.hidden;
    var describedBy = showError && hasError && getValidationErrorId(errorIdString)
        ? getValidationErrorId(errorIdString)
        : ariaDescribedBy;
    return (<text_input_1.default className={(0, classnames_1.default)(className, {
            'has-error': hasError,
        })} aria-invalid={hasError === true} id={textInputId} onBlur={function () {
            validateInput(false);
        }} feedback={showError && (<base_context_1.ValidationInputError errorMessage={passedErrorMessage} propertyName={errorIdString}/>)} ref={inputRef} onChange={function (val) {
            hideValidationError(errorIdString);
            onChange(val);
        }} ariaDescribedBy={describedBy} {...rest}/>);
};
exports.default = (0, compose_1.withInstanceId)(ValidatedTextInput);
