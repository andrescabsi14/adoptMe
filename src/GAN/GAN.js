// import React from "react";
// import * as tf from "@tensorflow/tfjs";

// import { IMAGE_H, IMAGE_W, MnistData } from "./data/data";
// import * as ui from "./ui";

// class GAN extends React.Component {
//   state = {
//     prediction: 0
//   };

//   data = 0;

//   componentDidMount() {
//     this.createConvModel();
//   }

//   createConvModel() {
//     const model = tf.sequential();

//     // Input: 28x28 pixels black and white images.
//     model.add(
//       tf.layers.conv2d({
//         inputShape: [IMAGE_H, IMAGE_W, 1],
//         kernelSize: 3,
//         filters: 16,
//         activation: "relu"
//       })
//     );
//     model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

//     model.add(
//       tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: "relu" })
//     );
//     model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));

//     model.add(
//       tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: "relu" })
//     );

//     model.add(tf.layers.flatten({}));

//     model.add(tf.layers.dense({ units: 64, activation: "relu" }));

//     // Fully dense layer with 10 output units, one for each
//     // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
//     model.add(tf.layers.dense({ units: 10, activation: "softmax" }));

//     return model;
//   }

//   createDenseModel() {
//     const model = tf.sequential();
//     model.add(tf.layers.flatten({ inputShape: [IMAGE_H, IMAGE_W, 1] }));
//     model.add(tf.layers.dense({ units: 42, activation: "relu" }));
//     model.add(tf.layers.dense({ units: 10, activation: "softmax" }));
//     return model;
//   }

//   //Compile and train the given model.
//   async train(model) {
//     ui.logStatus("Training model...");

//     const LEARNING_RATE = 0.01;
//     const optimizer = "rmsprop";

//     model.compile({
//       optimizer,
//       loss: "categoricalCrossentropy",
//       metrics: ["accuracy"]
//     });

//     const batchSize = 64;
//     const validationSplit = 0.15; // Leave out the last 15% of the training data for validation, to monitor overfitting during training.

//     const trainEpochs = ui.getTrainEpochs(); // Get number of training epochs from the UI.

//     let trainBatchCount = 0; // We'll keep a buffer of loss and accuracy values over time.

//     const trainData = this.data.getTrainData();
//     const testData = this.data.getTestData();

//     const totalNumBatches =
//       Math.ceil((trainData.xs.shape[0] * (1 - validationSplit)) / batchSize) *
//       trainEpochs;

//     // During the long-running fit() call for model training, we include
//     // callbacks, so that we can plot the loss and accuracy values in the page
//     // as the training progresses.
//     let valAcc;
//     await model.fit(trainData.xs, trainData.labels, {
//       batchSize,
//       validationSplit,
//       epochs: trainEpochs,
//       callbacks: {
//         onBatchEnd: async (batch, logs) => {
//           trainBatchCount++;
//           ui.logStatus(
//             `Training... (` +
//               `${((trainBatchCount / totalNumBatches) * 100).toFixed(1)}%` +
//               ` complete). To stop training, refresh or close page.`
//           );
//           ui.plotLoss(trainBatchCount, logs.loss, "train");
//           ui.plotAccuracy(trainBatchCount, logs.acc, "train");
//           await tf.nextFrame();
//         },
//         onEpochEnd: async (epoch, logs) => {
//           valAcc = logs.val_acc;
//           ui.plotLoss(trainBatchCount, logs.val_loss, "validation");
//           ui.plotAccuracy(trainBatchCount, logs.val_acc, "validation");
//           await tf.nextFrame();
//         }
//       }
//     });

//     const testResult = model.evaluate(testData.xs, testData.labels);
//     const testAccPercent = testResult[1].dataSync()[0] * 100;
//     const finalValAccPercent = valAcc * 100;
//     ui.logStatus(
//       `Final validation accuracy: ${finalValAccPercent.toFixed(1)}%; ` +
//         `Final test accuracy: ${testAccPercent.toFixed(1)}%`
//     );
//   }

//   render() {
//     return (
//       <section>
//         <div>This is a GAN</div>
//         <div>Prediction:</div>
//         <button onClick={this.trainModel}>Train</button>
//         <div>{this.state.prediction}</div>
//       </section>
//     );
//   }
// }

// export default GAN;
