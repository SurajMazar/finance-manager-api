"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeRequest = void 0;
var express_validator_1 = require("express-validator");
var incomeRequest = function () {
    return [
        express_validator_1.check('title').notEmpty().withMessage('Title is required'),
        express_validator_1.check('amount').notEmpty().withMessage('Amount is required'),
        express_validator_1.check('cat_id').notEmpty().withMessage('Category is required'),
    ];
};
exports.incomeRequest = incomeRequest;
