'use strict'

const restify = require('restify'),
    db = require('./config/db.js'),
    router = require('./routes/routes_index');

const server = restify.createServer();

const PORT = 3000;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true,
    mapFiles: false,
    overrideParams: false
}));

// CORS handling
// Checks if the request is a preflight request
const isPreflight = (req) => {
    const isHttpOptions = (req.method || '').toUpperCase() === 'OPTIONS';
    const hasOriginHeader = req.header('origin');
    const hasRequestMethod = req.header('access-control-request-method');

    return isHttpOptions && hasOriginHeader && hasRequestMethod;
};

// handling CORS
server.pre((req, res, next) => {
    req.log.debug({ req }, 'REQUEST');

    // enable cors
    res.header('Access-Control-Allow-Origin', req.header('origin')); // use same origin as the request
    res.header('Access-Control-Allow-Credentials', 'true');
    if (isPreflight(req)) {
        req.log.info("PREFLIGHT request received");
        res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE');
        res.header('Allow', 'HEAD, GET, POST, PUT, DELETE');

        // authorization and x-requested with headers
        res.header("Access-Control-Allow-Headers", "Content-type,Authorization,X-Requested-With,Set-Cookie");
        res.send(204);
        return res.end();
    } else { // not a preflight request
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Set-Cookie");
    }
    return next();
});

router(server, db);

//drop and resync with { force: true }
db.sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log('Restify listening on port:', PORT);
    });
});
