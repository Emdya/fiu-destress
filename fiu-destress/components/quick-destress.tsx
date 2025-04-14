"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

export function QuickDestress() {
  const [currentExercise, setCurrentExercise] = useState(0)

  const exercises = [
    {
      title: "5-Finger Countdown",
      description: "Touch your thumb to each finger while taking deep breaths. Count down from 5 to 1.",
      icon: "👋",
    },
    {
      title: "Grounding Technique",
      description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
      icon: "🌱",
    },
    {
      title: "Progressive Relaxation",
      description: "Tense and then relax each muscle group, starting from your toes and working up to your head.",
      icon: "💆",
    },
    {
      title: "Visualization",
      description: "Close your eyes and imagine a peaceful place. Focus on the details and how it makes you feel.",
      icon: "🏝️",
    },
  ]

  const nextExercise = () => {
    setCurrentExercise((prev) => (prev + 1) % exercises.length)
  }

  const prevExercise = () => {
    setCurrentExercise((prev) => (prev - 1 + exercises.length) % exercises.length)
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-md border border-blue-100 min-h-[120px]">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{exercises[currentExercise].icon}</span>
          <h3 className="font-medium text-blue-900">{exercises[currentExercise].title}</h3>
        </div>
        <p className="text-sm text-gray-700">{exercises[currentExercise].description}</p>

        <div className="flex justify-between mt-3 text-xs text-blue-600">
          <span>
            {currentExercise + 1} of {exercises.length}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <Button onClick={prevExercise} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Exercise</span>
        </Button>

        <Button onClick={nextExercise} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Exercise</span>
        </Button>
      </div>
    </div>
  )
}
