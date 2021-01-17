const ObjectDetectionHandler = require("./handler/object-detection-handler");

module.exports = [
    {
        method: 'POST',
        path: '/object-detection/',
        config: {
            handler: ObjectDetectionHandler.getObjects,
            description: 'Get object detection data',
            notes: 'Returns object detection details',
            tags: ['api']
        }

    }
];
