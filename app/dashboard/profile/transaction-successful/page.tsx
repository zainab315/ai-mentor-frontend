"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TransactionSuccessful() {
  const router = useRouter()

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-800 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/10 border-0 backdrop-blur-sm">
          <div className="p-6 flex flex-col items-center text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="rounded-full bg-green-500/20 p-3">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Transaction Successful!</h2>
              <p className="text-gray-300">
                Your payment has been processed successfully. Your plan has been upgraded.
              </p>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <Button
                className="w-full bg-white/20 hover:bg-white/30 text-white"
                onClick={() => router.push("/dashboard")}
              >
                Return to Dashboard
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

