'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Scan,
  MapPin,
  Video,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

const features = [
  {
    title: "Symptom Checker",
    description: "Get a structured AI-guided health report based on your symptoms.",
    icon: Stethoscope,
    href: "/symptoms",
    color: "#2D5D7C"
  },
  {
    title: "Scan Med",
    description: "Upload a photo of medicine or prescription to get clear info.",
    icon: Scan,
    href: "/scan",
    color: "#10B981"
  },
  {
    title: "Hospitals Near Me",
    description: "Find the best nearby clinics and hospitals with directions.",
    icon: MapPin,
    href: "/hospitals",
    color: "#F59E0B"
  },
  {
    title: "Health Remedies",
    description: "Verified care videos for common conditions and home care.",
    icon: Video,
    href: "/remedies",
    color: "#EF4444"
  }
];

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <div className="badge">INDIA'S TRUSTED MEDICAL ASSISTANT</div>
            <h1>Your health, <span className="highlight">understood.</span></h1>
            <p>MEDAI provides professional medical guidance, symptom analysis, and medicine details to help you make informed decisions about your health.</p>

            <div className="hero-actions">
              <Link href="/symptoms" className="btn btn-primary btn-lg">
                Check Symptoms <ArrowRight size={20} />
              </Link>
              <Link href="/scan" className="btn btn-secondary btn-lg">
                Scan Medicine
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="hero-bg"></div>
      </section>

      {/* Quick Actions Grid */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>How can MEDAI help you?</h2>
            <p>Access doctor-grade tools at your fingertips.</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={feature.href} className="feature-card">
                  <div className="icon-wrapper" style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                    <feature.icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span className="learn-more">Get Started <ArrowRight size={16} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="safety-section">
        <div className="container">
          <div className="safety-grid">
            <div className="safety-info">
              <div className="safety-icon">
                <ShieldCheck size={48} color="#10B981" />
              </div>
              <h2>Built for Safety & Trust</h2>
              <p>MEDAI is designed with medical safety at its core. We provide evidence-based information that complements your doctor's care.</p>

              <ul className="safety-list">
                <li><Zap size={18} /> Emergency-first response triggers</li>
                <li><Zap size={18} /> Verified medicine database</li>
                <li><Zap size={18} /> Privacy-focused data encryption</li>
                <li><Zap size={18} /> Localized for Indian context</li>
              </ul>
            </div>
            <div className="safety-stat">
              <div className="stat-card">
                <Globe size={40} className="stat-icon" />
                <div className="stat-value">24/7</div>
                <div className="stat-label">Health Guidance</div>
              </div>
              <div className="stat-card">
                <Stethoscope size={40} className="stat-icon" />
                <div className="stat-value">Premium</div>
                <div className="stat-label">Medical Portal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          overflow-x: hidden;
        }
        .hero {
          position: relative;
          padding: 8rem 0 6rem;
          background: linear-gradient(135deg, white 0%, var(--secondary) 100%);
          text-align: center;
        }
        .hero-content {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(45, 93, 124, 0.1);
          color: var(--primary);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }
        .hero h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          color: var(--text-main);
        }
        .highlight {
          color: var(--primary);
          position: relative;
        }
        .hero p {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 3rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .features-section {
          padding: 6rem 0;
          background: white;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .feature-card {
          padding: 2.5rem 2rem;
          background: var(--bg-alt);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          transition: all 0.3s ease;
          display: block;
        }
        .feature-card:hover {
          transform: translateY(-10px);
          shadow: var(--shadow-lg);
          border-color: var(--primary-light);
        }
        .icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .feature-card p {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }
        .learn-more {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          font-weight: 600;
        }

        .safety-section {
          padding: 6rem 0;
          background: #fdfdfd;
        }
        .safety-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .safety-info h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }
        .safety-list {
          list-style: none;
          margin-top: 2rem;
        }
        .safety-list li {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          color: var(--text-main);
          font-weight: 500;
        }
        .safety-stat {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .stat-card {
          background: white;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          text-align: center;
        }
        .stat-icon { color: var(--primary); margin-bottom: 1.5rem; }
        .stat-value { font-size: 2.5rem; font-weight: 700; color: var(--primary); }
        .stat-label { color: var(--text-muted); font-weight: 600; }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .hero-actions { flex-direction: column; }
          .safety-grid { grid-template-columns: 1fr; gap: 4rem; }
          .safety-stat { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
