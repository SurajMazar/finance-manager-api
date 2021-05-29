"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = exports.formatResponse = void 0;
var site_config_1 = require("../app/config/site.config");
var formatResponse = function (data, success) {
    return {
        success: success,
        data: data
    };
};
exports.formatResponse = formatResponse;
var paginate = function (name, page, total, data) {
    var responseData = {};
    responseData[name] = data;
    responseData['pageMeta'] = {
        perPage: site_config_1.ItemPerPage,
        total: total,
        currentPage: page ? page : 1
    };
    return responseData;
};
exports.paginate = paginate;
