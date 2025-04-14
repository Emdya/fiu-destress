"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function MotivationalQuote() {
  const [quote, setQuote] = useState({ text: "", author: "" })

  const quotes = [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    {
      text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
    },
    {
      text: "It's not about how bad you want it. It's about how hard you're willing to work for it.",
      author: "Unknown",
    },
    { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
    { text: "Panthers never give up!", author: "FIU Spirit" },
    { text: "Your education is a dress rehearsal for a life that is yours to lead.", author: "Nora Ephron" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  ]

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setQuote(quotes[randomIndex])
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
      <div className="mb-2 text-sm text-blue-900 italic">"{quote.text}"</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-blue-700">— {quote.author}</div>
        <Button onClick={getRandomQuote} variant="ghost" size="sm" className="h-7 w-7 p-0">
          <RefreshCw className="h-3 w-3" />
          <span className="sr-only">New Quote</span>
        </Button>
      </div>
    </div>
  )
}
