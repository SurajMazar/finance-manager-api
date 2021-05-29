"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var category_controller_1 = require("../../app/http/controllers/category.controller");
var auth_middleware_1 = __importDefault(require("../../app/middleware/auth.middleware"));
var category_request_1 = require("../../app/http/requests/category.request");
var validator_1 = require("../../app/http/requests/validator");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var Catergory = new category_controller_1.CategoryController();
router.use(auth_middleware_1.default);
router.get('/', Catergory.index);
router.post('/store', category_request_1.categoryRequest(), validator_1.validate, Catergory.store);
router.put('/update/:id', category_request_1.categoryRequest(), validator_1.validate, Catergory.update);
exports.default = router;
