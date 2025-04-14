"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Info } from "lucide-react"
import { preloadAudio, playAudio, isInFallbackMode, initAudioSystem } from "../utils/audio-manager"

export function PomodoroTimer() {
  const [mode, setMode] = useState<"focus" | "break">("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [cycles, setCycles] = useState(0)
  const [isAudioInitialized, setIsAudioInitialized] = useState(false)
  const [fallbackMode, setFallbackMode] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const notificationRef = useRef<NodeJS.Timeout | null>(null)

  // Total time based on mode
  const totalTime = mode === "focus" ? 25 * 60 : 5 * 60

  // Calculate progress percentage
  const progress = 100 - (timeLeft / totalTime) * 100

  // Initialize audio
  useEffect(() => {
    if (!isAudioInitialized) {
      // Initialize the audio system
      initAudioSystem()

      // Preload the notification sounds
      preloadAudio([
        { id: "break-time", filename: "break-time.mp3" },
        { id: "focus-time", filename: "focus-time.mp3" },
      ])

      setIsAudioInitialized(true)
      setFallbackMode(isInFallbackMode())
    }
  }, [isAudioInitialized])

  // Update fallback mode status periodically
  useEffect(() => {
    const checkFallbackInterval = setInterval(() => {
      setFallbackMode(isInFallbackMode())
    }, 1000)

    return () => clearInterval(checkFallbackInterval)
  }, [])

  // Handle timer logic
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer completed
            clearInterval(timerRef.current as NodeJS.Timeout)

            // Switch modes
            if (mode === "focus") {
              setMode("break")
              setTimeLeft(5 * 60) // 5 minute break

              // Play notification sound or show visual notification
              playAudio("break-time")
              showTimerNotification("Break time! Take 5 minutes to relax.")

              // Increment completed cycles
              setCycles((prev) => prev + 1)
            } else {
              setMode("focus")
              setTimeLeft(25 * 60) // Back to 25 minute focus

              // Play notification sound or show visual notification
              playAudio("focus-time")
              showTimerNotification("Focus time! Let's get back to work.")
            }

            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive, mode])

  // Function to show a temporary notification
  const showTimerNotification = (message: string) => {
    setShowNotification(true)

    // Clear any existing timeout
    if (notificationRef.current) {
      clearTimeout(notificationRef.current)
    }

    // Hide notification after 3 seconds
    notificationRef.current = setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMode("focus")
    setTimeLeft(25 * 60)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center">
      {fallbackMode && (
        <div className="w-full text-xs bg-blue-50 p-2 rounded-md flex items-start gap-2 mb-4">
          <Info className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
          <span className="text-blue-700">Sound notifications will be displayed visually instead of played.</span>
        </div>
      )}

      <div className="w-full mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-800">{mode === "focus" ? "Focus Time" : "Break Time"}</span>
          <span className="text-sm text-blue-700">Cycles: {cycles}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {showNotification && (
        <div className="w-full mb-4 py-2 px-3 bg-blue-100 text-blue-800 rounded-md text-sm text-center animate-pulse">
          {mode === "focus" ? "Focus time! Let's get back to work." : "Break time! Take 5 minutes to relax."}
        </div>
      )}

      <div className="text-4xl font-bold mb-6 text-blue-900">{formatTime(timeLeft)}</div>

      <div className="flex gap-2">
        <Button
          onClick={toggleTimer}
          variant="outline"
          size="sm"
          className={`${mode === "focus" ? "border-blue-600 text-blue-700" : "border-green-600 text-green-700"}`}
        >
          {isActive ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
          {isActive ? "Pause" : "Start"}
        </Button>

        <Button onClick={resetTimer} variant="outline" size="sm" className="border-gray-300 text-gray-600">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="mt-4 text-xs text-center text-gray-500">
        <p>The Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break.</p>
      </div>
    </div>
  )
}
