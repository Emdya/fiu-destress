import { Keyboard } from "lucide-react"

export function HotkeyInfo() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2">
      <Keyboard className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-sm font-medium text-amber-800">Quick Access Hotkey</h3>
        <p className="text-xs text-amber-700 mt-1">
          Press the{" "}
          <kbd className="px-1.5 py-0.5 bg-white border border-amber-300 rounded text-amber-800 font-mono text-xs">
            C
          </kbd>{" "}
          key anywhere to quickly access FIU Canva login page.
        </p>
      </div>
    </div>
  )
}
