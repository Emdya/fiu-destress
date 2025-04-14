// Audio Manager with robust fallback system

// Map to store audio instances
const audioInstances: Map<string, HTMLAudioElement> = new Map()

// Flag to track if we're in fallback mode (no actual audio)
let inFallbackMode = false

// Function to get the full URL for an audio file
export function getAudioUrl(filename: string): string {
  // For development environment, use a direct path to the public folder
  return `/sounds/${filename}`
}

// Function to initialize audio system and determine if we need fallback mode
export function initAudioSystem(): boolean {
  try {
    // Create a test audio element to see if audio works at all
    const testAudio = new Audio()
    testAudio.volume = 0

    // Try to play it (this will likely fail if audio is not supported)
    const playPromise = testAudio.play()

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        console.log("Audio playback not supported, switching to fallback mode")
        inFallbackMode = true
      })
    }

    return true
  } catch (error) {
    console.error("Audio system initialization failed:", error)
    inFallbackMode = true
    return false
  }
}

// Function to preload audio files
export function preloadAudio(audioFiles: { id: string; filename: string }[]): void {
  if (inFallbackMode) {
    console.log("In fallback mode, skipping actual audio preloading")
    // Still register the audio IDs so the rest of the app works
    audioFiles.forEach((file) => {
      audioInstances.set(file.id, null as any)
    })
    return
  }

  audioFiles.forEach((file) => {
    try {
      // Create a new audio element
      const audio = new Audio()

      // Set error handler before setting src to catch loading errors
      audio.onerror = () => {
        console.log(`Audio ${file.id} failed to load, using fallback`)
        // If any audio fails to load, switch to fallback mode
        inFallbackMode = true
      }

      // Set audio properties
      audio.preload = "auto"

      // Set the source
      audio.src = getAudioUrl(file.filename)

      // Store the audio instance
      audioInstances.set(file.id, audio)

      console.log(`Registered audio: ${file.id}`)
    } catch (error) {
      console.error(`Failed to preload audio ${file.filename}:`, error)
      inFallbackMode = true
    }
  })
}

// Function to play audio
export function playAudio(id: string, volume = 1.0): void {
  if (inFallbackMode) {
    console.log(`[FALLBACK] Playing audio: ${id}`)
    return // In fallback mode, we just log and return
  }

  try {
    const audio = audioInstances.get(id)
    if (audio) {
      // Set volume (0.0 to 1.0)
      audio.volume = Math.min(Math.max(volume, 0), 1)

      // Reset the audio to the beginning if it's already playing
      audio.currentTime = 0

      // Play the audio
      const playPromise = audio.play()

      // Handle play promise (required for modern browsers)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error(`Error playing audio ${id}:`, error)
          inFallbackMode = true // Switch to fallback mode if play fails
        })
      }
    } else {
      console.warn(`Audio ${id} not found`)
    }
  } catch (error) {
    console.error(`Error playing audio ${id}:`, error)
    inFallbackMode = true // Switch to fallback mode if any error occurs
  }
}

// Function to stop audio
export function stopAudio(id: string): void {
  if (inFallbackMode) {
    console.log(`[FALLBACK] Stopping audio: ${id}`)
    return // In fallback mode, we just log and return
  }

  try {
    const audio = audioInstances.get(id)
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  } catch (error) {
    console.error(`Error stopping audio ${id}:`, error)
  }
}

// Function to set loop status
export function setAudioLoop(id: string, shouldLoop: boolean): void {
  if (inFallbackMode) return // Skip in fallback mode

  try {
    const audio = audioInstances.get(id)
    if (audio) {
      audio.loop = shouldLoop
    }
  } catch (error) {
    console.error(`Error setting loop for audio ${id}:`, error)
  }
}

// Function to set volume
export function setAudioVolume(id: string, volume: number): void {
  if (inFallbackMode) return // Skip in fallback mode

  try {
    const audio = audioInstances.get(id)
    if (audio) {
      audio.volume = Math.min(Math.max(volume, 0), 1)
    }
  } catch (error) {
    console.error(`Error setting volume for audio ${id}:`, error)
  }
}

// Function to check if audio is playing
export function isAudioPlaying(id: string): boolean {
  if (inFallbackMode) return false // Always return false in fallback mode

  try {
    const audio = audioInstances.get(id)
    return audio ? !audio.paused : false
  } catch (error) {
    console.error(`Error checking if audio ${id} is playing:`, error)
    return false
  }
}

// Function to check if we're in fallback mode
export function isInFallbackMode(): boolean {
  return inFallbackMode
}

// Explicitly set fallback mode (useful for components to force fallback)
export function setFallbackMode(fallback: boolean): void {
  inFallbackMode = fallback
}
