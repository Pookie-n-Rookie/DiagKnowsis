'use client';

import { useState, useEffect } from 'react';

// Define the shape of our expected API response
interface DiseaseMatch {
  name: string;
  category: string;
  symptoms: string[];
  treatment: string;
  severity: string;
  specialist: string;
  match_score: number;
}

interface DiagnosisResponse {
  user_symptoms: string[];
  dataset_matches: DiseaseMatch[];
  ai_summary: string;
  disclaimer: string;
}

export default function Home() {
  const [allSymptoms, setAllSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch symptom list on component mount
  useEffect(() => {
    async function fetchSymptoms() {
      try {
        const res = await fetch('http://localhost:8000/api/symptoms/list');
        const data = await res.json();
        setAllSymptoms(data.symptoms);
      } catch (err) {
        console.error("Failed to load symptoms:", err);
      }
    }
    fetchSymptoms();
  }, []);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleDiagnose = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    setDiagnosis(null);

    try {
      const res = await fetch('http://localhost:8000/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptoms: selectedSymptoms,
          use_ai: true,
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch diagnosis');
      
      const data = await res.json();
      setDiagnosis(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter symptoms based on search input
  const filteredSymptoms = allSymptoms.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-blue-600">AI Symptom Checker</h1>
          <p className="text-gray-500">Select your symptoms to get a preliminary analysis.</p>
        </div>

        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">1. What are you experiencing?</h2>
          
          {/* Selected Symptoms Tags */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px] p-3 bg-blue-50 rounded-lg border border-blue-100">
            {selectedSymptoms.length === 0 && <span className="text-gray-400 italic text-sm">No symptoms selected yet...</span>}
            {selectedSymptoms.map(symp => (
              <span key={symp} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {symp}
                <button onClick={() => toggleSymptom(symp)} className="hover:text-red-200 font-bold">&times;</button>
              </span>
            ))}
          </div>

          {/* Search & Select */}
          <input 
            type="text"
            placeholder="Search symptoms (e.g., fever, cough)..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="max-h-48 overflow-y-auto flex flex-wrap gap-2 p-2 border border-gray-100 rounded-lg">
            {filteredSymptoms.slice(0, 30).map(symp => ( // Show max 30 to avoid rendering lag
              <button
                key={symp}
                onClick={() => toggleSymptom(symp)}
                className={`px-3 py-1 text-sm rounded-full transition-colors border ${
                  selectedSymptoms.includes(symp) 
                  ? 'bg-blue-100 border-blue-300 text-blue-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                + {symp}
              </button>
            ))}
          </div>

          <button 
            onClick={handleDiagnose}
            disabled={selectedSymptoms.length === 0 || isLoading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Analyzing...' : 'Get Diagnosis'}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Results Section */}
        {diagnosis && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* AI Summary */}
            <div className="bg-blue-900 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                🤖 AI Assessment
              </h3>
              <p className="whitespace-pre-wrap leading-relaxed opacity-90">
                {diagnosis.ai_summary}
              </p>
            </div>

            {/* Dataset Matches */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Possible Matches from Database</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {diagnosis.dataset_matches.map((match, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg text-gray-900">{match.name}</h4>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        {match.match_score}% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 capitalize">{match.category} • {match.severity} severity</p>
                    
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-700">Treatment:</strong> {match.treatment}</p>
                      <p><strong className="text-gray-700">See a:</strong> {match.specialist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200 text-center font-medium shadow-sm">
              {diagnosis.disclaimer}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}