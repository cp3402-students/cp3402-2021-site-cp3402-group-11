"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
var types_1 = require("@woocommerce/types");
/**
 * In WP, registered scripts are loaded into the page with an element like this:
 * `<script src='...' id='[SCRIPT_ID]'></script>`
 * This function checks whether an element matching that selector exists.
 * Useful to know if a script has already been appended to the page.
 */
var isScriptTagInDOM = function (scriptId) {
    var scriptElements = document.querySelectorAll("script#" + scriptId);
    return scriptElements.length > 0;
};
/**
 * Appends a script element to the document body if a script with the same id
 * doesn't exist.
 */
var appendScript = function (attributes) {
    // Abort if id is not valid or a script with the same id exists.
    if (!(0, types_1.isString)(attributes.id) || isScriptTagInDOM(attributes.id)) {
        return;
    }
    var scriptElement = document.createElement('script');
    for (var attr in attributes) {
        // We could technically be iterating over inherited members here, so
        // if this is the case we should skip it.
        if (!attributes.hasOwnProperty(attr)) {
            continue;
        }
        var key = attr;
        // Skip the keys that aren't strings, because TS can't be sure which
        // key in the scriptElement object we're assigning to.
        if (key === 'onload' || key === 'onerror') {
            continue;
        }
        // This assignment stops TS complaining about the value maybe being
        // undefined following the isString check below.
        var value = attributes[key];
        if ((0, types_1.isString)(value)) {
            scriptElement[key] = value;
        }
    }
    // Now that we've assigned all the strings, we can explicitly assign to the
    // function keys.
    if (typeof attributes.onload === 'function') {
        scriptElement.onload = attributes.onload;
    }
    if (typeof attributes.onerror === 'function') {
        scriptElement.onerror = attributes.onerror;
    }
    document.body.appendChild(scriptElement);
};
/**
 * Appends a `<script>` tag to the document body based on the src and handle
 * parameters. In addition, it appends additional script tags to load the code
 * needed for translations and any before and after inline scripts. See these
 * documentation pages for more information:
 *
 * https://developer.wordpress.org/reference/functions/wp_set_script_translations/
 * https://developer.wordpress.org/reference/functions/wp_add_inline_script/
 */
var lazyLoadScript = function (_a) {
    var handle = _a.handle, src = _a.src, version = _a.version, after = _a.after, before = _a.before, translations = _a.translations;
    return new Promise(function (resolve, reject) {
        if (isScriptTagInDOM(handle + "-js")) {
            resolve();
        }
        if (translations) {
            appendScript({
                id: handle + "-js-translations",
                innerHTML: translations,
            });
        }
        if (before) {
            appendScript({
                id: handle + "-js-before",
                innerHTML: before,
            });
        }
        var onload = function () {
            if (after) {
                appendScript({
                    id: handle + "-js-after",
                    innerHTML: after,
                });
            }
            resolve();
        };
        appendScript({
            id: handle + "-js",
            onerror: reject,
            onload: onload,
            src: version ? src + "?ver=" + version : src,
        });
    });
};
exports.default = lazyLoadScript;
