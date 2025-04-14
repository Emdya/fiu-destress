"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import {
  preloadAudio,
  playAudio,
  stopAudio,
  setAudioLoop,
  setAudioVolume,
  isInFallbackMode,
  initAudioSystem,
} from "../utils/audio-manager"

type SoundOption = {
  id: string
  name: string
  icon: string
  filename: string
}

export function AmbientSounds() {
  const [activeSound, setActiveSound] = useState<string | null>(null)
  const [volume, setVolume] = useState(70)
  const [isInitialized, setIsInitialized] = useState(false)
  const [fallbackMode, setFallbackMode] = useState(false)

  const soundOptions: SoundOption[] = [
    { id: "rain", name: "Rain", icon: "🌧️", filename: "rain.mp3" },
    { id: "forest", name: "Forest", icon: "🌲", filename: "forest.mp3" },
    { id: "waves", name: "Waves", icon: "🌊", filename: "waves.mp3" },
    { id: "white-noise", name: "White Noise", icon: "📻", filename: "white-noise.mp3" },
  ]

  // Initialize audio on component mount
  useEffect(() => {
    if (!isInitialized) {
      // Initialize the audio system
      initAudioSystem()

      // Preload all audio files
      preloadAudio(soundOptions)

      // Set all ambient sounds to loop
      soundOptions.forEach((sound) => {
        setAudioLoop(sound.id, true)
      })

      setIsInitialized(true)

      // Check if we're in fallback mode
      setFallbackMode(isInFallbackMode())
    }

    // Cleanup on unmount
    return () => {
      // Stop any playing sounds when component unmounts
      if (activeSound) {
        stopAudio(activeSound)
      }
    }
  }, [isInitialized, activeSound])

  // Update fallback mode status periodically
  useEffect(() => {
    const checkFallbackInterval = setInterval(() => {
      setFallbackMode(isInFallbackMode())
    }, 1000)

    return () => clearInterval(checkFallbackInterval)
  }, [])

  // Update volume when it changes
  useEffect(() => {
    if (activeSound && !fallbackMode) {
      setAudioVolume(activeSound, volume / 100)
    }
  }, [volume, activeSound, fallbackMode])

  const toggleSound = (sound: SoundOption) => {
    // If this sound is already active, stop it
    if (activeSound === sound.id) {
      stopAudio(sound.id)
      setActiveSound(null)
    } else {
      // If another sound is playing, stop it first
      if (activeSound) {
        stopAudio(activeSound)
      }

      // Play the new sound
      playAudio(sound.id, volume / 100)
      setAudioLoop(sound.id, true)
      setActiveSound(sound.id)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume[0])
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-blue-800 flex items-center gap-2">
        <Volume2 className="h-4 w-4" /> Ambient Sounds
      </h3>

      {fallbackMode && (
        <div className="text-xs bg-blue-50 p-2 rounded-md flex items-start gap-2">
          <Info className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
          <span className="text-blue-700">Sound simulation mode active. Audio is visualized but not played.</span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {soundOptions.map((sound) => (
          <Button
            key={sound.id}
            onClick={() => toggleSound(sound)}
            variant="outline"
            size="sm"
            className={`flex flex-col h-auto py-2 px-1 ${
              activeSound === sound.id ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200"
            }`}
          >
            <span className="text-lg mb-1">{sound.icon}</span>
            <span className="text-xs">{sound.name}</span>
          </Button>
        ))}
      </div>

      {activeSound && (
        <div className="pt-2 flex items-center gap-3">
          <VolumeX className="h-3 w-3 text-gray-500" />
          <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="flex-1" />
          <Volume2 className="h-3 w-3 text-gray-500" />
        </div>
      )}

      {activeSound && (
        <div className="text-xs text-center text-green-600 animate-pulse">
          ▶ {fallbackMode ? "Simulating" : "Playing"} {soundOptions.find((s) => s.id === activeSound)?.name} sound...
        </div>
      )}
    </div>
  )
}
