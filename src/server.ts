import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';

const app = express();
app.set("port", 8004);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const logErrors = (err: Error, _req: express.Request, _res: express.Response, next: any) => {
    next(err);
}
const clientErrorHandler = (err: Error, req: express.Request, res: express.Response, next: any) => {
    if (req.xhr) {
        res.status(500).send({ error: 'XHR failure' })
    } else {
        next(err)
    }
}

const errorHandler = (err: Error, _req: express.Request, res: express.Response, _next: any) => {
    res.status(500);
    res.render('error', { error: err });
}


app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

var healthRouter = express.Router();

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

app.use('/', express.static('public', options));
app.get('/', function(_, res){
    res.redirect('/seamen.html');
});

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d ",
        app.get("port")
    );
    console.log("  Press CTRL-C to stop\n");
});




export default server;
