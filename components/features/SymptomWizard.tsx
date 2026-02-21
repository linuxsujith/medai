'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertTriangle,
    Upload,
    X,
    Stethoscope,
    Clock,
    Activity,
    User as UserIcon,
    Video,
    MapPin,
    Download
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { analyzeSymptoms } from '@/lib/gemini';

const STEPS = [
    { id: 1, title: 'Basics', icon: UserIcon },
    { id: 2, title: 'Symptoms', icon: Stethoscope },
    { id: 3, title: 'Media', icon: Upload },
    { id: 4, title: 'Report', icon: CheckCircle },
];

const SYMPTOM_TAGS = [
    "Fever", "Cough", "Headache", "Sore Throat", "Stomach Pain",
    "Acidity", "Vomiting", "Diarrhea", "Rash", "Body Pain",
    "Dizziness", "Fatigue", "Runny Nose", "Nausea", "Back Pain"
];

const RED_FLAGS = [
    { id: 'breathing', label: "Breathing trouble" },
    { id: 'chest_pain', label: "Chest pain" },
    { id: 'fainting', label: "Fainting" },
    { id: 'weakness', label: "Severe weakness" },
    { id: 'blood', label: "Blood in vomit/stool" },
    { id: 'confusion', label: "Sudden Confusion" }
];

export default function SymptomWizard() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        city: '',
        conditions: [] as string[],
        allergies: [] as string[],
        description: '',
        tags: [] as string[],
        redFlags: [] as string[],
        severity: 5,
        duration: '24 hours',
    });
    const [report, setReport] = useState<any>(null);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleToggleTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const handleToggleRedFlag = (id: string) => {
        setFormData(prev => ({
            ...prev,
            redFlags: prev.redFlags.includes(id)
                ? prev.redFlags.filter(t => t !== id)
                : [...prev.redFlags, id]
        }));
    };

    const handleGenerateReport = async () => {
        if (!formData.description && formData.tags.length === 0) {
            toast.error("Please describe your symptoms or select tags.");
            return;
        }

        setLoading(true);
        try {
            const result = await analyzeSymptoms(formData);
            setReport(result);
            setStep(4);
            toast.success("Health report generated successfully!");
        } catch (error: any) {
            toast.error(error.message || "Failed to generate report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wizard-outer">
            {/* Stepper */}
            <div className="stepper">
                {STEPS.map((s) => (
                    <div key={s.id} className={`step-item ${step >= s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
                        <div className="step-icon">
                            {step > s.id ? <CheckCircle size={18} /> : <s.icon size={18} />}
                        </div>
                        <span>{s.title}</span>
                    </div>
                ))}
            </div>

            <div className="wizard-card card animate-fade-in">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h2>Step 1: Basics (Optional)</h2>
                            <p className="step-desc">Help us understand you better for a more accurate guidance.</p>

                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Age</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 25"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Sex</label>
                                    <select
                                        value={formData.sex}
                                        onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Existing Conditions (e.g. Diabetes, BP)</label>
                                <input
                                    type="text"
                                    placeholder="Enter and comma separate"
                                    onChange={(e) => setFormData({ ...formData, conditions: e.target.value.split(',').map(s => s.trim()) })}
                                />
                            </div>

                            <div className="actions">
                                <button className="btn btn-primary" onClick={nextStep}>
                                    Continue <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h2>Step 2: Describe Symptoms</h2>

                            <div className="input-group">
                                <label>What are you feeling? (Required)</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your symptoms in detail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="tag-section">
                                <label>Quick Tags</label>
                                <div className="tag-grid">
                                    {SYMPTOM_TAGS.map(tag => (
                                        <button
                                            key={tag}
                                            className={`tag-btn ${formData.tags.includes(tag) ? 'active' : ''}`}
                                            onClick={() => handleToggleTag(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="red-flag-section">
                                <label className="red-label"><AlertTriangle size={18} /> Red Flags (Select if applicable)</label>
                                <div className="flag-grid">
                                    {RED_FLAGS.map(flag => (
                                        <label key={flag.id} className="flag-item">
                                            <input
                                                type="checkbox"
                                                checked={formData.redFlags.includes(flag.id)}
                                                onChange={() => handleToggleRedFlag(flag.id)}
                                            />
                                            {flag.label}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="slider-group">
                                <label>Severity (1 - Mild, 10 - Extreme): {formData.severity}</label>
                                <input
                                    type="range"
                                    min="1" max="10"
                                    value={formData.severity}
                                    onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                                />
                            </div>

                            <div className="actions">
                                <button className="btn btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                                <button className="btn btn-primary" onClick={nextStep}>Continue <ArrowRight size={18} /></button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="step-content"
                        >
                            <h2>Step 3: Upload Photos (Optional)</h2>
                            <p>Upload rash/skin photos, reports, or prescriptions to help our AI.</p>

                            <div className="upload-box">
                                <Upload size={48} className="upload-icon" />
                                <p>Click or drag photos to upload</p>
                                <span>Max size 5MB. Jpeg, Png supported.</span>
                            </div>

                            <div className="privacy-note">
                                <CheckCircle size={14} /> Upload is optional. You can skip and still get help.
                            </div>

                            <div className="actions">
                                <button className="btn btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleGenerateReport}
                                    disabled={loading}
                                >
                                    {loading ? 'Analyzing...' : 'Generate Health Report'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && report && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="report-view"
                        >
                            <div className={`report-header ${report.riskLevel.toLowerCase()}`}>
                                <div className="header-info">
                                    <h2>Health Guidance Report</h2>
                                    <p>Generated by MEDAI Professional</p>
                                </div>
                                <div className="risk-badge">
                                    <span className="risk-label">Risk Level</span>
                                    <span className="risk-value">{report.riskLevel}</span>
                                </div>
                            </div>

                            {report.emergencyMode && (
                                <div className="emergency-banner">
                                    <AlertTriangle size={24} />
                                    <div>
                                        <h3>Potential Emergency Detected</h3>
                                        <p>Your symptoms may require immediate medical attention. Please visit the nearest Emergency Room or call 108 (India).</p>
                                        <Link href="/hospitals" className="btn btn-primary btn-sm">Nearest Hospitals</Link>
                                    </div>
                                </div>
                            )}

                            <div className="report-sections">
                                <section className="report-section">
                                    <h3><Clock size={18} /> Quick Summary</h3>
                                    <p>{report.summary}</p>
                                </section>

                                <section className="report-section">
                                    <h3><Activity size={18} /> Possible Causes</h3>
                                    <div className="causes-list">
                                        {report.possibleCauses.map((c: any, i: number) => (
                                            <div key={i} className="cause-item">
                                                <span className="cause-name">{c.cause}</span>
                                                <div className="confidence-bar">
                                                    <div className="bar-fill" style={{ width: c.confidence }}></div>
                                                    <span>{c.confidence}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="grid-2">
                                    <section className="report-section">
                                        <h3>What You Can Do Now</h3>
                                        <ul className="check-list">
                                            {report.actions.map((a: string, i: number) => <li key={i}>{a}</li>)}
                                        </ul>
                                    </section>
                                    <section className="report-section">
                                        <h3>Home Care & Remedies</h3>
                                        <ul className="check-list highlight-list">
                                            {report.homeCare.map((h: string, i: number) => <li key={i}>{h}</li>)}
                                        </ul>
                                    </section>
                                </div>

                                <div className="grid-2">
                                    <section className="report-section warning-section">
                                        <h3>What to Avoid</h3>
                                        <ul className="bullet-list">
                                            {report.toAvoid.map((v: string, i: number) => <li key={i}>{v}</li>)}
                                        </ul>
                                    </section>
                                    <section className="report-section urgent-section">
                                        <h3>Urgent Signs to Watch</h3>
                                        <ul className="bullet-list">
                                            {report.urgentSigns.map((s: string, i: number) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </section>
                                </div>

                                <section className="report-section">
                                    <h3>Recommended Tests (Non-Mandatory)</h3>
                                    <div className="tag-grid">
                                        {report.recommendedTests.map((t: string, i: number) => <span key={i} className="report-tag">{t}</span>)}
                                    </div>
                                </section>

                                <section className="report-section med-info">
                                    <h3>Medicine Information (Educational Only)</h3>
                                    <p>{report.medicineInfo}</p>
                                    <div className="disclaimer-mini">
                                        Follow your doctor's instructions. Never take medicine without consultation.
                                    </div>
                                </section>
                            </div>

                            <div className="report-actions">
                                <button className="btn btn-primary"><Download size={18} /> Download PDF</button>
                                <Link href="/remedies" className="btn btn-secondary"><Video size={18} /> Watch Remedies</Link>
                                <Link href="/hospitals" className="btn btn-secondary"><MapPin size={18} /> Nearby Hospitals</Link>
                            </div>

                            <div className="final-disclaimer">
                                <strong>Disclaimer:</strong> This report is for information purposes only and is NOT a medical diagnosis, prescription, or professional advice. If you are experiencing a life-threatening emergency, call emergency services immediately.
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
        .wizard-outer {
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        .stepper {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-muted);
          position: relative;
          flex: 1;
        }
        .step-item:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--border);
          z-index: 0;
        }
        .step-item.active { color: var(--primary); }
        .step-item.completed:not(:last-child)::after { background: var(--primary); }
        .step-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: white;
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .step-item.active .step-icon { border-color: var(--primary); background: var(--secondary); }
        .step-item.completed .step-icon { border-color: var(--primary); background: var(--primary); color: white; }

        .wizard-card {
          padding: 2.5rem;
          min-height: 500px;
        }
        .step-content h2 { margin-bottom: 0.5rem; }
        .step-desc { color: var(--text-muted); margin-bottom: 2rem; }

        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .input-group { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .input-group label { font-weight: 600; color: var(--text-main); font-size: 0.9rem; }
        input, select, textarea {
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 1rem;
        }
        
        .tag-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.75rem; }
        .tag-btn {
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: white;
          font-size: 0.85rem;
          transition: all 0.2s;
        }
        .tag-btn.active { background: var(--primary); color: white; border-color: var(--primary); }

        .red-flag-section {
          background: #fff5f5;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.5rem;
          border: 1px solid #fee2e2;
        }
        .red-label { color: var(--emergency) !important; display: flex; align-items: center; gap: 0.5rem; }
        .flag-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
        .flag-item { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; cursor: pointer; }

        .upload-box {
          border: 2px dashed var(--border);
          border-radius: var(--radius-md);
          padding: 3rem;
          text-align: center;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }
        .upload-icon { color: var(--primary); margin-bottom: 1rem; }
        .privacy-note { font-size: 0.85rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem; }

        .actions { margin-top: 3rem; display: flex; justify-content: flex-end; gap: 1rem; }

        /* Report Styles */
        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 2rem;
          border-bottom: 2px solid var(--border);
          margin-bottom: 2rem;
        }
        .risk-badge { text-align: right; }
        .risk-label { display: block; font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; }
        .risk-value { font-size: 1.5rem; font-weight: 700; }
        .low .risk-value { color: var(--accent); }
        .medium .risk-value { color: var(--warning); }
        .high .risk-value { color: var(--emergency); }

        .emergency-banner {
          background: var(--emergency);
          color: white;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .emergency-banner h3 { margin-bottom: 0.25rem; }
        .emergency-banner p { margin-bottom: 1rem; }

        .report-section { margin-bottom: 2.5rem; }
        .report-section h3 { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: var(--primary); }
        .causes-list { display: flex; flex-direction: column; gap: 1rem; }
        .cause-item { display: flex; align-items: center; gap: 1rem; }
        .cause-name { width: 150px; font-weight: 600; }
        .confidence-bar { flex: 1; height: 10px; background: var(--border); border-radius: 5px; position: relative; }
        .bar-fill { height: 100%; background: var(--primary); border-radius: 5px; }
        .confidence-bar span { position: absolute; right: 0; top: -20px; font-size: 0.75rem; font-weight: 700; }

        .check-list { list-style: none; }
        .check-list li { margin-bottom: 0.75rem; position: relative; padding-left: 1.5rem; }
        .check-list li::before { content: '✓'; position: absolute; left: 0; color: var(--accent); font-weight: bold; }
        .highlight-list li::before { color: var(--primary); }

        .bullet-list { list-style: disc; padding-left: 1.5rem; }
        .bullet-list li { margin-bottom: 0.5rem; }
        .warning-section h3 { color: var(--emergency); }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

        .report-tag { background: var(--secondary); color: var(--primary); padding: 0.5rem 1rem; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.9rem; }
        .disclaimer-mini { margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted); font-style: italic; }
        .report-actions { display: flex; gap: 1rem; margin-top: 3rem; }
        .final-disclaimer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }

        @media (max-width: 768px) {
          .form-grid, .flag-grid, .grid-2 { grid-template-columns: 1fr; }
          .report-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .risk-badge { text-align: left; }
          .report-actions { flex-direction: column; }
        }
      `}</style>
        </div>
    );
}
