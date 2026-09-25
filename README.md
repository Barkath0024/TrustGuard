# TRUSTGUARD — AI FOR DIGITAL TRUST
### Explainable Multimodal Synthetic Media & Impersonation Detection

![TrustGuard Banner](https://img.shields.io/badge/TrustGuard-AI%20for%20Digital%20Trust-00A8FF?style=for-the-badge&logo=shield)
![Hackathon Prototype](https://img.shields.io/badge/Status-Hackathon%20Ready-22C88A?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-38D9FF?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-00A8FF?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38D9FF?style=for-the-badge&logo=tailwindcss)

TrustGuard is an explainable, multimodal digital trust verification platform designed to detect synthetic media (deepfake video, GAN facial swaps, ElevenLabs TTS voice clones), coercive social engineering context, and impersonation attempts across communication channels.

> ⚠️ **Core Product Principle**: **AI Score is NOT Absolute Proof**. Low-confidence or high-risk cases are automatically flagged for independent out-of-band human verification.

---

## 🔥 Key Innovations & Differentiators

- **Not Just Deepfake Detection**: Correlates multiple modalities (Audio, Image, Video, Text, Document, URL, Identity) rather than analyzing files in isolation.
- **Interactive Trust Graph Engine**: Visual correlation network rendering node topological relationships (`CLAIM`, `FACE`, `VOICE`, `TEXT`, `IDENTITY`, `CONTEXT`, `SOURCE`) and highlighting conflict edges in real time.
- **Explainable AI Evidence**: Provides transparent spectral acoustic formant delta metrics, GAN diffusion noise scores, and NLP coercion coefficients instead of opaque black-box percentages.
- **Consent-Based Trust Passport**: Executive reference profile database storing verified voice spectral baselines, 3D facial hashes, and corporate identity credentials.
- **Human-in-the-Loop SOC Triage**: Full admin incident workspace allowing analysts to review evidence, override risk ratings, and log audit life cycles.

---

## 🛠 Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Dark Navy Cybersecurity Visual Palette: `#061522`, `#0A1F32`, `#00A8FF`, `#38D9FF`, `#F05260`, `#22C88A`)
- **Icons & Visuals**: Lucide React, Recharts (Radar, Pie, Area & Bar charts), Custom SVG Interactive Node Graph
- **State & Persistence**: `localStorage` persistent state engine (preloaded with 3 hackathon scenarios: Manager Impersonation, CFO Statement, Vendor Check)
- **Routing**: React Router v6 (17 fully interactive routes)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 📸 Key Application Routes

| Route | Description |
|---|---|
| `/` | Landing Page with hero trust graph pipeline & innovation badges |
| `/login` | Authentication screen with **Demo User** and **Demo Admin** instant access |
| `/dashboard` | User Dashboard with total cases, risk counters, search, and filters |
| `/verify/new` | New Verification workflow supporting Image, Video, Audio, Text, Document & URL uploads |
| `/verify/processing/:id` | 8-step animated AI analysis processing loader with radar scanning |
| `/verify/result/:id` | **Main Assessment Screen** with circular risk meter, horizontal breakdown, and evidence inspector |
| `/evidence` | Evidence Explorer vault with filter tabs and forensic inspect modals |
| `/trust-graph` | Full-screen interactive Trust Graph correlation network |
| `/passport` | Consent-based Trust Passport identity reference profile |
| `/admin` | SOC Admin Dashboard with Recharts telemetry and incident triage queue |
| `/admin/case/:id` | Admin Case Review workspace with override decision actions |
| `/history` | Searchable verification audit history with JSON report exporter |
| `/about` | Technical architecture documentation & hackathon judge guide |

---

## 💡 Demo Mode

Click the **"Demo Mode"** button in the header bar to immediately load the pre-configured high-risk scenario:
- **Case**: *Manager Impersonation — Urgent Wire Transfer ($85,000)*
- **Signals**: Neural TTS Voice Clone (35% biometric match) + GAN Facial Seam (42% integrity score) + High Velocity Coercion Text.

---

## 📄 License

Built for Hackathon Demonstration. All rights reserved.
