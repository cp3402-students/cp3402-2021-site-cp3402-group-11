"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var element_1 = require("@wordpress/element");
var i18n_1 = require("@wordpress/i18n");
var html_entities_1 = require("@wordpress/html-entities");
var classnames_1 = require("classnames");
/**
 * Internal dependencies
 */
var combobox_1 = require("../combobox");
require("./style.scss");
var CountryInput = function (_a) {
    var className = _a.className, countries = _a.countries, id = _a.id, label = _a.label, onChange = _a.onChange, _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.autoComplete, autoComplete = _c === void 0 ? 'off' : _c, _d = _a.required, required = _d === void 0 ? false : _d, errorId = _a.errorId, _e = _a.errorMessage, errorMessage = _e === void 0 ? (0, i18n_1.__)('Please select a country.', 'woo-gutenberg-products-block') : _e;
    var options = (0, element_1.useMemo)(function () {
        return Object.keys(countries).map(function (key) { return ({
            value: key,
            label: (0, html_entities_1.decodeEntities)(countries[key]),
        }); });
    }, [countries]);
    return (<div className={(0, classnames_1.default)(className, 'wc-block-components-country-input')}>
			<combobox_1.default id={id} label={label} onChange={onChange} options={options} value={value} errorId={errorId} errorMessage={errorMessage} required={required} autoComplete={autoComplete}/>
			{autoComplete !== 'off' && (<input type="text" aria-hidden={true} autoComplete={autoComplete} value={value} onChange={function (event) {
                var textValue = event.target.value.toLocaleUpperCase();
                var foundOption = options.find(function (option) {
                    return (textValue.length !== 2 &&
                        option.label.toLocaleUpperCase() ===
                            textValue) ||
                        (textValue.length === 2 &&
                            option.value.toLocaleUpperCase() ===
                                textValue);
                });
                onChange(foundOption ? foundOption.value : '');
            }} style={{
                minHeight: '0',
                height: '0',
                border: '0',
                padding: '0',
                position: 'absolute',
            }} tabIndex={-1}/>)}
		</div>);
};
exports.default = CountryInput;
