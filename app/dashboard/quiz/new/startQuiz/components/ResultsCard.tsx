import { Button } from "@/components/ui/button"

interface ResultsCardProps {
  score: number
  totalQuestions: number
  onContinue: () => void
}

export function ResultsCard({ score, totalQuestions, onContinue }: ResultsCardProps) {
  return (
    <div className="w-full backdrop-blur-md bg-card/60 p-6 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border/40">
      <h2 className="text-2xl font-bold text-center mb-4">Quiz Results</h2>
      <p className="text-xl text-center">
        Your Score: {score} out of {totalQuestions}
      </p>
      <Button
        onClick={onContinue}
        className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center  hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 shadow-lg"
      >
        Continue
      </Button>
    </div>
  )
}

