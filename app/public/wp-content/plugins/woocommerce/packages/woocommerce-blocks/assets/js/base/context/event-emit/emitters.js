"use strict";
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
exports.emitEventWithAbort = exports.emitEvent = void 0;
/**
 * Internal dependencies
 */
var utils_1 = require("./utils");
var use_emit_response_1 = require("../hooks/use-emit-response");
/**
 * Emits events on registered observers for the provided type and passes along
 * the provided data.
 *
 * This event emitter will silently catch promise errors, but doesn't care
 * otherwise if any errors are caused by observers. So events that do care
 * should use `emitEventWithAbort` instead.
 *
 * @param {Object} observers The registered observers to omit to.
 * @param {string} eventType The event type being emitted.
 * @param {*}      data      Data passed along to the observer when it is invoked.
 *
 * @return {Promise} A promise that resolves to true after all observers have executed.
 */
var emitEvent = function (observers, eventType, data) { return __awaiter(void 0, void 0, void 0, function () {
    var observersByType, observerResponses, _i, observersByType_1, observer, observerResponse, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                observersByType = (0, utils_1.getObserversByPriority)(observers, eventType);
                observerResponses = [];
                _i = 0, observersByType_1 = observersByType;
                _a.label = 1;
            case 1:
                if (!(_i < observersByType_1.length)) return [3 /*break*/, 6];
                observer = observersByType_1[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Promise.resolve(observer.callback(data))];
            case 3:
                observerResponse = _a.sent();
                if (typeof observerResponse === 'object') {
                    observerResponses.push(observerResponse);
                }
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                // we don't care about errors blocking execution, but will console.error for troubleshooting.
                // eslint-disable-next-line no-console
                console.error(e_1);
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, observerResponses.length ? observerResponses : true];
        }
    });
}); };
exports.emitEvent = emitEvent;
/**
 * Emits events on registered observers for the provided type and passes along
 * the provided data. This event emitter will abort if an observer throws an
 * error or if the response includes an object with an error type property.
 *
 * Any successful observer responses before abort will be included in the returned package.
 *
 * @param {Object} observers The registered observers to omit to.
 * @param {string} eventType The event type being emitted.
 * @param {*}      data      Data passed along to the observer when it is invoked.
 *
 * @return {Promise} Returns a promise that resolves to either boolean, or an array of responses
 *                   from registered observers that were invoked up to the point of an error.
 */
var emitEventWithAbort = function (observers, eventType, data) { return __awaiter(void 0, void 0, void 0, function () {
    var observerResponses, observersByType, _i, observersByType_2, observer, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                observerResponses = [];
                observersByType = (0, utils_1.getObserversByPriority)(observers, eventType);
                _i = 0, observersByType_2 = observersByType;
                _a.label = 1;
            case 1:
                if (!(_i < observersByType_2.length)) return [3 /*break*/, 6];
                observer = observersByType_2[_i];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, Promise.resolve(observer.callback(data))];
            case 3:
                response = _a.sent();
                if (typeof response !== 'object' || response === null) {
                    return [3 /*break*/, 5];
                }
                if (!response.hasOwnProperty('type')) {
                    throw new Error('Returned objects from event emitter observers must return an object with a type property');
                }
                if ((0, use_emit_response_1.isErrorResponse)(response) || (0, use_emit_response_1.isFailResponse)(response)) {
                    observerResponses.push(response);
                    // early abort.
                    return [2 /*return*/, observerResponses];
                }
                // all potential abort conditions have been considered push the
                // response to the array.
                observerResponses.push(response);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                // We don't handle thrown errors but just console.log for troubleshooting.
                // eslint-disable-next-line no-console
                console.error(e_2);
                observerResponses.push({ type: 'error' });
                return [2 /*return*/, observerResponses];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, observerResponses];
        }
    });
}); };
exports.emitEventWithAbort = emitEventWithAbort;
