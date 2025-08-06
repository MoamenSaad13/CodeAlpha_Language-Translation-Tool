import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Copy, Volume2, ArrowRightLeft, Languages } from 'lucide-react'
import './App.css'

// Common languages for translation
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sl', name: 'Slovenian' },
  { code: 'et', name: 'Estonian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'th', name: 'Thai' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'tl', name: 'Filipino' },
  { code: 'he', name: 'Hebrew' },
  { code: 'fa', name: 'Persian' },
  { code: 'ur', name: 'Urdu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'kn', name: 'Kannada' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ne', name: 'Nepali' },
  { code: 'si', name: 'Sinhala' },
  { code: 'my', name: 'Myanmar (Burmese)' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'ka', name: 'Georgian' },
  { code: 'am', name: 'Amharic' },
  { code: 'sw', name: 'Swahili' },
  { code: 'zu', name: 'Zulu' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'is', name: 'Icelandic' },
  { code: 'mt', name: 'Maltese' },
  { code: 'cy', name: 'Welsh' },
  { code: 'ga', name: 'Irish' },
  { code: 'eu', name: 'Basque' },
  { code: 'ca', name: 'Catalan' },
  { code: 'gl', name: 'Galician' },
  { code: 'lb', name: 'Luxembourgish' }
]

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [copySuccess, setCopySuccess] = useState('')

  // Function to handle translation using the backend API
  const handleTranslate = async () => {
    if (!inputText.trim()) return
    
    setIsTranslating(true)
    
    try {
      // Make API call to the Vercel serverless function
      const response = await fetch('http://127.0.0.1:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          source_lang: sourceLanguage,
          target_lang: targetLanguage
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTranslatedText(data.translated_text)
      } else {
        console.error('Translation error:', data.error)
        setTranslatedText(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Network error:', error)
      setTranslatedText('Error: Failed to connect to translation service')
    } finally {
      setIsTranslating(false)
    }
  }

  // Function to swap languages
  const swapLanguages = () => {
    const tempLang = sourceLanguage
    setSourceLanguage(targetLanguage)
    setTargetLanguage(tempLang)
    
    // Also swap the text content
    const tempText = inputText
    setInputText(translatedText)
    setTranslatedText(tempText)
  }

  // Function to copy translated text to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(translatedText)
      setCopySuccess('Copied!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
      setCopySuccess('Failed to copy')
      setTimeout(() => setCopySuccess(''), 2000)
    }
  }

  // Function to speak the translated text
  const speakText = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText)
      utterance.lang = targetLanguage
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Languages className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Language Translation Tool
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Translate text between multiple languages instantly
          </p>
        </div>

        {/* Main Translation Interface */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center text-gray-800 dark:text-gray-200">
              Translation Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  From
                </label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={swapLanguages}
                  className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  To
                </label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Input and Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter text to translate
                </label>
                <Textarea
                  placeholder="Type your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[200px] resize-none border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {inputText.length} characters
                </div>
              </div>

              {/* Output Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Translation
                  </label>
                  <div className="flex gap-2">
                    {translatedText && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="h-8 px-3"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          {copySuccess || 'Copy'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={speakText}
                          className="h-8 px-3"
                        >
                          <Volume2 className="h-3 w-3 mr-1" />
                          Speak
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                <Textarea
                  placeholder="Translation will appear here..."
                  value={translatedText}
                  readOnly
                  className="min-h-[200px] resize-none bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {translatedText.length} characters
                </div>
              </div>
            </div>

            {/* Translate Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleTranslate}
                disabled={!inputText.trim() || isTranslating}
                className="px-8 py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isTranslating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Translating...
                  </div>
                ) : (
                  'Translate'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <Languages className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">60+ Languages</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support for major world languages
            </p>
          </Card>
          <Card className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <Copy className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Easy Copy</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              One-click copy to clipboard
            </p>
          </Card>
          <Card className="text-center p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
            <Volume2 className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Text-to-Speech</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Listen to translations
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App