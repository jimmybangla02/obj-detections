const Hapi = require("hapi");
const Inert = require("inert");
const Vision = require("vision");
const HapiSwagger = require("hapi-swagger");
const boom = require('boom');
const config = require("./core/config/config");
const Pack = require('./package');
config.load();


const server = new Hapi.Server();
server.connection({
    host: config.get('SERVER_HOST'), port: config.get('SERVER_PORT'), routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

const swaggerOptions = {
    info: {
        'title': 'API Documentation',
        'version': Pack.version,
    }
};


const plugins = [
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    },
    {
        register: require("./core/modules/object-detections/index")
    }
];


const options = {
    routes: {
        prefix: "/api"
    }
};

server.register(plugins, options, (err) => {
    if (err) throw err;
    server.start((err) => {
        if (err) throw err;
        logger.info("hapi server started " + server.info.uri);
    });
});

process.on('uncaughtException', function (err) {
    // logger.error('Caught exception: ', err.message);
});

process.on('exit', function (err) {
    // logger.error('exit exception: ', err);
});

server.ext('onPreResponse', (request, reply) => {
    // Transform only server errors
    if (request.response.isBoom && request.response.isServer) {
        reply(boomify(request.response))
    } else {
        // Otherwise just continue with previous response
        reply.continue()
    }
});


function boomify(error) {
    // I'm using globals for some things (like sequelize), you should replace it with your sequelize instance
    // if (error instanceof Core.db.sequelize.UniqueConstraintError) {
    if (error) {
        // logger.error('Error' + error);
        // logger.error('Error' + error.stack);
        let be = boom.create(400, 'The application has encountered an unknown error.');
        be.output.payload.validation = {
            source: 'payload'
        }
        return be
    } else {
        // If error wasn't found, return default boom internal error
        return Boom.internal('An internal server error', error)
    }
}
