"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const express_1 = tslib_1.__importDefault(require("express"));
const app = express_1.default();
app.set("port", 8004);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const logErrors = (err, _req, _res, next) => {
    next(err);
};
const clientErrorHandler = (err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'XHR failure' });
    }
    else {
        next(err);
    }
};
const errorHandler = (err, _req, res, _next) => {
    res.status(500);
    res.render('error', { error: err });
};
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
var healthRouter = express_1.default.Router();
healthRouter.get('/', (_req, res) => {
    res.status(200);
    res.contentType("json");
    res.send({ "status": "healthy" });
    res.end();
});
app.use('/health', healthRouter);
var options = {
    index: "seamen.html"
};
app.use('/', express_1.default.static('public', options));
app.get('/', function (_, res) {
    res.redirect('/seamen.html');
});
const server = app.listen(app.get("port"), () => {
    console.log("  App is running at http://localhost:%d ", app.get("port"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map