const tf = require('@tensorflow/tfjs-node');
let model, image;
const path = require('path');
const model_path = path.resolve(__dirname, '../../../../object_detection/model/new_object_detection_1');
const labels = require('../../../../object_detection/model/new_object_detection_1/assets/labels.json');
const { createCanvas, Image } = require('canvas');

class ObjectDetectionHandler {
    static getObjects(request, reply) {
        tf.node.loadSavedModel(model_path, ['serve'], 'serving_default')
            .then(res => {
                model = res; // LP: loaded TFSavedModel
                // console.log(model);
                return tf.node.getMetaGraphsFromSavedModel(model_path);
            })
            .then(modelInfo => {
                // console.log(modelInfo);

                const inputImage = path.resolve(__dirname, '../../../../object_detection/image.jpeg');
                image = require('fs').readFileSync(inputImage);
                const uint8array = new Uint8Array(image);

                const arrayBuffer = new Uint8Array(request.payload.split(',')[1]);
                console.log('arrayBuffer', arrayBuffer)

                // Decode the image into a tensor.
                return tf.node.decodeImage(uint8array);
            })
            .then(imageTensor => {
                const input = imageTensor.expandDims(0);
                // Feed the image tensor into the model for inference.
                const startTime = tf.util.now();
                let outputTensor = model.predict({ 'x': input });
                // Parse the model output to get meaningful result(get detection class and
                // object location).
                const scores = outputTensor['detection_scores'].arraySync();
                const boxes = outputTensor['detection_boxes'].arraySync();
                const names = outputTensor['detection_classes'].arraySync();

                const endTime = tf.util.now();
                outputTensor['detection_scores'].dispose();
                outputTensor['detection_boxes'].dispose();
                outputTensor['detection_classes'].dispose();
                outputTensor['num_detections'].dispose();
                const detectedBoxes = [];
                const detectedNames = [];
                for (let i = 0; i < scores[0].length; i++) {
                    if (scores[0][i] > 0.3) {
                        detectedBoxes.push(boxes[0][i]);
                        detectedNames.push(labels[names[0][i]]);
                    }
                }
                const res = {
                    boxes: detectedBoxes,
                    names: detectedNames,
                    inferenceTime: endTime - startTime
                };
                // console.log(res);

                // create canvas and context
                const width=1024
                const height=768
                const canvas = createCanvas(width, height);
                const context = canvas.getContext('2d');

                // create image from buffer
                const img = new Image()
                img.onload = () => {
                    // draw image in context
                    context.drawImage(img, 0, 0, width, height);
                    // draw boxes from model's detection boxes
                    for (let i = 0; i < res.boxes.length; i++) {
                        const box = res.boxes[i];
                        context.fillStyle = 'rgba(255,255,255,0.2)';
                        context.strokeStyle = 'Yellow';
                        context.fillRect(box[1] * width, box[0] * height, width * (box[3] - box[1]),
                            height * (box[2] - box[0]));
                        context.font = '50px Arial';
                        context.fillStyle = 'White';
                        context.fillText(res.names[i], box[1] * width, box[0] * height, box[0] * height);
                        context.lineWidth = 8;
                        context.strokeRect(box[1] * width, box[0] * height, width * (box[3] - box[1]),
                            height * (box[2] - box[0]));
                    }

                    const streamUrl = canvas.toDataURL();
                    const returnObj = {
                        path: streamUrl
                    }
                    reply(returnObj)


                    // Disable 2x2 chromaSubsampling for deeper colors and use a higher quality
                    const stream = canvas.createJPEGStream({
                        quality: 0.95,
                        chromaSubsampling: false
                    });
                    const outputImage = path.resolve(__dirname, '../../../../object_detection/image_test.jpeg');
                    const out =  require('fs').createWriteStream(outputImage)
                    stream.pipe(out)
                    out.on('finish', () =>  console.log('The JPEG file was created.'))

                }
                img.onerror = err => { throw err }
                img.src = image; // LP: load from image buffer
            })
            .catch(error => {
                console.error(error)
            })
    }
}

module.exports = ObjectDetectionHandler;
