"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertResponseIsValid = exports.assertBatchResponseIsValid = void 0;
function assertBatchResponseIsValid(response) {
    if (typeof response === 'object' &&
        response !== null &&
        response.hasOwnProperty('responses')) {
        return;
    }
    throw new Error('Response not valid');
}
exports.assertBatchResponseIsValid = assertBatchResponseIsValid;
function assertResponseIsValid(response) {
    if (typeof response === 'object' &&
        response !== null &&
        response.hasOwnProperty('body') &&
        response.hasOwnProperty('headers')) {
        return;
    }
    throw new Error('Response not valid');
}
exports.assertResponseIsValid = assertResponseIsValid;
