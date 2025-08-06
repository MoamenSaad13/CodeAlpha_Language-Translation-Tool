import React, { useState } from 'react';

function Translator() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ar');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, source_lang: sourceLang, target_lang: targetLang })
      });

      const data = await response.json();

      if (data.success) {
        setTranslated(data.translated_text);
      } else {
        setTranslated("Translation failed: " + (data.error || "Unknown error"));
      }

    } catch (error) {
      setTranslated("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Language Translator</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows="4"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-2 mb-2">
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="border p-1 rounded w-1/2">
          <option value="en">English</option>
          <option value="auto">Detect</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
          {/* Add more as needed */}
        </select>

        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="border p-1 rounded w-1/2">
          <option value="ar">Arabic</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          {/* Add more as needed */}
        </select>
      </div>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Translating...' : 'Translate'}
      </button>

      {translated && (
        <div className="mt-4 p-3 border rounded bg-gray-50">
          <strong>Result:</strong> {translated}
        </div>
      )}
    </div>
  );
}

export default Translator;
