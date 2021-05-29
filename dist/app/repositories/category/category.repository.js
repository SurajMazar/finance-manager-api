"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
var prisma_utils_1 = __importDefault(require("../../../utils/prisma.utils"));
var response_util_1 = require("../../../utils/response.util");
var site_config_1 = require("../../config/site.config");
var CategoryRepository = /** @class */ (function () {
    function CategoryRepository() {
    }
    //async list category with category
    CategoryRepository.prototype.index = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var page, keyword, type, categories, total, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        page = Number(req.query.page);
                        keyword = ((_a = (req.query.keyword)) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                        type = req.query.type;
                        return [4 /*yield*/, prisma_utils_1.default.category.findMany({
                                where: {
                                    parent_id: null,
                                    type: type,
                                    OR: {
                                        name: { contains: keyword },
                                    },
                                },
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                include: {
                                    Category: true
                                },
                                skip: page * site_config_1.ItemPerPage - site_config_1.ItemPerPage || 0,
                            })];
                    case 1:
                        categories = _b.sent();
                        return [4 /*yield*/, prisma_utils_1.default.category.count({
                                where: {
                                    parent_id: null,
                                }
                            })];
                    case 2:
                        total = _b.sent();
                        return [2 /*return*/, response_util_1.paginate('categories', page, total, categories)];
                    case 3:
                        e_1 = _b.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // store category
    CategoryRepository.prototype.store = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, description, type, parent_id, cat_id, category;
            return __generator(this, function (_b) {
                try {
                    _a = req.body, name_1 = _a.name, description = _a.description, type = _a.type, parent_id = _a.parent_id;
                    cat_id = Number(parent_id);
                    category = prisma_utils_1.default.category.create({
                        data: {
                            name: name_1,
                            description: description,
                            type: type,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            parent_id: cat_id ? cat_id : null,
                        }
                    });
                    return [2 /*return*/, category];
                }
                catch (e) {
                    console.log(e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    // update category
    CategoryRepository.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name_2, description, type, parent_id, cat_id, category, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = Number(req.params.id);
                        _a = req.body, name_2 = _a.name, description = _a.description, type = _a.type, parent_id = _a.parent_id;
                        cat_id = Number(parent_id);
                        return [4 /*yield*/, prisma_utils_1.default.category.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    name: name_2,
                                    description: description,
                                    type: type,
                                    updatedAt: new Date(),
                                    parent_id: cat_id ? cat_id : null,
                                }
                            })];
                    case 1:
                        category = _b.sent();
                        return [2 /*return*/, category];
                    case 2:
                        e_2 = _b.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryRepository;
}());
exports.CategoryRepository = CategoryRepository;
