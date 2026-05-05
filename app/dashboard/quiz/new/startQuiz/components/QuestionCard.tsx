import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

interface QuestionCardProps {
  question: {
    id: number
    question: string
    answers: string[]
    correct_answer: string
  }
  selectedAnswer: string
  showResults: boolean
  onAnswerChange: (questionId: number, answer: string) => void
}

export function QuestionCard({ question, selectedAnswer, showResults, onAnswerChange }: QuestionCardProps) {
  return (
    <div className="backdrop-blur-md bg-card/60 p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-border/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-card/70">
      <h3 className="text-xl font-semibold mb-4 text-card-foreground">
        {question.id}. {question.question}
      </h3>
      <RadioGroup
        onValueChange={(value) => onAnswerChange(question.id, value)}
        value={selectedAnswer || ""}
        className="space-y-2"
      >
        {question.answers.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} disabled={showResults} className="border-primary/50" />
            <Label
              htmlFor={`${question.id}-${option}`}
              className={`cursor-pointer transition-colors duration-200 ${
                showResults && option === question.correct_answer && "text-green-500 font-semibold"
              }`}
            >
              {option}
              {showResults && option === question.correct_answer && (
                <CheckCircle className="inline-block ml-2 w-4 h-4 text-green-500" />
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

