"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale")
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive) {
      interval = setInterval(() => {
        setCounter((prev) => {
          // Phase transitions
          if (phase === "inhale" && prev >= 4) {
            setPhase("hold")
            return 0
          } else if (phase === "hold" && prev >= 7) {
            setPhase("exhale")
            return 0
          } else if (phase === "exhale" && prev >= 8) {
            setPhase("rest")
            return 0
          } else if (phase === "rest" && prev >= 1) {
            setPhase("inhale")
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, phase])

  const toggleExercise = () => {
    if (!isActive) {
      // Reset to beginning when starting
      setPhase("inhale")
      setCounter(0)
    }
    setIsActive(!isActive)
  }

  // Get phase-specific styles
  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "from-blue-100 to-blue-300"
      case "hold":
        return "from-green-100 to-green-300"
      case "exhale":
        return "from-purple-100 to-purple-300"
      case "rest":
        return "from-gray-100 to-gray-300"
    }
  }

  // Calculate circle size based on phase
  const getCircleSize = () => {
    if (phase === "inhale") {
      return 50 + counter * 10
    } else if (phase === "hold") {
      return 90
    } else if (phase === "exhale") {
      return 90 - counter * 10
    } else {
      return 50
    }
  }

  const getInstructions = () => {
    switch (phase) {
      case "inhale":
        return "Breathe in..."
      case "hold":
        return "Hold..."
      case "exhale":
        return "Breathe out..."
      case "rest":
        return "Reset..."
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center justify-center mb-6 h-[180px]">
        <div
          className={`absolute top-[30px] rounded-full bg-gradient-to-br ${getPhaseColor()} transition-all duration-1000 shadow-md`}
          style={{
            width: `${getCircleSize()}px`,
            height: `${getCircleSize()}px`,
            opacity: isActive ? 1 : 0.8,
          }}
        />
        <span className="absolute bottom-4 text-base font-medium text-indigo-800">
          {isActive ? getInstructions() : "4-7-8 Breathing"}
        </span>
      </div>

      <Button
        onClick={toggleExercise}
        variant="outline"
        size="sm"
        className={`border-2 ${isActive ? "border-blue-400 text-blue-700" : "border-gray-300 text-gray-700"} hover:bg-blue-50`}
      >
        {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
        {isActive ? "Pause" : "Start Breathing Exercise"}
      </Button>

      <p className="mt-3 text-xs text-center text-gray-500 max-w-[250px]">
        The 4-7-8 breathing technique helps reduce anxiety and promote relaxation during stressful study sessions.
      </p>
    </div>
  )
}
