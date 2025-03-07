"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorazedError = exports.NotFoundError = exports.BadResquestError = exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
;
class BadResquestError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}
exports.BadResquestError = BadResquestError;
;
class NotFoundError extends ApiError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
;
class UnauthorazedError extends ApiError {
    constructor(message) {
        super(message, 401);
    }
}
exports.UnauthorazedError = UnauthorazedError;
;
//# sourceMappingURL=apiErrors.js.map