// Initialize the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log("FIU Finals Week Destress extension installed")

  // Show a welcome message with information about the hotkey
  chrome.notifications.create({
    type: "basic",
    iconUrl: "images/icon128.png",
    title: "FIU Finals Week Destress",
    message: 'Extension installed! Press "C" key to quickly access FIU Canva.',
    priority: 2,
  })
})

// Listen for messages from the popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "playAudio") {
    // Handle audio playback requests if needed
    sendResponse({ success: true })
  }

  if (message.action === "open_canva") {
    // Open the FIU Canva login page
    chrome.tabs.create({ url: "https://fiu.instructure.com/login/canvas" })
    sendResponse({ success: true })
  }

  return true // Required for async sendResponse
})

// Set up the command listener for the Canva hotkey
chrome.commands.onCommand.addListener((command) => {
  if (command === "open_canva") {
    // Open the FIU Canva login page
    chrome.tabs.create({ url: "https://fiu.instructure.com/login/canvas" })
  }
})
