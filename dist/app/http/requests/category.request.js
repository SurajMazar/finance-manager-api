"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRequest = void 0;
var express_validator_1 = require("express-validator");
var categoryRequest = function () {
    return [
        express_validator_1.check('name').notEmpty().withMessage('Name is required'),
        express_validator_1.check('type').notEmpty().withMessage('Type is required'),
    ];
};
exports.categoryRequest = categoryRequest;
