import axios from "axios"

interface QuizGeneratorProps {
  dto: any
  setQuiz: (quiz: any) => void
  setIsGenerating: (isGenerating: boolean) => void
}

export async function generateQuiz({ dto, setQuiz, setIsGenerating }: QuizGeneratorProps) {
  try {
    setIsGenerating(true)
    const usState = dto.isCitizen === "yes" ? `Student is from US ${dto.state} state` : ""
    const topicDetail = dto.topic ? `Quiz topic ${dto.topic}` : ""

    const data = {
      subject: dto.subject,
      difficulty: dto.difficulty,
      totalQuestions: dto.totalQuestions,
      subBranch: dto.subBranch,
      topic: topicDetail,
      level: dto.level,
      usState: usState,
      userId:dto.userId

    }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_AI4ALL_SERVER}openai/startNewQuiz`, data)
    if(response.data.success){
      setQuiz(response.data.data.questions);
      return true; 
    } 
    else return false
  } catch (e) {
    console.log(e)
    return false
  } finally {
    setIsGenerating(false)
  }
}

