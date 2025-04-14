// This script runs in the context of web pages
console.log("FIU Finals Week Destress extension content script loaded")

// Listen for the 'c' key press
document.addEventListener("keydown", (event) => {
  // Check if the key pressed is 'c' and no modifier keys are pressed
  if (event.key === "c" && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
    // Make sure we're not in an input field or textarea
    const activeElement = document.activeElement
    const isInput =
      activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable

    if (!isInput) {
      // Send a message to the background script to open Canva
      chrome.runtime.sendMessage({ action: "open_canva" })
    }
  }
})
