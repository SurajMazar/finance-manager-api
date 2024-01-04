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
exports.ExpensesRepository = void 0;
var common_utils_1 = require("../../../utils/common.utils");
var jwt_utils_1 = require("../../../utils/jwt.utils");
var prisma_utils_1 = __importDefault(require("../../../utils/prisma.utils"));
var moment_1 = __importDefault(require("moment/moment"));
var ExpensesRepository = /** @class */ (function () {
    function ExpensesRepository() {
    }
    ExpensesRepository.prototype.index = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var month, keyword, category, cat_1, user, incomes, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        month = req.query.month ? new Date(req.query.month) : new Date();
                        keyword = ((_a = (req.query.keyword)) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                        category = req.query.category || undefined;
                        cat_1 = [];
                        if (category) {
                            if (Array.isArray(category)) {
                                category.forEach(function (c) {
                                    if (Array.isArray(cat_1)) {
                                        cat_1.push(Number(c));
                                    }
                                });
                            }
                            else {
                                cat_1 = Number(category);
                            }
                        }
                        else {
                            cat_1 = undefined;
                        }
                        user = jwt_utils_1.getAuthUser(req);
                        return [4 /*yield*/, prisma_utils_1.default.expense.findMany({
                                where: {
                                    userId: user.id,
                                    OR: {
                                        title: { contains: keyword },
                                    },
                                    cat_id: {
                                        in: cat_1
                                    },
                                    createdAt: {
                                        gt: new Date(month.getFullYear(), month.getMonth(), 1),
                                        lt: new Date(month.getFullYear(), month.getMonth() + 1, 1)
                                    }
                                },
                                orderBy: {
                                    createdAt: 'desc'
                                },
                                include: {
                                    category: true
                                },
                                // skip:page * ItemPerPage - ItemPerPage || 0,
                            })];
                    case 1:
                        incomes = _b.sent();
                        return [2 /*return*/, incomes];
                    case 2:
                        e_1 = _b.sent();
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesRepository.prototype.store = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, amount, cat_id, created_at, user, expense, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, amount = _a.amount, cat_id = _a.cat_id, created_at = _a.created_at;
                        user = jwt_utils_1.getAuthUser(req);
                        return [4 /*yield*/, prisma_utils_1.default.expense.create({
                                data: {
                                    title: title,
                                    amount: parseFloat(amount),
                                    createdAt: moment_1.default(created_at ? created_at : new Date()).toDate(),
                                    updatedAt: new Date(),
                                    userId: user.id,
                                    cat_id: Number(cat_id),
                                },
                                include: {
                                    category: true
                                }
                            })];
                    case 1:
                        expense = _b.sent();
                        return [2 /*return*/, expense];
                    case 2:
                        e_2 = _b.sent();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesRepository.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, amount, cat_id, id, expense, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, amount = _a.amount, cat_id = _a.cat_id;
                        id = Number(req.params.id);
                        return [4 /*yield*/, prisma_utils_1.default.expense.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    title: title,
                                    amount: parseFloat(amount),
                                    cat_id: Number(cat_id),
                                },
                                include: {
                                    category: true
                                }
                            })];
                    case 1:
                        expense = _b.sent();
                        return [2 /*return*/, expense];
                    case 2:
                        e_3 = _b.sent();
                        console.log(e_3);
                        throw e_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesRepository.prototype.getByDate = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var date, user, currentDate, nextDate, expenses, totalExpenses, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        date = req.query.date || null;
                        user = jwt_utils_1.getAuthUser(req);
                        currentDate = date ? new Date(date) : new Date(common_utils_1.formatDate());
                        nextDate = new Date(currentDate.getTime() + 60 * 60 * 24 * 1000);
                        return [4 /*yield*/, prisma_utils_1.default.expense.findMany({
                                where: {
                                    createdAt: {
                                        gte: currentDate,
                                        lt: nextDate,
                                    },
                                    userId: user.id,
                                },
                                include: {
                                    category: true
                                }
                            })];
                    case 1:
                        expenses = _a.sent();
                        return [4 /*yield*/, this.getTotalExpense(req, date)];
                    case 2:
                        totalExpenses = _a.sent();
                        return [2 /*return*/, { expenses: expenses, total_expense: totalExpenses }];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ExpensesRepository.prototype.getTotalExpense = function (req, date) {
        return __awaiter(this, void 0, void 0, function () {
            var user, currentDate, expenses, total_1, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user = jwt_utils_1.getAuthUser(req);
                        currentDate = moment_1.default(date || new Date()).startOf('day').toDate();
                        return [4 /*yield*/, prisma_utils_1.default.expense.findMany({
                                where: {
                                    userId: user.id,
                                    createdAt: {
                                        lt: currentDate,
                                    }
                                },
                                include: {
                                    category: true
                                }
                            })];
                    case 1:
                        expenses = _a.sent();
                        total_1 = 0;
                        expenses.forEach(function (e) {
                            total_1 = total_1 + e.amount || 0;
                        });
                        return [2 /*return*/, total_1];
                    case 2:
                        e_5 = _a.sent();
                        throw e_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ExpensesRepository;
}());
exports.ExpensesRepository = ExpensesRepository;
