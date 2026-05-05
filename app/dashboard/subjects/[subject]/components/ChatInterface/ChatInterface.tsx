"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChatInput } from "../Input/Input"
import { Sparkles, Play, Pause, Volume2, Files, TriangleAlert, RotateCcw , CircleStop} from 'lucide-react'
import { sendMessage , setEmpty, updateBotMessage } from "@/redux/features/openAI/messageSlice" 
import { useQuery } from "@apollo/client"
import { useAppDispatch, useAppSelector } from "@/redux/hooks" 
import { setHistoryMessage } from "@/redux/features/firstMessageSlice/firstMessageSlice"
import { ChatHeader } from "../Chat-header/Chat-header" 
import { TypingLoader } from "../typing-Loader/Typing-Loader" 
import { useAIFunctions } from "./Functions/Functions" 
import { setScroll } from "@/redux/features/scrollSlice/scrollSlice"
import Markdown from "react-markdown" 
import { useUser } from "@clerk/nextjs";  
import { Get_User } from "@/lib/query"
import remarkGfm from "remark-gfm"
import Image from "next/image" 
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { copyToClipboard } from "@/lib/methods"  
import { setFirstMessageID } from "@/redux/features/firstMessageSlice/firstMessageSlice"
import { PresentationModal } from "./Modal/Presentation-Modal"
import axios from "axios"

interface MessageContent {
  text?: string
  url?: string[]
  audio?: string
}

interface Message {
  id: string
  sender: string
  content: MessageContent
}

interface ChatInterfaceProps {
  botName?: string
  botAvatar?: string
  mainAgent?: string
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ botName, botAvatar, mainAgent }) => {
  const dispatch = useAppDispatch()  
  const { user } = useUser()  
  const params = useParams(); 
  const searchParams = useSearchParams(); 

  const AgentID = searchParams.get('id'); 
  const custom = searchParams.get("custom"); 
  const ID = user?.id; 
  const { AudioToText, createMessageWithImage } = useAIFunctions()
  const messages = useAppSelector((state: { message: { messages: Message[] } }) => state.message.messages)   
  const scroll = useAppSelector((state : any) => state.scrollReference.scroll )
  const isHistoryMessage = useAppSelector((state : any) => state.firstMessage.historyMessage)
  const firstMessageId = useAppSelector((state : any) => state.firstMessage.firstMessageID) 
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [subAgent, setSubAgent] = useState<string>("")
  const chatEndRef = useRef<HTMLDivElement>(null)  
  
  const [idx , setIdx] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null)
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false)
  const [currentMessageForPresentation, setCurrentMessageForPresentation] = useState("")
  const [disable , setDisable ] = useState(false);
  const router = useRouter()
 useEffect(()=> { 
 },[user])
  useEffect(() => {
    function formatBotName(name: string | undefined): string {
      if (!name) return ""
      return name.replace(/[-\s]+/g, "_").toUpperCase()
    }
  
    if (botName) {
      setSubAgent(formatBotName(botName))
    } 
    console.log('bot name fffff ', botName)
  }, [botName])
  
 useEffect(()=> { 
   return ()=> {  
    dispatch(setFirstMessageID(""))
    dispatch(setEmpty());
  }
 },[])
 useEffect(()=> { 
  console.log('st',scroll)
 },[scroll])
 const chatStartRef = useRef<any>(null)

 useEffect(() => {
  if (messages.length > 0) {
    if (scroll) {
      chatStartRef.current?.scrollIntoView({ behavior: "smooth" })
    } else {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }
}, [messages, scroll, dispatch, setScroll])
  

  
  const handleTrackHistory = async (firstMessage : any) => {  

    function formatString(str : any) {
      return str.toLowerCase().replace(/_/g, "").replace(/^./, (char : any) => char.toUpperCase());
    } 
    
    const messageArray = [firstMessage];  
     const data = { 
      userId: ID, 
      agentName : subAgent, 
      history : JSON.stringify(messageArray), 
      title : formatString(firstMessage.content.text ?? 'Voice chat') , 
     }   
     const res = await axios.post(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}history`,data);   
     console.log('history response', res)
     return res.data._id;
  }  
  useEffect(()=>{
   if (firstMessageId) { 
    handleHistory(firstMessageId);
   }
  },[messages]) 
  const [errorIndex , setErrorIndex] = useState<any>([]);
  const handleHistory = async (id : any) => { 
    console.log('HistoryID' ,id);
    function lowerCase(str : any) { 
      return str.toLowerCase().replace(/_/g, "");
    } 
    if (messages.length === 0) { 
      return
    }
     const data = { 
      agentName : subAgent, 
      history : JSON.stringify(messages), 
     }     
     try {  
  
     const res = await axios.put(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}history/${id}`,data);    
     } 
     catch (e) { 
      console.warn('error updating history', e)
     }
     
  } 
  const [errorMessage , setErrorMessage] = useState<any>('');
  const checkCredits = (tokens: number, index: number, updatedCredits : any): boolean => { 
    console.log('token',tokens , 'credit', updatedCredits)
    if (tokens > updatedCredits) {
      setErrorIndex([...errorIndex, index]);
      setErrorMessage("You don't have enough credits. Please renew your plan.");
      return false;
    }
    return true;
  };
  
  const updateCredits = async (tokens: number): Promise<boolean> => {
    try {
      const newCredits = Math.max(credits - tokens, 0); 

    const data = {
      userId: ID,
      credits: newCredits,
    };
      console.log("Data", data);
  
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AI4ALL_SERVER}user/updateClerk`,
        data
      );
  
      setCredits(res.data);
      return true;
    } catch (error) {
      console.error("Error updating credits:", error);
      return false;
    }
  }; 

  function processFormattedLine(text: string) {
  
    const headingInMiddleMatch = text.match(/(.*?)(#{1,6}\s+[^#]+)(.*)$/)
    if (headingInMiddleMatch && headingInMiddleMatch[2]) {
      const beforeHeading = headingInMiddleMatch[1].trim()
      const headingPart = headingInMiddleMatch[2].trim()
      const afterHeading = headingInMiddleMatch[3].trim()
  
      if (beforeHeading) {
        cleanedText += processFormattedLine(beforeHeading)
      }
  
      // Process the heading part
      cleanedText += "\n\n" + headingPart + "\n\n"
  
      if (afterHeading) {
        cleanedText += processFormattedLine(afterHeading)
      }
  
      return cleanedText
    }
  
    // Check if this is a heading (starts with ###)
    if (text.match(/^#{1,6}\s/)) {
      // Add double line break before heading and ensure proper spacing after
      const headingMatch = text.match(/^(#{1,6})\s+(.*)$/)
      if (headingMatch) {
        const headingLevel = headingMatch[1] // The ### symbols
        const headingText = headingMatch[2].trim() // The heading text
        cleanedText += "\n\n" + headingLevel + " " + headingText + "\n\n" // Extra line break after heading
      } else {
        cleanedText += "\n\n" + text + "\n\n"
      }
      return cleanedText
    }
  
    // Check for topic headers (Number Sense, Counting, Addition, Subtraction, etc.)
    if (text.match(/^(Number Sense|Counting|Addition|Subtraction|Multiplication|Division)\s+\d+\s*\./i)) {
      // Format topic headers like proper headings with clear separation
      cleanedText += "\n\n## " + text + "\n\n"
      return cleanedText
    }
  
    // Check for example headers (Example 1:, Example 2:, etc.)
    if (text.match(/^Example\s+\d+\s*:/i)) {
      // Format example headers like proper headings with clear separation
      cleanedText += "\n\n### " + text + "\n\n"
      return cleanedText
    }
  
    // Check for numbered lists (like 1., 2., etc.)
    if (text.match(/^\d+\.\s/)) {
      // Format numbered lists with proper alignment and spacing
      const listMatch = text.match(/^(\d+\.)\s+(.*)$/)
      if (listMatch) {
        const listNumber = listMatch[1] // The number with period
        const listText = listMatch[2].trim() // The list item text
        cleanedText += "\n" + listNumber + " " + listText + "\n" // Add line break after list item
  
        // If there's a code snippet in the list item, add proper formatting
        if (listText.includes("`")) {
          cleanedText += "\n"
        }
      } else {
        cleanedText += "\n" + text + "\n"
      }
      return cleanedText
    }
  
    // Check for standalone numbers (like just "2.")
    if (text.match(/^\d+\.$/)) {
      cleanedText += "\n\n" + text + "\n"
      return cleanedText
    }
  
    // Check for bullet points
    if (text.match(/^[*-]\s/)) {
      // Format bullet points with proper alignment and indentation
      const bulletMatch = text.match(/^([*-])\s+(.*)$/)
      if (bulletMatch) {
        const bulletSymbol = bulletMatch[1] // The * or -
        const bulletText = bulletMatch[2].trim() // The bullet point text
        cleanedText += "\n  " + bulletSymbol + " " + bulletText + "\n" // Add indentation and line break
      } else {
        cleanedText += "\n" + text + "\n"
      }
      return cleanedText
    }
  
    // Check for code blocks
    if (text.includes("```")) {
      // Handle code blocks with proper spacing
      if (text.startsWith("```")) {
        // Start of code block
        cleanedText += "\n\n" + text
      } else if (text.endsWith("```")) {
        // End of code block
        cleanedText += text + "\n\n"
      } else {
        // Code block marker in the middle of text
        cleanedText += "\n" + text + "\n"
      }
      return cleanedText
    }
  
    // Check for inline code (with backticks)
    if (text.includes("`") && !text.includes("```")) {
      // Preserve inline code formatting
      cleanedText += text + " "
      return cleanedText
    }
  
    // Check for bold/italic markers
    if (text.includes("**") || text.includes("*") || text.includes("__") || text.includes("_")) {
      cleanedText += text + " "
      return cleanedText
    }
  
    // Check for "Question:" and "Answer:" patterns
    if (text.match(/^(Question|Answer)\s*:/i)) {
      cleanedText += "\n" + text + "\n"
      return cleanedText
    }
  
    // Check for questions (sentences ending with ?)
    if (text.trim().endsWith("?")) {
      cleanedText += "\n" + text + "\n"
      return cleanedText
    }
  
    // Default case: append with space or newline based on context
    if (text.endsWith(".") || text.endsWith("!") || text.endsWith("?")) {
      // For sentences, add paragraph breaks for better readability
      cleanedText += text + "\n\n"
    } else {
      cleanedText += text + " "
    }
  
    return cleanedText
  }
  
  
  useEffect(()=>{ 
   return()=> { 
    if (scroll) { 
      dispatch(setScroll(false))
    }
   }
  },[])
  let cleanedText = '';
  
  const handleSendMessage = async (content: MessageContent) => {   
    if (scroll) { 
      dispatch(setScroll(false))
    }
    if (!content.url) {   

      setDisable(true); 

      
      const userMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "user",
        content,
      }  
    
      let updatedCredits = 0;
      const updatecredits = async () => {
        const res = await refetch();
        updatedCredits = res.data?.getUser?.credits;
        console.log(updatedCredits); 
    };
    
    await updatecredits();        
      dispatch(sendMessage(userMessage))       
      let SentTokens = countTokens(content.text || "" ,)
    
      const response =  checkCredits(SentTokens , messages.length , updatedCredits); 
      if (response === false) {  
        setDisable(false);
        return 
      } 
      if (messages.length === 0) { 
      const firstMessageId =  await handleTrackHistory(userMessage);   
      console.log('First Message ID')
      dispatch(setFirstMessageID(firstMessageId));
      }  
      else if (messages.length > 0){  
        console.log('calling History');
       await handleHistory(firstMessageId) 
      // dispatch(setFirstMessageID(firstMessageid));  
      dispatch(setHistoryMessage(false));
      }
      let audioText = '';
      try {
        if (content.audio) {
          const response = await fetch(content.audio)
          const audioBlob = await response.blob()
          const webmBlob = new Blob([audioBlob], { type: "audio/webm" })
          const text: any = await AudioToText(webmBlob as File, ID as string)
          
          if (text.data.data !== "") {
            audioText = text.data.data
          }
          console.log("Audio URL:", content.audio)
        }
    
        // Prepare data for API call 
        let data = {};
         
         if (custom) { 
          data = {
            assistantType:  null,
            subType: null,
            userPrompt: JSON.stringify(content.text + audioText),
            token: 2000,  
            agentId : AgentID,
            userId:ID
          } 
        }
          else { 
            data = {
            assistantType: mainAgent,
            subType: subAgent,
            userPrompt: JSON.stringify(content.text + audioText),
            token: 2000, 
            userId:ID
          }
          }
            

        
    
    
        // Create an initial bot message
        const botMessageId = (Date.now() + 2).toString();
        const initialBotMessage: Message = {
          id: botMessageId,
          sender: "bot",
          content: { text: "" },
        }  

        dispatch(sendMessage(initialBotMessage))  
        let responseTokens = 0;

        
        const response = await fetch(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}openai/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.body) {
          throw new Error('No response body');
        } 
    
        const reader = response.body.getReader(); 
        const decoder = new TextDecoder(); 
        let buffer = ''; 
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
    
          
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; 
    
          for (const line of lines) {
            if (line.trim()) {
              // Remove "data:" prefix and clean up the text
              const cleanLine = line 
                .replace(/id:\s*\d+\s*/g, '')
                .replace(/^data:\s*/, '')   
                .replace(/\\n/g, '\n')     // Handle escaped newlines
                .replace(/\\\"/g, '"')     // Handle escaped quotes
                .replace(/\\t/g, '\t')     // Handle escaped tabs
                .replace(/\d+\\\nid:\s*\d+\\ndata:\s*/g, '') // Remove id markers  
                .replace(/\*\*/g, '') 
                .replace(/\`\`\`/g, '')         // Remove occurrences of **


                .trim();
    
                if (cleanLine) {
                  processFormattedLine(cleanLine)
                } 
                
            
                if (cleanedText) {
                  dispatch(
                    updateBotMessage({
                      id: botMessageId,
                      chunk: cleanedText,
                    }),
                  )
                  responseTokens = countTokens(cleanedText) + responseTokens
                  cleanedText = "" 
                }            
            }
          }
          
          if (cleanedText) {
            dispatch(updateBotMessage({ 
              id: botMessageId, 
              chunk: cleanedText
            }));  
            responseTokens  = countTokens(cleanedText) + responseTokens
          } 
        }  
        // const totalTokens = responseTokens + SentTokens;
        // const resp = await updateCredits(totalTokens); 
        setDisable(false);  
    
      } catch (error) {
        console.error('Error in message processing:', error);
        setIsTyping(false);
        setDisable(false);
      } 
     
    }
    if (content.url) { 
      setDisable(true);
      const userMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: "user",
        content,
      } 
      dispatch(sendMessage(userMessage)) 
      setIsTyping(true)
      let audiotext = ''; 
      let updatedCredits = 0;
      const updatecredits = async () => {
        const res = await refetch();
        updatedCredits = res.data?.getUser?.credits;
        console.log(updatedCredits); 
    };
    
      await updatecredits();
     const keyWords =  countTokens(content.text || "")  
     const promptTokensTotal = keyWords+100;
      const resp =  checkCredits(promptTokensTotal , messages.length , updatedCredits); 

      if (!resp) {  
        setDisable(false); 
        setIsTyping(false);
        return
      }
      if (content.audio) {
        const response = await fetch(content.audio)
        const audioBlob = await response.blob()

        const webmBlob = new Blob([audioBlob], { type: "audio/webm" })

        const text: any = await AudioToText(webmBlob as File)
        console.log("text", text.data.data)
        if (text.data.data !== "") { 
          audiotext = text.data.data;
        }

      }

      const data = {
        assistantType: mainAgent,
        subType: subAgent,
        userPrompt: content.text + audiotext,
        url: content.url,
        token: 2000,
        userId:ID
      }

      const response = await createMessageWithImage(data)
      console.log(response)


      const lines = response.data.split("\n")

      const message = lines
        .filter((line: any) => line.startsWith("data:"))
        .map((line: any) => line.replace("data:", "").trim())
        
      const fullMessage = message.join(" ")
      //  let respToken  = countTokens(fullMessage)
      //  let finalDeducation = respToken + 100;  
      //  const respon = await updateCredits(finalDeducation); 


      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        content: { text: fullMessage },
      }

      dispatch(sendMessage(botMessage))
      setIsTyping(false) 
      setDisable(false);
    }
  } 
   const audioref = useRef<any>(null); 
   const [isPlaying, setIsPlaying] = useState<boolean>(false);

   const utteranceRef = useRef<any>(null);
   const handleToggle = (text: any, index: any) => {
    const synth = window.speechSynthesis;
  
    if (synth.speaking || synth.paused) {
      synth.cancel();
      utteranceRef.current = null;
      setIsPlaying(false);
      return; 
    }
  
    setIdx(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsPlaying(false);
      utteranceRef.current = null;
    };
    utteranceRef.current = utterance;
    synth.speak(utterance);
    setIsPlaying(true);
  };
  
  
  const handleGenerateSpeech = async (text:string,index:any,words:number) => {
    try {
      setIdx(index);
      setIsPlaying(true);
 
      let updatedCredits = 0;
      const updatecredits = async () => {
        const res = await refetch(); 
        updatedCredits = res.data?.getUser.credits; 
      }; 
      await updatecredits();
      const res =  checkCredits(words,index,updatedCredits); 
      if (!res) return 
      // await updateCredits(words)



      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,  // Replace with your OpenAI API Key
        },
        body: JSON.stringify({
          model: "gpt-4o-mini-tts",  // OpenAI TTS model
          voice: "alloy",            // Choose the voice (replace with desired voice)
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
      if(!audioStream) return
      const reader = audioStream.getReader();
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audioGainNode = audioContext.createGain();
      audioGainNode.connect(audioContext.destination);
  
      let audioChunks: Uint8Array[] = [];
      let audioSourceNode: AudioBufferSourceNode | null = null;
      let isFirstChunk = true;
  
      const processStream = async () => {
        let result:any;
  
        // Read and process chunks until the entire stream is done
        while (!(result = await reader.read()).done) {
          audioChunks.push(result.value);  // Append each chunk to the audioChunks array
  
          // Concatenate the chunks into a single Uint8Array
          const audioData = new Uint8Array(audioChunks.reduce((acc, chunk:any) => acc.concat(Array.from(chunk)), []));
  
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
              
                audioGainNode.gain.setValueAtTime(0, audioContext.currentTime); // Unmute

                // Automatically unmute after 100 seconds
                setTimeout(() => {
                  audioGainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 1); // smoothly unmute over 1 second
                }, 2000); 

                if(!audioSourceNode) return
                audioSourceNode.start(0);

            } else {
              audioSourceNode.start(audioContext.currentTime);
            }
  
            // Set up the `onended` event to update the state when the audio ends
            audioSourceNode.onended = () => {
              // Reset the playing state once the audio finishes
              
              if (!result.done) {
                processStream(); // Continue processing the next chunk if available
              }else{
                setIsPlaying(false)
              }
            };
  
          } catch (error) {
            console.error('Error decoding audio:', error);
            setIsPlaying(false)
            break;
          }
        }
      };
  
      // Start processing the stream immediately
      processStream();
  
      // Set isPlaying to true when the speech generation starts
  
    } catch (error) {
      console.error('Error generating speech:', error);
      setIsPlaying(false)
    }
  };
  
  const audioRef = useRef<any>([]);
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null); 
  const handleAudioEnded = () => { 
    setCurrentPlaying(null);
  }
  const togglePlayPause = (index: number) => {
    if (currentPlaying !== null && currentPlaying !== index) {
      audioRef.current[currentPlaying]?.pause(); 
    }

    if (audioRef.current[index]?.paused) {
      audioRef.current[index]?.play();
      setCurrentPlaying(index);
    } else {
      audioRef.current[index]?.pause();
      setCurrentPlaying(null);
    }
  };
 const toggleAudio = (audioUrl: string) => {
  const audio = new Audio(audioUrl);

  if (audioPlaying === audioUrl) {
    audio.pause();
    setAudioPlaying(null);
  } else {
    if (audioPlaying) {
      const prevAudio = new Audio(audioPlaying);
      prevAudio.pause();
    }
    setAudioPlaying(audioUrl);
    audio.play();
  }
}; 
const {
  data,
  loading,
  error,
  refetch,
} = useQuery(Get_User, {
  variables: ID ? { descopeId: ID } : undefined,
  skip: !ID,
}) 

const [credits,setCredits] = useState<any>(null);
useEffect(() => {
  if (ID) {
    refetch() 
  }
}, [ID, refetch])  
useEffect(()=> {  
  console.log('refetched', data?.getUser.credits)
  setCredits(data?.getUser.credits)
},[data , refetch])

function countTokens(text:string) {
  return text.split(/\s+/).length; 
}

const handleOpenPresentationModal = async (messageText: string , index : any) => { 
  
 let updatedCredits = 0;
      const updatecredits = async () => {
        const res = await refetch(); 
        updatedCredits = res.data?.getUser.credits; 
        
        console.log(updatedCredits); 
    }; 
        await updatecredits();
     const response =  checkCredits(1000,index,updatedCredits) 
     if (response) { 
  setCurrentMessageForPresentation(messageText)
  setIsPresentationModalOpen(true) 
     }
} 
  const deductVideoTokens = async () => { 
    await updateCredits(1000)

  }

  const handleConvertTextToSpeech = async (text: string , index : any, words:number) => {
    try {  
      setIdx(index);
      setIsPlaying(true);
         
      let updatedCredits = 0;
      const updatecredits = async () => {
        const res = await refetch(); 
        updatedCredits = res.data?.getUser.credits; 
        
        console.log(updatedCredits); 
    }; 
        await updatecredits();

      const res =  checkCredits(words,index,updatedCredits); 
      console.log(res);  
      if (res) {
      await updateCredits(words)
      const response = await fetch(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}openai/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText: text,
          userId: ID,
        }),
      });
    
      if (!response.ok) throw new Error("Failed to fetch audio");
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
  
      if (audioref.current) {
        audioref.current.src = audioUrl;
  
        // Set an event listener to update state when audio ends
        audioref.current.onended = () => {
          setIsPlaying(false);
        };
  
        await audioref.current.play();
      } else {
        setIsPlaying(false);
      } 
    } 
    } catch (error) {
      console.error("Error converting text to speech:", error);
      setIsPlaying(false); // Ensure state resets on error
    }
  };
 

  return (
    <> 
      
    <PresentationModal 
        isOpen={isPresentationModalOpen} 
        onDeduct={deductVideoTokens}
        onClose={() => setIsPresentationModalOpen(false)}
        topic={currentMessageForPresentation}
        userId={ID || ""}
      />
    <div className="flex flex-col w-full md:w-[80%] h-[95vh] bg-gradient-to-b from-purple-950 via-gray-950 to-black">  
     <audio
        ref={audioref}
        style={{ display: 'none' }}
      />
      <div className="absolute lg:ml-64 inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <ChatHeader botName={botName} botAvatar={botAvatar} userId={AgentID} credits={credits} refetch={refetch} />
      <div className="flex-1 p-8 overflow-y-auto space-y-4 relative scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center mt-10 justify-center space-y-4"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 flex items-center justify-center backdrop-blur-xl border border-white/10">
              <Sparkles className="w-12 h-12 text-white/40 animate-pulse" />
            </div>
            <p className="text-lg font-light tracking-wide text-white/60 bg-white/5 px-6 py-2 rounded-full backdrop-blur-xl border border-white/10">
              Your messages will be shown here
            </p>
          </motion.div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              ref={index === 0 ? chatStartRef : null} // Add ref to first message
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-xl shadow-lg transform transition-all duration-200 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-white/95 to-white/90 text-black ml-auto hover:shadow-purple-500/10"
                    : "bg-gradient-to-br from-gray-600/90 to-gray-700/80 text-white mr-auto hover:shadow-purple-500/10"
                }`}
              >
                {Object.keys(msg.content).length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-light space-y-2"
                  >
                    {msg.content.text && (
                      <Markdown children={msg.content.text} remarkPlugins={[remarkGfm]} className="font-serif" />
                    )}
                    {msg.content.url && msg.content.url.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.content.url.map((img, index) => (
                          <Image
                            key={index}
                            src={img || "/placeholder.svg"}
                            alt="User uploaded image"
                            width={100}
                            height={100}
                            className="rounded-lg w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] bg-slate-400"
                            style={{ objectFit: "fill" }}
                            loading="eager"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg"
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {msg.content.audio && (
                      <div className="flex items-center space-x-2">
                        <audio
                          ref={(el) => (audioRef.current[index] = el)}
                          onEnded={handleAudioEnded}
                          src={msg.content.audio}
                          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        />
                        <button onClick={() => togglePlayPause(index)}>
                          {currentPlaying === index ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <span>Audio message</span>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <p>Empty message</p>
                )}
              </div>

              {errorMessage &&
                errorIndex.map((idx) =>
                  idx === index ? (
                    <div
                      key={idx}
                      className="mb-2 p-2 flex gap-2 items-center bg-red-500/20 text-red-500 rounded-lg mt-2 text-center"
                    >
                      <TriangleAlert /> {errorMessage}
                    </div>
                  ) : null,
                )}

              {msg.sender === "bot" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                  className="mt-2 flex gap-2 ml-4"
                >
                  
                    {isPlaying && idx === index ? (
                    <CircleStop   
                    className="text-red-500"
                     onClick={()=>handleToggle(msg.content.text , index)}
                      />
                    ) : (
                      // <Volume2
                      //   onClick={() => {
                      //     const words = countTokens(msg.content.text as string)
                      //     handleGenerateSpeech(msg.content.text as string, index, words)
                      //   }}
                      //   size={18}
                      // /> 
                      <Volume2 
                      onClick={()=>handleToggle(msg.content.text , index) }
                       />
                    )}

                  <div className="p-1 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer">
                    <RotateCcw onClick={() => window.location.reload()} size={18} />
                  </div>
                  <div className="p-1 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer">
                    <Files onClick={() => copyToClipboard(msg.content.text || "")} size={18} />
                  </div>
                  <div className="p-1 text-white rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer">
                    <Play size={15} onClick={() => handleOpenPresentationModal(msg.content.text || "", index)} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </AnimatePresence>
      {isTyping && <TypingLoader />}
      <div ref={chatEndRef} />
    </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-4 bg-gradient-to-t from-black/40 to-black/20 backdrop-blur-2xl border-t border-white/5"
      >
        <div className="flex items-end gap-2 w-full mx-auto">
          <div className="flex-1 relative">
            <ChatInput onSendMessage={handleSendMessage} allowImage={true} allowAudio={true} disable= {disable} />
          </div>
        </div>
      </motion.div>
    
    </div> 
    </>
  )
}