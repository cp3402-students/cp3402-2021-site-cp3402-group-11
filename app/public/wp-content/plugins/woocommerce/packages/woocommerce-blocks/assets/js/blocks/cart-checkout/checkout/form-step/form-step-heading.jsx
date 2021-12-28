"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var title_1 = require("@woocommerce/base-components/title");
/**
 * Step Heading Component
 */
var FormStepHeading = function (_a) {
    var children = _a.children, stepHeadingContent = _a.stepHeadingContent;
    return (<div className="wc-block-components-checkout-step__heading">
		<title_1.default aria-hidden="true" className="wc-block-components-checkout-step__title" headingLevel="2">
			{children}
		</title_1.default>
		{!!stepHeadingContent && (<span className="wc-block-components-checkout-step__heading-content">
				{stepHeadingContent}
			</span>)}
	</div>);
};
exports.default = FormStepHeading;
