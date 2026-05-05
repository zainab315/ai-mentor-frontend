'use client'

import { useState } from 'react'

export default function Settings() {
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [darkMode, setDarkMode] = useState(false)
  const [voiceNavigation, setVoiceNavigation] = useState(false)

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="card space-y-6">
        <div className="flex justify-between items-center">
          <label htmlFor="text-to-speech" className="text-lg">Text-to-Speech</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="text-to-speech"
              className="absolute w-0 h-0 opacity-0"
              checked={textToSpeech}
              onChange={() => setTextToSpeech(!textToSpeech)}
            />
            <span className={`absolute left-0 w-6 h-6 transition duration-200 ease-in-out transform ${textToSpeech ? 'translate-x-6 bg-blue-600' : 'bg-gray-200'} rounded-full`}></span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="font-size" className="text-lg">Font Size</label>
          <input
            type="range"
            id="font-size"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full"
          />
          <p>Current font size: {fontSize}px</p>
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="dark-mode" className="text-lg">Dark Mode</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="dark-mode"
              className="absolute w-0 h-0 opacity-0"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className={`absolute left-0 w-6 h-6 transition duration-200 ease-in-out transform ${darkMode ? 'translate-x-6 bg-blue-600' : 'bg-gray-200'} rounded-full`}></span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <label htmlFor="voice-navigation" className="text-lg">Voice Navigation</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="voice-navigation"
              className="absolute w-0 h-0 opacity-0"
              checked={voiceNavigation}
              onChange={() => setVoiceNavigation(!voiceNavigation)}
            />
            <span className={`absolute left-0 w-6 h-6 transition duration-200 ease-in-out transform ${voiceNavigation ? 'translate-x-6 bg-blue-600' : 'bg-gray-200'} rounded-full`}></span>
          </div>
        </div>
      </div>

      <button className="mt-8 w-full btn-primary">
        Save Settings
      </button>
    </div>
  )
}

