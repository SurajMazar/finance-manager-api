"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
var express_validator_1 = require("express-validator");
var response_util_1 = require("../../../utils/response.util");
var validate = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    var formattedError = [];
    errors.array().map(function (err) {
        var _a;
        formattedError.push((_a = {},
            _a[err.param] = err.msg,
            _a));
    });
    return res.status(422).json(response_util_1.formatResponse({
        errors: formattedError
    }, false));
};
exports.validate = validate;
