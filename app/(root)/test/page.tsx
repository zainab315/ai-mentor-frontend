

// 'use client';

// import { useState } from 'react';

// export default function Home() {
//   const [text, setText] = useState<string>('');
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);

//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(e.target.value);
//   };

//   //workig
//   // const handleGenerateSpeech = async () => {
//   //   try {
//   //     // Send the text to OpenAI's TTS API directly from the frontend
//   //     const response = await fetch('https://api.openai.com/v1/audio/speech', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,  // Make sure to replace with your OpenAI API Key
//   //       },
//   //       body: JSON.stringify({
//   //         model: "gpt-4o-mini-tts",  // Use the OpenAI TTS model
//   //         voice: "coral",            // Choose the voice (replace with desired voice)
//   //         input: text,               // The input text you want to convert to speech
//   //         instructions: "Speak in a cheerful and positive tone.",  // Optional instructions for tone
//   //         response_format: "wav",    // Use wav or pcm for real-time audio
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Failed to generate speech');
//   //     }

//   //     // Create a readable stream from the response body (this is the chunked data)
//   //     const audioStream = response.body;
//   //     const reader = audioStream.getReader();
//   //     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   //     const audioGainNode = audioContext.createGain();
//   //     audioGainNode.connect(audioContext.destination);

//   //     let audioChunks: Uint8Array[] = [];
//   //     let audioSourceNode: AudioBufferSourceNode | null = null;
//   //     let isFirstChunk = true;

//   //     const processStream = async () => {
//   //       let result;
        
//   //       // Read and process chunks until the entire stream is done
//   //       while (!(result = await reader.read()).done) {
//   //         audioChunks.push(result.value);  // Append each chunk to the audioChunks array

//   //         // Concatenate the chunks into a single Uint8Array
//   //         const audioData = new Uint8Array(audioChunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));
          
//   //         try {
//   //           // Decode the audio data from the concatenated chunks
//   //           const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);

//   //           // Avoid creating a new audioSourceNode if it's already playing
//   //           if (audioSourceNode) {
//   //             audioSourceNode.stop();
//   //           }

//   //           // Create a new AudioBufferSourceNode for the new chunk
//   //           audioSourceNode = audioContext.createBufferSource();
//   //           audioSourceNode.buffer = audioBuffer;
//   //           audioSourceNode.connect(audioGainNode);

//   //           // If it's the first chunk, we start playing immediately
//   //           if (isFirstChunk) {
//   //             isFirstChunk = false;
//   //             audioSourceNode.start(0);
//   //           } else {
//   //             // For subsequent chunks, start based on the current audio time
//   //             audioSourceNode.start(audioContext.currentTime);
//   //           }

//   //           // Once the current chunk finishes, proceed to the next one
//   //           audioSourceNode.onended = () => {
//   //             if (!result.done) {
//   //               processStream();
//   //             }
//   //           };

//   //         } catch (error) {
//   //           console.error('Error decoding audio:', error);
//   //           break;
//   //         }
//   //       }
//   //     };

//   //     // Start processing the stream immediately
//   //     processStream();

//   //     setIsPlaying(true);

//   //     // Once the audio finishes, reset the state
//   //     audioStream.onend = () => {
//   //       setIsPlaying(false);
//   //     };

//   //   } catch (error) {
//   //     console.error('Error generating speech:', error);
//   //   }
//   // };


//   //skipping
//   const handleGenerateSpeech = async () => {
//     try {
//       // Send the text to OpenAI's TTS API
//       const response = await fetch('https://api.openai.com/v1/audio/speech', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,  // Replace with your OpenAI API Key
//         },
//         body: JSON.stringify({
//           model: "gpt-4o-mini-tts",  // OpenAI TTS model
//           voice: "coral",            // Choose the voice (replace with desired voice)
//           input: text,               // The input text to convert to speech
//           instructions: "Speak in a cheerful and positive tone.",  // Optional instructions
//           response_format: "wav",    // Use wav or pcm for real-time audio
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to generate speech');
//       }
  
//       // Create a readable stream from the response body (this is the chunked data)
//       const audioStream = response.body;
//       const reader = audioStream.getReader();
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//       const audioGainNode = audioContext.createGain();
//       audioGainNode.connect(audioContext.destination);
  
//       let audioChunks: Uint8Array[] = [];
//       let audioSourceNode: AudioBufferSourceNode | null = null;
//       let isFirstChunk = true;
  
//       const processStream = async () => {
//         let result;
        
//         // Read and process chunks until the entire stream is done
//         while (!(result = await reader.read()).done) {
//           audioChunks.push(result.value);  // Append each chunk to the audioChunks array
  
//           // Concatenate the chunks into a single Uint8Array
//           const audioData = new Uint8Array(audioChunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));
          
//           try {
//             // Decode the audio data from the concatenated chunks
//             const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
  
//             // Avoid creating a new audioSourceNode if it's already playing
//             if (audioSourceNode) {
//               audioSourceNode.stop();
//             }
  
//             // Create a new AudioBufferSourceNode for the new chunk
//             audioSourceNode = audioContext.createBufferSource();
//             audioSourceNode.buffer = audioBuffer;
//             audioSourceNode.connect(audioGainNode);
  
//             // Start playing after 1 second delay
//             if (isFirstChunk) {
//               isFirstChunk = false;
  
//               // Start muted
//               audioGainNode.gain.setValueAtTime(0, audioContext.currentTime);
  
//               // After 1 second, unmute and start playing
//               setTimeout(() => {
//                 audioGainNode.gain.setValueAtTime(1, audioContext.currentTime); // Unmute
//                 audioSourceNode.start(0);
//               }, 1000);  // 1 second delay before starting the audio
  
//             } else {
//               audioSourceNode.start(audioContext.currentTime);
//             }
  
//             // Once the current chunk finishes, proceed to the next one
//             audioSourceNode.onended = () => {
//               if (!result.done) {
//                 processStream();
//               }
//             };
  
//           } catch (error) {
//             console.error('Error decoding audio:', error);
//             break;
//           }
//         }
//       };
  
//       // Start processing the stream immediately
//       processStream();
  
//       setIsPlaying(true);
  
//       // Once the audio finishes, reset the state
//       audioStream.onend = () => {
//         setIsPlaying(false);
//       };
  
//     } catch (error) { 
//       console.error('Error generating speech:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h1 className='text-black'>OpenAI Text-to-Speech</h1>
//       <textarea
//         className='text-black'
//         value={text}
//         onChange={handleTextChange}
//         placeholder="Enter text here"
//         rows={5}
//         cols={50}
//       />
//       <br />
//       <button className='text-black' onClick={handleGenerateSpeech} disabled={isPlaying}>
//         {isPlaying ? 'Playing...' : 'Generate Speech'}
//       </button>
//     </div>
//   );
// }





'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

 
  const handleGenerateSpeech = async () => {
    try {
      // Send the text to OpenAI's TTS API
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,  // Replace with your OpenAI API Key
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts",  // OpenAI TTS model
          voice: "coral",            // Choose the voice (replace with desired voice)
          input: text,               // The input text to convert to speech
          instructions: "Speak in a cheerful and positive tone.",  // Optional instructions
          response_format: "wav",    // Use wav or pcm for real-time audio
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }
  
      // Create a readable stream from the response body (this is the chunked data)
      const audioStream = response.body;
      const reader = audioStream.getReader();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioGainNode = audioContext.createGain();
      audioGainNode.connect(audioContext.destination);
  
      let audioChunks: Uint8Array[] = [];
      let audioSourceNode: AudioBufferSourceNode | null = null;
      let isFirstChunk = true;
  
      const processStream = async () => {
        let result;
  
        // Read and process chunks until the entire stream is done
        while (!(result = await reader.read()).done) {
          audioChunks.push(result.value);  // Append each chunk to the audioChunks array
  
          // Concatenate the chunks into a single Uint8Array
          const audioData = new Uint8Array(audioChunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []));
  
          try {
            // Decode the audio data from the concatenated chunks
            const audioBuffer = await audioContext.decodeAudioData(audioData.buffer);
  
            // Avoid creating a new audioSourceNode if it's already playing
            if (audioSourceNode) {
              audioSourceNode.stop();
            }
  
            // Create a new AudioBufferSourceNode for the new chunk
            audioSourceNode = audioContext.createBufferSource();
            audioSourceNode.buffer = audioBuffer;
            audioSourceNode.connect(audioGainNode);
  
            // Start playing after a 1-second delay
            if (isFirstChunk) {
              isFirstChunk = false;
  
              // Start muted
              audioGainNode.gain.setValueAtTime(0, audioContext.currentTime);
  
              // After 1 second, unmute and start playing
              setTimeout(() => {
                audioGainNode.gain.setValueAtTime(1, audioContext.currentTime); // Unmute
                audioSourceNode.start(0);
              }, 1000);  // 1-second delay before starting the audio
            } else {
              audioSourceNode.start(audioContext.currentTime);
            }
  
            // Set up the `onended` event to update the state when the audio ends
            audioSourceNode.onended = () => {
              // Reset the playing state once the audio finishes
              setIsPlaying(false);
              if (!result.done) {
                processStream(); // Continue processing the next chunk if available
              }
            };
  
          } catch (error) {
            console.error('Error decoding audio:', error);
            break;
          }
        }
      };
  
      // Start processing the stream immediately
      processStream();
  
      // Set isPlaying to true when the speech generation starts
      setIsPlaying(true);
  
    } catch (error) {
      console.error('Error generating speech:', error);
    }
  };
  
  

  return (
    <div>
      <h1 className='text-black'>OpenAI Text-to-Speech</h1>
      <textarea
        className='text-black'
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here"
        rows={5}
        cols={50}
      />
      <br />
      <button className='text-black' onClick={handleGenerateSpeech} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Generate Speech'}
      </button>
    </div>
  );
}


