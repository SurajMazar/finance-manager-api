"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_controller_1 = require("../../app/http/controllers/auth.controller");
var auth_middleware_1 = __importDefault(require("../../app/middleware/auth.middleware"));
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var Auth = new auth_controller_1.AuthController();
router.post('/login', Auth.login);
router.get('/profile', auth_middleware_1.default, Auth.profile);
exports.default = router;
