"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OptionLayout = function (_a) {
    var label = _a.label, secondaryLabel = _a.secondaryLabel, description = _a.description, secondaryDescription = _a.secondaryDescription, id = _a.id;
    return (<div className="wc-block-components-radio-control__option-layout">
			<div className="wc-block-components-radio-control__label-group">
				{label && (<span id={id && id + "__label"} className="wc-block-components-radio-control__label">
						{label}
					</span>)}
				{secondaryLabel && (<span id={id && id + "__secondary-label"} className="wc-block-components-radio-control__secondary-label">
						{secondaryLabel}
					</span>)}
			</div>
			<div className="wc-block-components-radio-control__description-group">
				{description && (<span id={id && id + "__description"} className="wc-block-components-radio-control__description">
						{description}
					</span>)}
				{secondaryDescription && (<span id={id && id + "__secondary-description"} className="wc-block-components-radio-control__secondary-description">
						{secondaryDescription}
					</span>)}
			</div>
		</div>);
};
exports.default = OptionLayout;
