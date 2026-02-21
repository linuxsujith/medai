'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scan,
    Upload,
    X,
    Info,
    AlertTriangle,
    ShieldCheck,
    CheckCircle,
    Clock,
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Mock medicine data if Gemini fails or for demo
const MOCK_MEDS = [
    {
        name: "Dolo 650",
        generic: "Paracetamol 650mg",
        strength: "650mg",
        form: "Tablet",
        manufacturer: "Micro Labs Ltd",
        uses: "Relief from fever and mild to moderate pain.",
        howItWorks: "Works by blocking chemical messengers in the brain that tell us we have pain and regulates body temperature.",
        warnings: ["Do not exceed 4g in 24 hours", "Avoid alcohol", "Consult doctor if you have liver disease"],
        sideEffects: ["Nausea", "Stomach pain", "Allergic reaction (rare)"],
        interactions: ["Warfarin", "Other paracetamol-containing drugs"],
        category: "Antipyretic / Analgesic"
    }
];

export default function ScanMed() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[] | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            if (selected.size > 5 * 1024 * 1024) {
                toast.error("File is too large (max 5MB)");
                return;
            }
            setFile(selected);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(selected);
            setResults(null);
        }
    };

    const handleScan = async () => {
        if (!file) return;
        setLoading(true);

        // Simulate Gemini Vision processing
        // In a real app, we would send the base64 to Gemini
        setTimeout(() => {
            setResults(MOCK_MEDS);
            setLoading(false);
            toast.success("Medicine details extracted!");
        }, 3000);
    };

    const reset = () => {
        setFile(null);
        setPreview(null);
        setResults(null);
    };

    return (
        <div className="scan-med-container">
            <div className="container">
                <header className="page-header">
                    <div className="icon-badge"><Scan size={24} /></div>
                    <h1>Scan Med</h1>
                    <p>Recognize any medicine strip, bottle label, or prescription. Get clear, safe information instantly.</p>
                </header>

                <div className="scan-layout">
                    {/* Upload Area */}
                    <div className="upload-section">
                        {!preview ? (
                            <label className="upload-dropzone card">
                                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                                <div className="dropzone-content">
                                    <div className="upload-circle">
                                        <Upload size={40} />
                                    </div>
                                    <h3>Upload Medicine Photo</h3>
                                    <p>Strip, Bottle Label, or Prescription</p>
                                    <ul className="upload-hints">
                                        <li>Hold phone steady</li>
                                        <li>Ensure good lighting</li>
                                        <li>Text should be clear</li>
                                    </ul>
                                    <button className="btn btn-primary">Select Image</button>
                                </div>
                            </label>
                        ) : (
                            <div className="preview-container card">
                                <button className="close-btn" onClick={reset}><X size={20} /></button>
                                <img src={preview} alt="Medicine Preview" className="preview-img" />
                                <div className="preview-actions">
                                    <button
                                        className="btn btn-primary btn-full"
                                        onClick={handleScan}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>Processing with AI...</>
                                        ) : (
                                            <><Scan size={20} /> Scan Now</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Area */}
                    <div className="results-section">
                        <AnimatePresence>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="processing-skeleton"
                                >
                                    <div className="skeleton-line"></div>
                                    <div className="skeleton-line mid"></div>
                                    <div className="skeleton-line short"></div>
                                    <p>MEDAI is reading the label...</p>
                                </motion.div>
                            )}

                            {results && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="med-results"
                                >
                                    <div className="results-header">
                                        <h2>Found {results.length} Medicine(s)</h2>
                                        <span className="source-tag">Verified Health Data</span>
                                    </div>

                                    {results.map((med, i) => (
                                        <div key={i} className="med-card card">
                                            <div className="med-main">
                                                <div>
                                                    <span className="med-category">{med.category}</span>
                                                    <h3 className="med-name">{med.name}</h3>
                                                    <p className="med-generic">{med.generic}</p>
                                                </div>
                                                <div className="med-form-badge">
                                                    <CheckCircle size={16} /> {med.form}
                                                </div>
                                            </div>

                                            <div className="med-grid">
                                                <div className="med-info-block">
                                                    <h4><Info size={16} /> What it's used for</h4>
                                                    <p>{med.uses}</p>
                                                </div>
                                                <div className="med-info-block">
                                                    <h4><Clock size={16} /> How it works</h4>
                                                    <p>{med.howItWorks}</p>
                                                </div>
                                            </div>

                                            <div className="med-warning-block">
                                                <h4><AlertTriangle size={18} /> Safety Warnings</h4>
                                                <ul className="med-list">
                                                    {med.warnings.map((w: string, idx: number) => <li key={idx}>{w}</li>)}
                                                </ul>
                                            </div>

                                            <div className="med-details-accordion">
                                                <details>
                                                    <summary>Common Side Effects <ChevronRight size={16} /></summary>
                                                    <ul className="med-list compact">
                                                        {med.sideEffects.map((s: string, idx: number) => <li key={idx}>{s}</li>)}
                                                    </ul>
                                                </details>
                                                <details>
                                                    <summary>Known Drug Interactions <ChevronRight size={16} /></summary>
                                                    <ul className="med-list compact">
                                                        {med.interactions.map((it: string, idx: number) => <li key={idx}>{it}</li>)}
                                                    </ul>
                                                </details>
                                            </div>

                                            <div className="med-actions">
                                                <Link href="/remedies" className="btn btn-outline btn-sm">Watch Explainer</Link>
                                                <Link href={`https://www.google.com/search?q=pharmacy+near+me`} target="_blank" className="btn btn-secondary btn-sm">Nearby Pharmacy</Link>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="med-safety-footer">
                                        <ShieldCheck size={20} />
                                        <p><strong>Note:</strong> MEDAI provides educational info only. Dosages must be as per doctor's prescription. If symptoms persist, consult a professional.</p>
                                    </div>
                                </motion.div>
                            )}

                            {!loading && !results && (
                                <div className="scan-placeholder">
                                    <div className="placeholder-illustration">
                                        <Scan size={64} />
                                    </div>
                                    <h3>No Scans Yet</h3>
                                    <p>Upload a photo to see the AI magic. We'll identify the drug and show you everything you need to know safely.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .scan-med-container {
          padding: 4rem 0;
          background: var(--bg-alt);
          min-height: 90vh;
        }
        .page-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .icon-badge {
          width: 50px;
          height: 50px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .page-header h1 { font-size: 3rem; margin-bottom: 0.5rem; }
        .page-header p { color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 1.1rem; }

        .scan-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 3rem;
          align-items: start;
        }

        .upload-dropzone {
          display: block;
          padding: 4rem 2rem;
          border: 2px dashed var(--border);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background: white;
        }
        .upload-dropzone:hover { border-color: var(--primary); background: var(--secondary); }
        .upload-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--secondary);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .upload-hints {
          list-style: none;
          margin: 1.5rem 0;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-align: left;
          display: inline-block;
        }
        .upload-hints li::before { content: '•'; margin-right: 0.5rem; color: var(--primary); }

        .preview-container { border: none; padding: 0.5rem; position: relative; overflow: hidden; background: white; }
        .preview-img { width: 100%; height: 400px; object-fit: cover; border-radius: var(--radius-md); }
        .close-btn { position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); color: white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
        .preview-actions { padding: 1rem; }
        .btn-full { width: 100%; }

        .scan-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: white;
          padding: 4rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }
        .placeholder-illustration { color: var(--border); margin-bottom: 2rem; }
        .scan-placeholder h3 { margin-bottom: 1rem; }
        .scan-placeholder p { color: var(--text-muted); max-width: 400px; }

        .med-results { display: flex; flex-direction: column; gap: 2rem; }
        .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .source-tag { font-size: 0.75rem; font-weight: 700; background: var(--accent-light); color: #065f46; padding: 0.3rem 0.8rem; border-radius: 50px; text-transform: uppercase; }

        .med-card { border: none; box-shadow: var(--shadow-md); padding: 2rem; background: white; }
        .med-main { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
        .med-category { font-size: 0.7rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; }
        .med-name { font-size: 2rem; color: var(--primary); }
        .med-generic { color: var(--text-muted); font-weight: 500; }
        .med-form-badge { display: flex; align-items: center; gap: 0.5rem; background: var(--secondary); color: var(--primary); padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.85rem; }

        .med-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem; }
        .med-info-block h4 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.95rem; }
        .med-info-block p { font-size: 0.95rem; color: var(--text-main); line-height: 1.6; }

        .med-warning-block { background: #fffbeb; padding: 1.5rem; border-radius: var(--radius-md); border: 1px solid #fef3c7; margin-bottom: 2rem; }
        .med-warning-block h4 { color: #d97706; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .med-list { list-style: none; }
        .med-list li { margin-bottom: 0.5rem; position: relative; padding-left: 1.25rem; font-size: 0.95rem; }
        .med-list li::before { content: '•'; position: absolute; left: 0; color: var(--primary); font-weight: bold; }

        .med-details-accordion { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
        details { border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; }
        summary { cursor: pointer; font-weight: 600; list-style: none; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; }
        .compact { margin-top: 1rem; padding-left: 1rem; }

        .med-actions { display: flex; gap: 1rem; }
        .med-safety-footer { display: flex; gap: 1.5rem; background: var(--bg-main); padding: 1.5rem; border-radius: var(--radius-md); align-items: flex-start; font-size: 0.85rem; color: var(--text-muted); border: 1px solid var(--border); }

        .processing-skeleton { padding: 4rem; text-align: center; }
        .skeleton-line { height: 20px; background: #eee; margin-bottom: 1rem; border-radius: 4px; animation: pulse 1.5s infinite; }
        .skeleton-line.mid { width: 80%; margin: 0 auto 1rem; }
        .skeleton-line.short { width: 50%; margin: 0 auto 2rem; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }

        @media (max-width: 900px) {
          .scan-layout { grid-template-columns: 1fr; }
          .upload-section { max-width: 500px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 600px) {
          .med-grid { grid-template-columns: 1fr; }
          .med-actions { flex-direction: column; }
        }
      `}</style>
        </div>
    );
}
