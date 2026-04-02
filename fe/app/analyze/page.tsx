'use client';

import { useState, useEffect } from 'react';

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

// ─── Severity badge color ─────────────────────────────────────────────────────

function severityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'high':
    case 'severe':
      return '#E53E3E';
    case 'moderate':
    case 'medium':
      return '#DD6B20';
    default:
      return '#38B2AC';
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconX = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconBot = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" /><line x1="12" y1="7" x2="12" y2="11" />
    <line x1="8" y1="15" x2="8" y2="15" strokeWidth="3" /><line x1="12" y1="15" x2="12" y2="15" strokeWidth="3" /><line x1="16" y1="15" x2="16" y2="15" strokeWidth="3" />
  </svg>
);

const IconActivity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const IconAlertTriangle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconLoader = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
    <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" /><line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" /><line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyzePage() {
  const [allSymptoms, setAllSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSymptoms() {
      try {
        const res = await fetch('http://localhost:8000/api/symptoms/list');
        const data = await res.json();
        setAllSymptoms(data.symptoms);
      } catch (err) {
        console.error('Failed to load symptoms:', err);
      }
    }
    fetchSymptoms();
  }, []);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
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
        body: JSON.stringify({ symptoms: selectedSymptoms, use_ai: true }),
      });
      if (!res.ok) throw new Error('Failed to fetch diagnosis');
      const data = await res.json();
      setDiagnosis(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSymptoms = allSymptoms.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <main className="min-h-screen px-4 sm:px-6 py-10" style={{ background: '#E0E5EC' }}>
        <div className="max-w-4xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* ── Header ── */}
          <div style={{ textAlign: 'center' }}>
            <h1
              className="font-display"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#3D4852', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}
            >
              Symptom Analyzer
            </h1>
            <p style={{ color: '#6B7280', fontSize: '1rem' }}>
              Select your symptoms below to receive a preliminary AI-powered assessment.
            </p>
          </div>

          {/* ── Input card ── */}
          <div
            className="neu-card"
            style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {/* Step label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
                  boxShadow: '3px 3px 6px rgb(163,177,198,0.6), -3px -3px 6px rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: 11, fontWeight: 800,
                }}
              >
                1
              </div>
              <h2 className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#3D4852' }}>
                What are you experiencing?
              </h2>
            </div>

            {/* Selected symptoms well */}
            <div
              style={{
                minHeight: 56,
                borderRadius: 16,
                padding: '0.75rem 1rem',
                marginBottom: '1rem',
                boxShadow: 'inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              {selectedSymptoms.length === 0 ? (
                <span style={{ color: '#A0AEC0', fontSize: '0.875rem', fontStyle: 'italic' }}>
                  No symptoms selected yet…
                </span>
              ) : (
                selectedSymptoms.map((symp) => (
                  <span
                    key={symp}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                      background: 'linear-gradient(135deg, #6C63FF, #8B84FF)',
                      color: 'white', fontSize: '0.75rem', fontWeight: 600,
                      padding: '0.3rem 0.75rem', borderRadius: 9999,
                      boxShadow: '3px 3px 6px rgb(163,177,198,0.5), -3px -3px 6px rgba(255,255,255,0.4)',
                    }}
                  >
                    {symp}
                    <button
                      onClick={() => toggleSymptom(symp)}
                      style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                      aria-label={`Remove ${symp}`}
                    >
                      <IconX />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', pointerEvents: 'none' }}>
                <IconSearch />
              </span>
              <input
                type="text"
                placeholder="Search symptoms (e.g., fever, cough)…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neu-input"
                style={{ width: '100%', paddingLeft: '2.75rem', paddingRight: '1.25rem', paddingTop: '0.875rem', paddingBottom: '0.875rem', fontSize: '0.875rem' }}
              />
            </div>

            {/* Symptom pills grid */}
            <div
              style={{
                maxHeight: 192,
                overflowY: 'auto',
                borderRadius: 16,
                padding: '0.75rem',
                boxShadow: 'inset 4px 4px 8px rgb(163,177,198,0.5), inset -4px -4px 8px rgba(255,255,255,0.4)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              {filteredSymptoms.slice(0, 40).map((symp) => {
                const selected = selectedSymptoms.includes(symp);
                return (
                  <button
                    key={symp}
                    onClick={() => toggleSymptom(symp)}
                    style={{
                      padding: '0.35rem 0.875rem',
                      borderRadius: 9999,
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: 'none',
                      background: '#E0E5EC',
                      color: selected ? '#6C63FF' : '#6B7280',
                      transition: 'all 200ms ease-out',
                      boxShadow: selected
                        ? 'inset 3px 3px 6px rgb(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5)'
                        : '3px 3px 6px rgb(163,177,198,0.5), -3px -3px 6px rgba(255,255,255,0.5)',
                    }}
                  >
                    {selected ? '✓ ' : '+ '}{symp}
                  </button>
                );
              })}
              {filteredSymptoms.length === 0 && (
                <p style={{ color: '#A0AEC0', fontSize: '0.875rem', padding: '0.5rem' }}>No symptoms match your search.</p>
              )}
            </div>

            {/* Diagnose button */}
            <button
              onClick={handleDiagnose}
              disabled={selectedSymptoms.length === 0 || isLoading}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: 16,
                fontSize: '1rem',
                fontWeight: 700,
                color: 'white',
                border: 'none',
                cursor: selectedSymptoms.length === 0 || isLoading ? 'not-allowed' : 'pointer',
                opacity: selectedSymptoms.length === 0 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {isLoading ? (
                <><IconLoader /> Analyzing symptoms…</>
              ) : (
                <><IconActivity /> Analyze {selectedSymptoms.length > 0 ? `${selectedSymptoms.length} symptom${selectedSymptoms.length > 1 ? 's' : ''}` : 'symptoms'}</>
              )}
            </button>
          </div>

          {/* ── Error ── */}
          {error && (
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.25rem', borderRadius: 20,
                background: '#E0E5EC', color: '#E53E3E',
                boxShadow: 'inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
              }}
            >
              <IconAlertTriangle />
              <span style={{ fontWeight: 500 }}>{error}</span>
            </div>
          )}

          {/* ── Results ── */}
          {diagnosis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* AI Summary */}
              <div
                style={{
                  borderRadius: 32, padding: 'clamp(1.5rem, 4vw, 2rem)',
                  background: '#E0E5EC',
                  boxShadow: '9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255,0.5)',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: 'inset 6px 6px 10px rgb(163,177,198,0.7), inset -6px -6px 10px rgba(255,255,255,0.6)',
                      color: '#6C63FF',
                    }}
                  >
                    <IconBot />
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#3D4852' }}>
                      AI Assessment
                    </h3>
                    <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Powered by LLaMA</p>
                  </div>
                </div>

                {/* Summary text in inset well */}
                <div
                  style={{
                    borderRadius: 20, padding: '1.25rem 1.5rem',
                    boxShadow: 'inset 8px 8px 16px rgb(163,177,198,0.6), inset -8px -8px 16px rgba(255,255,255,0.5)',
                  }}
                >
                  <p style={{ color: '#3D4852', lineHeight: 1.75, fontSize: '0.9375rem', whiteSpace: 'pre-wrap' }}>
                    {diagnosis.ai_summary}
                  </p>
                </div>
              </div>

              {/* Dataset matches */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: 'linear-gradient(135deg, #38B2AC, #5BBFBA)',
                      boxShadow: '3px 3px 6px rgb(163,177,198,0.6), -3px -3px 6px rgba(255,255,255,0.5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontSize: 11, fontWeight: 800,
                    }}
                  >
                    2
                  </div>
                  <h3 className="font-display" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#3D4852' }}>
                    Possible Matches
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', marginLeft: '0.25rem' }}>
                    ({diagnosis.dataset_matches.length} found)
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {diagnosis.dataset_matches.map((match, idx) => (
                    <div
                      key={idx}
                      className="neu-card"
                      style={{ padding: '1.5rem' }}
                    >
                      {/* Match header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <h4 className="font-display" style={{ fontWeight: 700, fontSize: '1rem', color: '#3D4852', flex: 1, marginRight: '0.5rem' }}>
                          {match.name}
                        </h4>
                        {/* Match score badge */}
                        <div
                          style={{
                            padding: '0.25rem 0.625rem',
                            borderRadius: 9999,
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#38B2AC',
                            boxShadow: 'inset 3px 3px 6px rgb(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.5)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {match.match_score}% match
                        </div>
                      </div>

                      {/* Category + severity */}
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280', textTransform: 'capitalize' }}>
                          {match.category}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>•</span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: severityColor(match.severity), textTransform: 'capitalize' }}>
                          {match.severity} severity
                        </span>
                      </div>

                      {/* Details in inset wells */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                        <div
                          style={{
                            borderRadius: 12, padding: '0.625rem 0.875rem',
                            boxShadow: 'inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5)',
                          }}
                        >
                          <p style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Treatment</p>
                          <p style={{ fontSize: '0.8125rem', color: '#3D4852' }}>{match.treatment}</p>
                        </div>
                        <div
                          style={{
                            borderRadius: 12, padding: '0.625rem 0.875rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            boxShadow: 'inset 4px 4px 8px rgb(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.5)',
                          }}
                        >
                          <span style={{ color: '#6C63FF' }}><IconUser /></span>
                          <p style={{ fontSize: '0.8125rem', color: '#3D4852' }}>{match.specialist}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                  borderRadius: 20, padding: '1.25rem 1.5rem',
                  boxShadow: 'inset 6px 6px 10px rgb(163,177,198,0.6), inset -6px -6px 10px rgba(255,255,255,0.5)',
                }}
              >
                <span style={{ color: '#DD6B20', flexShrink: 0, marginTop: '0.1rem' }}><IconAlertTriangle /></span>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.6 }}>
                  {diagnosis.disclaimer}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  );
}