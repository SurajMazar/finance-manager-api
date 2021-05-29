"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_middleware_1 = __importDefault(require("../../app/middleware/auth.middleware"));
var expenses_controller_1 = __importDefault(require("../../app/http/controllers/expenses.controller"));
var validator_1 = require("../../app/http/requests/validator");
var express_1 = __importDefault(require("express"));
var income_request_1 = require("../../app/http/requests/income.request");
var router = express_1.default.Router();
router.use(auth_middleware_1.default);
router.get('/', expenses_controller_1.default.index);
router.post('/store', income_request_1.incomeRequest(), validator_1.validate, expenses_controller_1.default.store);
router.put('/update/:id', income_request_1.incomeRequest(), validator_1.validate, expenses_controller_1.default.update);
exports.default = router;
