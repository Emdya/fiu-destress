"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

export function StudyTips() {
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    {
      title: "Spaced Repetition",
      content:
        "Study material in increasing intervals over time rather than cramming. This improves long-term retention.",
      icon: "⏱️",
    },
    {
      title: "Active Recall",
      content:
        "Test yourself on material instead of just reviewing it. Try to recall information without looking at your notes.",
      icon: "🧠",
    },
    {
      title: "Change Environments",
      content:
        "Study in different locations to improve memory. The Green Library, GC, and SASC all offer great study spaces.",
      icon: "🏛️",
    },
    {
      title: "Teach Someone Else",
      content: "Explaining concepts to others helps solidify your understanding. Form a study group with classmates.",
      icon: "👨‍🏫",
    },
    {
      title: "Use the Feynman Technique",
      content:
        "Explain complex topics in simple terms as if teaching a child. This reveals gaps in your understanding.",
      icon: "🔍",
    },
    {
      title: "Take Strategic Breaks",
      content: "Use the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break.",
      icon: "☕",
    },
    {
      title: "Prioritize Sleep",
      content: "Sleep is crucial for memory consolidation. Aim for 7-8 hours, especially the night before an exam.",
      icon: "😴",
    },
  ]

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length)
  }

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length)
  }

  return (
    <div className="relative">
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 min-h-[150px]">
        <div className="flex items-center mb-2">
          <span className="text-2xl mr-2">{tips[currentTip].icon}</span>
          <h3 className="font-medium text-blue-900">{tips[currentTip].title}</h3>
        </div>
        <p className="text-sm text-gray-700">{tips[currentTip].content}</p>

        <div className="flex justify-between mt-4 text-xs text-blue-600">
          <span>
            Tip {currentTip + 1} of {tips.length}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <Button onClick={prevTip} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Tip</span>
        </Button>

        <Button onClick={nextTip} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Tip</span>
        </Button>
      </div>
    </div>
  )
}
