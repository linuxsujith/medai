# medai[README.md](https://github.com/user-attachments/files/25454986/README.md)
# MEDAI - Premium Medical Guidance (India-First)

MEDAI is a production-ready, premium medical guidance web app designed to feel human-made and doctor-grade. It prioritizes safety, trust, and ease of use for the Indian context.

## 🚀 Key Features

- **Symptom Checker**: A 4-step wizard that analyzes symptoms using Gemini AI and provides a structured guidance report.
- **Scan Med**: High-accuracy medicine recognition from photos (strips, bottles, or prescriptions) with detailed safety data.
- **Hospitals Near Me**: Location-based hospital finder with one-click Google Maps directions and emergency call integration.
- **Health Remedies**: Curate, safe, and filtered YouTube remedy videos from credible medical professionals.
- **Doctor-Ready Reports**: Structured health summaries that can be downloaded as PDF or shared with a doctor.

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Styling**: Vanilla CSS with Hospital-Grade Aesthetics (Inter & Outfit typography)
- **AI**: Google Gemini 1.5 Flash (Symptom analysis & Med OCR)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database/Auth**: Supabase (Postgres & Auth Ready)

## 🛡️ Medical Safety & Compliance

- **Strict Disclaimers**: Explicitly states it provides information, not diagnosis.
- **Emergency Detection**: Triggers "Emergency Mode" and hospital CTAs for high-risk symptoms (chest pain, breathing trouble).
- **No Prescription**: Never recommends dosages; focuses on education and "Source" verified data.

## 🇮🇳 India-First Features

- **Language Support**: UI ready for English, Hindi, and Kannada.
- **Local Emergency**: One-click buttons for 108/102 emergency services.
- **Localized Meds**: Database focus on Indian pharmaceutical brands (Dolo, etc.).

## 📦 How to Run

1. Clone the repository.
2. Run `npm install`.
3. Set your `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local`.
4. Run `npm run dev`.

---
*Disclaimer: This is a health information application. Always consult a medical professional for medical advice, diagnosis, or treatment.*
