"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var html_entities_1 = require("@wordpress/html-entities");
var element_1 = require("@wordpress/element");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
var text_input_1 = require("../text-input");
var combobox_1 = require("../combobox");
require("./style.scss");
var optionMatcher = function (value, options) {
    var foundOption = options.find(function (option) {
        return option.label.toLocaleUpperCase() === value.toLocaleUpperCase() ||
            option.value.toLocaleUpperCase() === value.toLocaleUpperCase();
    });
    return foundOption ? foundOption.value : '';
};
var StateInput = function (_a) {
    var className = _a.className, id = _a.id, states = _a.states, country = _a.country, label = _a.label, onChange = _a.onChange, _b = _a.autoComplete, autoComplete = _b === void 0 ? 'off' : _b, _c = _a.value, value = _c === void 0 ? '' : _c, _d = _a.required, required = _d === void 0 ? false : _d;
    var countryStates = states[country];
    var options = (0, element_1.useMemo)(function () {
        return countryStates
            ? Object.keys(countryStates).map(function (key) { return ({
                value: key,
                label: (0, html_entities_1.decodeEntities)(countryStates[key]),
            }); })
            : [];
    }, [countryStates]);
    /**
     * Handles state selection onChange events. Finds a matching state by key or value.
     */
    var onChangeState = (0, element_1.useCallback)(function (stateValue) {
        onChange(options.length > 0
            ? optionMatcher(stateValue, options)
            : stateValue);
    }, [onChange, options]);
    /**
     * Track value changes.
     */
    var valueRef = (0, element_1.useRef)(value);
    (0, element_1.useEffect)(function () {
        if (valueRef.current !== value) {
            valueRef.current = value;
        }
    }, [value]);
    /**
     * If given a list of options, ensure the value matches those options or trigger change.
     */
    (0, element_1.useEffect)(function () {
        if (options.length > 0 && valueRef.current) {
            var match = optionMatcher(valueRef.current, options);
            if (match !== valueRef.current) {
                onChangeState(match);
            }
        }
    }, [options, onChangeState]);
    if (options.length > 0) {
        return (<>
				<combobox_1.default className={(0, classnames_1.default)(className, 'wc-block-components-state-input')} id={id} label={label} onChange={onChangeState} options={options} value={value} errorMessage={(0, i18n_1.__)('Please select a state.', 'woo-gutenberg-products-block')} required={required} autoComplete={autoComplete}/>
				{autoComplete !== 'off' && (<input type="text" aria-hidden={true} autoComplete={autoComplete} value={value} onChange={function (event) {
                    return onChangeState(event.target.value);
                }} style={{
                    minHeight: '0',
                    height: '0',
                    border: '0',
                    padding: '0',
                    position: 'absolute',
                }} tabIndex={-1}/>)}
			</>);
    }
    return (<text_input_1.ValidatedTextInput className={className} id={id} label={label} onChange={onChangeState} autoComplete={autoComplete} value={value} required={required}/>);
};
exports.default = StateInput;
