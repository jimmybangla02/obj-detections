const routes = require('./routes');

module.exports.register = (server, options, next) => {
    server.route(routes);
    next();
};

module.exports.register.attributes = {
    name: "objects detections",
    version: "1.0.0"
};
