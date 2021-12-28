"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useValidation = void 0;
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
var validation_1 = require("../providers/validation/");
/**
 * Custom hook for setting for adding errors to the validation system.
 */
var useValidation = function () {
    var _a = (0, validation_1.useValidationContext)(), hasValidationErrors = _a.hasValidationErrors, getValidationError = _a.getValidationError, clearValidationError = _a.clearValidationError, hideValidationError = _a.hideValidationError, setValidationErrors = _a.setValidationErrors;
    var prefix = 'extensions-errors';
    return {
        hasValidationErrors: hasValidationErrors,
        getValidationError: (0, element_1.useCallback)(function (validationErrorId) {
            return getValidationError(prefix + "-" + validationErrorId);
        }, [getValidationError]),
        clearValidationError: (0, element_1.useCallback)(function (validationErrorId) {
            return clearValidationError(prefix + "-" + validationErrorId);
        }, [clearValidationError]),
        hideValidationError: (0, element_1.useCallback)(function (validationErrorId) {
            return hideValidationError(prefix + "-" + validationErrorId);
        }, [hideValidationError]),
        setValidationErrors: (0, element_1.useCallback)(function (errorsObject) {
            return setValidationErrors(Object.fromEntries(Object.entries(errorsObject).map(function (_a) {
                var validationErrorId = _a[0], error = _a[1];
                return [
                    prefix + "-" + validationErrorId,
                    error,
                ];
            })));
        }, [setValidationErrors]),
    };
};
exports.useValidation = useValidation;
