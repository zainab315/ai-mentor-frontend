// 'use client'
// import React, { useRef, useEffect, useState } from "react";
// import "@tensorflow/tfjs-core";
// import "@tensorflow/tfjs-converter";
// import Webcam from "react-webcam";
// import { drawMesh } from "@/lib/faceModelData";
// import * as tf from "@tensorflow/tfjs";

// export const  FaceDetection=()=> {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [alertShown, setAlertShown] = useState(false);

//   const runFacemesh = async () => {
//     await tf.setBackend("webgl"); // or "cpu" if WebGL is not supported
//     await tf.ready(); // Ensure TensorFlow.js is initialized
  
//     const facemesh = await import("@tensorflow-models/face-landmarks-detection");
//     const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    
//     setInterval(() => {
//       detect(net);
//     }, 100);
//   };
  

//   const detect = async (net) => {
//     if (
//       webcamRef.current &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;

//       webcamRef.current.video.width = videoWidth;
//       webcamRef.current.video.height = videoHeight;
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;

//       const faces = await net.estimateFaces({ input: video });
//       if (faces.length > 0) {
//         checkEyeClosure(faces[0]); // Check for eye closure
//       }

//       const ctx = canvasRef.current.getContext("2d");
//       requestAnimationFrame(() => drawMesh(faces, ctx));
//     }
//   };

//   const checkEyeClosure = (face) => {
//     const keypoints = face.scaledMesh;

//     // Left eye (indexes from MediaPipe's face mesh model)
//     const leftUpper = keypoints[159]; // Upper eyelid
//     const leftLower = keypoints[145]; // Lower eyelid
//     const leftEyeDistance = Math.abs(leftUpper[1] - leftLower[1]);

//     // Right eye
//     const rightUpper = keypoints[386]; // Upper eyelid
//     const rightLower = keypoints[374]; // Lower eyelid
//     const rightEyeDistance = Math.abs(rightUpper[1] - rightLower[1]);

//     // Threshold for eye closure (adjust based on testing)
//     if (leftEyeDistance < 6 && rightEyeDistance < 6) {
//       if (!alertShown) {
//         setAlertShown(true);
//         alert("You closed your eyes!");
//         setTimeout(() => setAlertShown(false), 3000); // Reset alert after 3 seconds
//       }
//     }
//   };

//   useEffect(() => {
//     runFacemesh();
//   }, []);

//   return (
//     <>
//     <div className="w-full h-full"> 
//         <Webcam
//           ref={webcamRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 194,
//           }}
//         />
//         <canvas
//           ref={canvasRef}
//           style={{
//             position: "absolute",
//             marginLeft: "auto",
//             marginRight: "auto",
//             left: 0,
//             right: 0,
//             textAlign: "center",
//             zIndex: 9,
//             width: 640,
//             height: 194,
//           }}
//         />
//     </div> 
//     </>

//   );
// }



'use client'
import React, { useRef, useEffect, useState } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import Webcam from "react-webcam";
import { drawMesh } from "@/lib/faceModelData";

export const FaceDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  

  useEffect(() => {
    const loadModel = async () => {
      const facemesh = await import("@tensorflow-models/face-landmarks-detection");
      const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
      setModel(net);
    };

    loadModel();
  }, []);



  useEffect(() => {

    const detectFaces = async () => {
      if (
        model &&
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
    
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
    
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
        // Flip canvas horizontally
        ctx.save();
        ctx.translate(videoWidth, 0);
        ctx.scale(-1, 1);
    
        const faces = await model.estimateFaces({ input: video });
        drawMesh(faces, ctx);
    
        ctx.restore(); // Restore original state
      }
    };
    

    const interval = setInterval(() => {
      detectFaces();
    }, 100);

    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className="relative w-full h-full">
      <Webcam
        ref={webcamRef}
        className="absolute w-full h-full object-cover rounded-2xl"
        mirrored
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

// 'use client'
// import React, { useRef, useEffect, useState } from "react";
// import "@tensorflow/tfjs-core";
// import "@tensorflow/tfjs-converter";
// import "@tensorflow/tfjs-backend-webgl"; // Explicitly import WebGL backend
// import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js
// import Webcam from "react-webcam";
// import { drawMesh } from "@/lib/faceModelData";

// export const FaceDetection = () => {
//   const webcamRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [model, setModel] = useState(null);

//   useEffect(() => {
//     const loadModel = async () => {
//       await tf.setBackend("webgl"); // Set WebGL backend explicitly
//       await tf.ready(); // Ensure TensorFlow is ready

//       setTimeout(async () => {
//         const facemesh = await import("@tensorflow-models/face-landmarks-detection");
//         const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
//         setModel(net);
//       }, 100); // Delay to ensure TensorFlow backend is initialized properly
//     };

//     loadModel();
//   }, []);

//   const getEyeAspectRatio = (landmarks, eyeIndices) => {
//     const vertical1 = Math.hypot(
//       landmarks[eyeIndices[1]][0] - landmarks[eyeIndices[5]][0],
//       landmarks[eyeIndices[1]][1] - landmarks[eyeIndices[5]][1]
//     );
//     const vertical2 = Math.hypot(
//       landmarks[eyeIndices[2]][0] - landmarks[eyeIndices[4]][0],
//       landmarks[eyeIndices[2]][1] - landmarks[eyeIndices[4]][1]
//     );
//     const horizontal = Math.hypot(
//       landmarks[eyeIndices[0]][0] - landmarks[eyeIndices[3]][0],
//       landmarks[eyeIndices[0]][1] - landmarks[eyeIndices[3]][1]
//     );
//     return (vertical1 + vertical2) / (2.0 * horizontal);
//   };

//   useEffect(() => {
//     const detectFaces = async () => {
//       if (
//         model &&
//         webcamRef.current &&
//         webcamRef.current.video.readyState === 4
//       ) {
//         const video = webcamRef.current.video;
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;

//         webcamRef.current.video.width = videoWidth;
//         webcamRef.current.video.height = videoHeight;
//         canvasRef.current.width = videoWidth;
//         canvasRef.current.height = videoHeight;

//         const ctx = canvasRef.current.getContext("2d");
//         ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

//         const faces = await model.estimateFaces({ input: video });
//         drawMesh(faces, ctx);

//         if (faces.length > 0) {
//           const keypoints = faces[0].keypoints.map((kp) => [kp.x, kp.y]);
//           const leftEyeIndices = [33, 160, 158, 133, 153, 144];
//           const rightEyeIndices = [362, 385, 387, 263, 373, 380];
          
//           const leftEAR = getEyeAspectRatio(keypoints, leftEyeIndices);
//           const rightEAR = getEyeAspectRatio(keypoints, rightEyeIndices);
          
//           if (leftEAR < 0.2 && rightEAR < 0.2) {
//             alert("Eyes are closed!");
//           }
//         }
//       }
//     };

//     const interval = setInterval(() => {
//       detectFaces();
//     }, 200);

//     return () => clearInterval(interval);
//   }, [model]);

//   return (
//     <div className="relative w-full h-full">
//       <Webcam
//         ref={webcamRef}
//         className="absolute w-full h-full object-cover rounded-2xl"
//         mirrored
//       />
//       <canvas
//         ref={canvasRef}
//         className="absolute top-0 left-0 w-full h-full pointer-events-none"
//       />
//     </div>
//   );
// };
