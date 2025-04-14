"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Coffee, Map, Brain, GraduationCap } from "lucide-react"
import { PomodoroTimer } from "./components/pomodoro-timer"
import { BreathingExercise } from "./components/breathing-exercise"
import { ResourceLinks } from "./components/resource-links"
import { MotivationalQuote } from "./components/motivational-quote"
import { StudyTips } from "./components/study-tips"
import { AmbientSounds } from "./components/ambient-sounds"
import { QuickDestress } from "./components/quick-destress"
import { HotkeyInfo } from "./components/hotkey-info"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function Popup() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Initialize Chrome extension APIs if available
    if (typeof window !== "undefined" && typeof chrome !== "undefined" && chrome.runtime) {
      // Send a message to the background script if needed
      const chromeRuntime = chrome.runtime
      chromeRuntime.sendMessage({ action: "popupOpened" })
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      className={`w-[400px] h-[500px] p-4 bg-gradient-to-br from-blue-50 to-blue-100 overflow-y-auto ${poppins.variable} font-sans`}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-blue-900" />
          <h1 className="text-xl font-bold text-blue-900">Panther Finals Helper</h1>
        </div>
        <span className="text-xs text-blue-700 font-medium">Finals Week</span>
      </header>

      <div className="mb-4">
        <HotkeyInfo />
      </div>

      <Tabs defaultValue="pomodoro" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="pomodoro" className="flex flex-col items-center gap-1 py-2">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Focus</span>
          </TabsTrigger>
          <TabsTrigger value="destress" className="flex flex-col items-center gap-1 py-2">
            <Coffee className="h-4 w-4" />
            <span className="text-xs">Destress</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex flex-col items-center gap-1 py-2">
            <Map className="h-4 w-4" />
            <span className="text-xs">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex flex-col items-center gap-1 py-2">
            <Brain className="h-4 w-4" />
            <span className="text-xs">Tips</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pomodoro" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pomodoro Timer</CardTitle>
              <CardDescription>Stay focused with timed study sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <PomodoroTimer />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="destress" className="mt-0">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Destress Zone</h2>
              <p className="text-xs text-blue-100">Take a moment to relax and recharge</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="overflow-hidden border-blue-100">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b border-blue-100">
                  <h3 className="font-medium text-blue-800">Breathing Exercise</h3>
                </div>
                <CardContent className="pt-4">
                  <BreathingExercise />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-blue-100">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b border-blue-100">
                  <h3 className="font-medium text-blue-800">Quick Destress</h3>
                </div>
                <CardContent className="pt-4">
                  <QuickDestress />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-blue-100">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b border-blue-100">
                  <h3 className="font-medium text-blue-800">Ambient Sounds</h3>
                </div>
                <CardContent className="pt-4">
                  <AmbientSounds />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-blue-100">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b border-blue-100">
                  <h3 className="font-medium text-blue-800">Motivation</h3>
                </div>
                <CardContent className="pt-4">
                  <MotivationalQuote />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>FIU Resources</CardTitle>
              <CardDescription>Quick access to campus resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ResourceLinks />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="mt-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Study Tips</CardTitle>
              <CardDescription>Effective strategies for finals week</CardDescription>
            </CardHeader>
            <CardContent>
              <StudyTips />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="mt-4 text-center text-xs text-blue-700">
        <p>Created for FIU Panthers 🐾</p>
      </footer>
    </div>
  )
}
