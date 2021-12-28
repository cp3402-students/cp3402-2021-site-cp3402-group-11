"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controls = exports.apiFetchWithHeaders = void 0;
/**
 * External dependencies
 */
var i18n_1 = require("@wordpress/i18n");
var api_fetch_1 = require("@wordpress/api-fetch");
var dataloader_1 = require("dataloader");
var settings_1 = require("@woocommerce/settings");
/**
 * Internal dependencies
 */
var types_1 = require("./types");
/**
 * Dispatched a control action for triggering an api fetch call with no parsing.
 * Typically this would be used in scenarios where headers are needed.
 *
 * @param {APIFetchOptions} options The options for the API request.
 */
var apiFetchWithHeaders = function (options) {
    return ({
        type: 'API_FETCH_WITH_HEADERS',
        options: options,
    });
};
exports.apiFetchWithHeaders = apiFetchWithHeaders;
var EMPTY_OBJECT = {};
/**
 * Error thrown when JSON cannot be parsed.
 */
var invalidJsonError = {
    code: 'invalid_json',
    message: (0, i18n_1.__)('The response is not a valid JSON response.', 'woo-gutenberg-products-block'),
};
var setNonceOnFetch = function (headers) {
    if (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore -- this does exist because it's monkey patched in
    // middleware/store-api-nonce.
    api_fetch_1.default.setNonce &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- this does exist because it's monkey patched in
        // middleware/store-api-nonce.
        typeof api_fetch_1.default.setNonce === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore -- this does exist because it's monkey patched in
        // middleware/store-api-nonce.
        api_fetch_1.default.setNonce(headers);
    }
    else {
        // eslint-disable-next-line no-console
        console.error('The monkey patched function on APIFetch, "setNonce", is not present, likely another plugin or some other code has removed this augmentation');
    }
};
/**
 * Trigger a fetch from the API using the batch endpoint.
 */
var triggerBatchFetch = function (keys) {
    return (0, api_fetch_1.default)({
        path: "/wc/store/batch",
        method: 'POST',
        data: {
            requests: keys.map(function (request) {
                return __assign(__assign({}, request), { body: request === null || request === void 0 ? void 0 : request.data });
            }),
        },
    }).then(function (response) {
        (0, types_1.assertBatchResponseIsValid)(response);
        return keys.map(function (key, index) {
            return response.responses[index] || EMPTY_OBJECT;
        });
    });
};
/**
 * In ms, how long we should wait for requests to batch.
 *
 * DataLoader collects all requests over this window of time (and as a consequence, adds this amount of latency).
 */
var triggerBatchFetchDelay = 300;
/**
 * DataLoader instance for triggerBatchFetch.
 */
var triggerBatchFetchLoader = new dataloader_1.default(triggerBatchFetch, {
    batchScheduleFn: function (callback) {
        return setTimeout(callback, triggerBatchFetchDelay);
    },
    cache: false,
    maxBatchSize: 25,
});
/**
 * Trigger a fetch from the API using the batch endpoint.
 *
 * @param {APIFetchOptions} request Request object containing API request.
 */
var batchFetch = function (request) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, triggerBatchFetchLoader.load(request)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/**
 * Default export for registering the controls with the store.
 *
 * @return {Object} An object with the controls to register with the store on
 *                  the controls property of the registration object.
 */
exports.controls = {
    API_FETCH_WITH_HEADERS: function (_a) {
        var options = _a.options;
        return new Promise(function (resolve, reject) {
            // GET Requests cannot be batched.
            if (!options.method ||
                options.method === 'GET' ||
                (0, settings_1.isWpVersion)('5.6', '<')) {
                // Parse is disabled here to avoid returning just the body--we also need headers.
                (0, api_fetch_1.default)(__assign(__assign({}, options), { parse: false }))
                    .then(function (fetchResponse) {
                    fetchResponse
                        .json()
                        .then(function (response) {
                        resolve({
                            response: response,
                            headers: fetchResponse.headers,
                        });
                        setNonceOnFetch(fetchResponse.headers);
                    })
                        .catch(function () {
                        reject(invalidJsonError);
                    });
                })
                    .catch(function (errorResponse) {
                    setNonceOnFetch(errorResponse.headers);
                    if (typeof errorResponse.json === 'function') {
                        // Parse error response before rejecting it.
                        errorResponse
                            .json()
                            .then(function (error) {
                            reject(error);
                        })
                            .catch(function () {
                            reject(invalidJsonError);
                        });
                    }
                    else {
                        reject(errorResponse.message);
                    }
                });
            }
            else {
                batchFetch(options)
                    .then(function (response) {
                    (0, types_1.assertResponseIsValid)(response);
                    if (response.status >= 200 && response.status < 300) {
                        resolve({
                            response: response.body,
                            headers: response.headers,
                        });
                        setNonceOnFetch(response.headers);
                    }
                    // Status code indicates error.
                    throw response;
                })
                    .catch(function (errorResponse) {
                    if (errorResponse.headers) {
                        setNonceOnFetch(errorResponse.headers);
                    }
                    if (errorResponse.body) {
                        reject(errorResponse.body);
                    }
                    else {
                        reject();
                    }
                });
            }
        });
    },
};
