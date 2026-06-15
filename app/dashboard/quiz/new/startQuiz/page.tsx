"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { Add_Quiz, Get_User } from "@/lib/query";
import { useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "@/redux/hooks";
import { QuestionCard } from "./components/QuestionCard";
import { ResultsCard } from "./components/ResultsCard";
import { generateQuiz } from "./components/QuizGenerator";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { checkDomainOfScale } from "recharts/types/util/ChartUtils";

interface Question {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string;
}

export default function QuizPage() {
  const { user } = useUser();
  const userID = user?.id;
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const dto = useAppSelector((state: any) => state.dto.dto);
  const [isRunning, setIsRunning] = useState(false);

  const [AddQuiz] = useMutation(Add_Quiz());

  const [isGenerating, setIsGenerating] = useState(true);
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const { error, data: credits , refetch  } = useQuery(Get_User, {
    skip: true,
    variables: { descopeId: userID },
  });   

  const pauseTimer = () => {
    setIsRunning(false); // Keeps the timeLeft unchanged
  };

  //macos only
  const [prevPosition, setPrevPosition] = useState({
    x: window.screenX,
    y: window.screenY,
  });

  useEffect(() => {
    const detectWindowMove = () => {
      if (
        window.screenX !== prevPosition.x ||
        window.screenY !== prevPosition.y
      ) {
        console.log("Window is being dragged!"); // Trigger your function here
        setPrevPosition({ x: window.screenX, y: window.screenY });
      }
    };

    const interval = setInterval(detectWindowMove, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, [prevPosition]);

  const handleNetworkChange = () => {
    if (!navigator.onLine) {
      alert("Network disconnected. Please check your internet connection.");
      return router.push("/dashboard/quiz/new");
    }
  };

  useEffect(() => {
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  const handleVisibilityChange = () => {
    if (document.hidden) {
      return router.push("/dashboard/quiz/new");
    }
  };


  useEffect(() => {
    generateQuiz({ dto, setQuiz, setIsGenerating })
      .then((res) => {
        if (!res){
        return router.back();
        } 
        setIsRunning(true);
        setTimeout(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
      })
      .catch((e) => {
        console.error(e);

         return router.back();
      });
  }, [dto]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      if (Object.keys(answers).length < dto.totalQuestions) {
        alert("Time Up");
        return router.push("/dashboard/quiz/new");
      }
      handleSubmit();
    }
  }, [timeLeft, router]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < dto.totalQuestions) {
      alert("Incomplete Quiz");
      return;
    }

    pauseTimer();
    setShowResults(true);
    AddQuiz({
      variables: {
        deScopeId: userID,
        marks: `${calculateScore()}/${dto.totalQuestions}`,
        subject: dto.subject,
        difficulty: dto.type,
        level: dto.level,
        subBranch: dto.subBranch,
      },
    })
      .then(() => {
        console.log("success");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const calculateScore = () => {
    let score = 0;
    quiz.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        score++;
      }
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background/95 p-8 bg-gradient-to-br from-background to-primary/10">
      <div className="max-w-3xl mx-auto backdrop-blur-sm bg-card/80 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-border/50">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">
              {dto.subject} Quiz
            </h1>
          </div>
          {/* {dto.custom && */}
          <div className="text-2xl font-bold text-primary">
            Time Left: {formatTime(timeLeft)}
          </div>
          {/* } */}
        </div>

        {isGenerating ? (
          <h1 className="text-center">Generating Quiz...</h1>
        ) : (
          <>
            <div className="space-y-6">
              {quiz &&
                quiz.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    selectedAnswer={answers[question.id]}
                    showResults={showResults}
                    onAnswerChange={handleAnswerChange}
                  />
                ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              {!showResults ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center  hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg"
                >
                  Submit Quiz
                </Button>
              ) : (
                <ResultsCard
                  score={calculateScore()}
                  totalQuestions={dto.totalQuestions}
                  onContinue={() => {
                    setShowResults(false);
                    setAnswers({});
                    router.back();
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
