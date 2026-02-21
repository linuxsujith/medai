'use client';

import React from 'react';
import SymptomWizard from '@/components/features/SymptomWizard';

export default function SymptomsPage() {
    return (
        <div className="page-container">
            <div className="container">
                <header className="page-header">
                    <h1>Symptom Checker</h1>
                    <p>Get professional health guidance in minutes. Our AI analyzes your symptoms and provides a structured report.</p>
                </header>

                <SymptomWizard />
            </div>

            <style jsx>{`
        .page-container {
          padding: 4rem 0;
          background: var(--bg-alt);
          min-height: 100vh;
        }
        .page-header {
          text-align: center;
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .page-header h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .page-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }
      `}</style>
        </div>
    );
}
