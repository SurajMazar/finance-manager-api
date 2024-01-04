"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth_middleware_1 = require("../app/middleware/auth.middleware");
var getAuthUser = function (req) {
    var token = auth_middleware_1.getToken(req);
    var user = jsonwebtoken_1.default.decode(token);
    return user.user;
};
exports.getAuthUser = getAuthUser;
