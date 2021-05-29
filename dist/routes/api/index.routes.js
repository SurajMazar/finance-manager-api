"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_routes_1 = __importDefault(require("./auth.routes"));
var category_routes_1 = __importDefault(require("./category.routes"));
var income_routes_1 = __importDefault(require("./income.routes"));
var expense_routes_1 = __importDefault(require("./expense.routes"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/category', category_routes_1.default);
router.use('/income', income_routes_1.default);
router.use('/expense', expense_routes_1.default);
exports.default = router;
