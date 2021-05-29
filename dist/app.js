"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var site_config_1 = require("./app/config/site.config");
var multer_utils_1 = require("./utils/multer.utils");
var routes_1 = __importDefault(require("./routes/routes"));
var cors_1 = __importDefault(require("cors"));
var response_util_1 = require("./utils/response.util");
var app = express_1.default();
// json parser for body
app.use(express_1.default.static('./public'));
app.use(express_1.default.json());
app.use(multer_utils_1.instance.any());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.use(routes_1.default);
// for 404 api 
app.get('/api/*', function (req, res) {
    res.status(404).json(response_util_1.formatResponse({
        message: "404 error!! The requested route doesnt exists."
    }, false));
});
// end 404 api route
app.listen(site_config_1.port);
