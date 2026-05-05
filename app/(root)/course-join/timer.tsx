"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-between">
      <div className="text-center">
        <div className="bg-white/20 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold">{timeLeft.days}</span>
        </div>
        <span className="text-sm mt-1 block">Days</span>
      </div>
      <div className="text-center">
        <div className="bg-white/20 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold">{timeLeft.hours}</span>
        </div>
        <span className="text-sm mt-1 block">Hours</span>
      </div>
      <div className="text-center">
        <div className="bg-white/20 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold">{timeLeft.minutes}</span>
        </div>
        <span className="text-sm mt-1 block">Minutes</span>
      </div>
      <div className="text-center">
        <div className="bg-white/20 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold">{timeLeft.seconds}</span>
        </div>
        <span className="text-sm mt-1 block">Seconds</span>
      </div>
    </div>
  )
}

