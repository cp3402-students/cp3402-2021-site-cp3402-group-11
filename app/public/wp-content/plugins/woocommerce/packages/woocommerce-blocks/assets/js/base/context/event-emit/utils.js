"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObserversByPriority = void 0;
var getObserversByPriority = function (observers, eventType) {
    return observers[eventType]
        ? Array.from(observers[eventType].values()).sort(function (a, b) {
            return a.priority - b.priority;
        })
        : [];
};
exports.getObserversByPriority = getObserversByPriority;
