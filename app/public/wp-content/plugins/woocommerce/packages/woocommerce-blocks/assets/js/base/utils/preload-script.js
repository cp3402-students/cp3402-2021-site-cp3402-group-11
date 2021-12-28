"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Appends a `<link>` tag to the document head to preload a script based on the
 * src and handle parameters.
 */
var preloadScript = function (_a) {
    var handle = _a.handle, src = _a.src, version = _a.version;
    var handleScriptElements = document.querySelectorAll("#" + handle + "-js, #" + handle + "-js-prefetch");
    if (handleScriptElements.length === 0) {
        var prefetchLink = document.createElement('link');
        prefetchLink.href = version ? src + "?ver=" + version : src;
        prefetchLink.rel = 'preload';
        prefetchLink.as = 'script';
        prefetchLink.id = handle + "-js-prefetch";
        document.head.appendChild(prefetchLink);
    }
};
exports.default = preloadScript;
