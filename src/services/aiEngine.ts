import { VerificationCase, RiskLevel, EvidenceItem, TrustGraphNode, TrustGraphEdge, EvidenceConcern } from '../types';

export const INITIAL_CASES: VerificationCase[] = [
  {
    id: "TG-1024",
    caseName: "Manager Impersonation — Urgent Wire Transfer",
    claim: "Urgent wire transfer of $85,000 required immediately for Q3 cloud vendor settlement per VP instructions.",
    claimedIdentity: "Marcus Vance (VP of Finance)",
    source: "WhatsApp + Voice Note + Email Attachment",
    notes: "Sender claims Marcus is in transit and cannot take direct phone calls.",
    createdAt: "2026-09-25T08:30:00Z",
    updatedAt: "2026-09-25T08:35:00Z",
    risk: "HIGH",
    confidenceScore: 92,
    status: "IN_REVIEW",
    userEmail: "demo@trustguard.ai",
    breakdown: {
      mediaIntegrity: 42,
      identityConsistency: 35,
      contextConsistency: 48,
      sourceReliability: 61,
      evidenceCompleteness: 72
    },
    concerns: [
      {
        id: "c1",
        title: "Identity Concern — Voice Biometric Discrepancy",
        category: "Identity Concern",
        description: "Voice note spectral acoustic modeling reveals a 35% match against Marcus Vance's verified Trust Passport voice reference sample. Formant modulation anomalies indicate synthetic neural TTS synthesis (ElevenLabs/VALL-E signature pattern).",
        severity: "HIGH",
        confidence: "94% High Confidence",
        source: "Audio Evidence (voice_note_urgent.mp3)",
        technicalDetails: "Fundamental frequency F0 variance is 4.2Hz (natural human baseline >12.8Hz). Spectral phase discontinuity detected at 1.4s."
      },
      {
        id: "c2",
        title: "Media Concern — Facial Synthesis & Swap Artifacts",
        category: "Media Concern",
        description: "Profile photo attached to the message shows GAN blending seam boundaries along the jawline and inconsistent eye reflection highlights (asymmetric specular reflections).",
        severity: "HIGH",
        confidence: "89% High Confidence",
        source: "Image Evidence (profile_photo_claim.jpg)",
        technicalDetails: "Frequency spectrum residual analysis shows high-frequency diffusion artifacts. Blending boundary loss score: 0.78."
      },
      {
        id: "c3",
        title: "Context Concern — High Velocity Financial Coercion",
        category: "Context Concern",
        description: "Text message language embeds artificial urgency ('Must complete in 15 mins before bank cutoff') combined with instructions to bypass standard dual-authorization protocols.",
        severity: "HIGH",
        confidence: "88% High Confidence",
        source: "Text Message Evidence",
        technicalDetails: "NLP threat classifier matched Coercive Social Engineering Pattern #402. Urgency coefficient: 0.93."
      },
      {
        id: "c4",
        title: "Cross-Modal Concern — Multimodal Signature Mismatch",
        category: "Cross-Modal Concern",
        description: "Voice note background acoustic reverberation profile indicates a small carpeted studio, whereas sender location metadata claims an airport terminal.",
        severity: "MEDIUM",
        confidence: "82% Medium Confidence",
        source: "Cross-Modal Correlation (Voice + Text + Location)",
        technicalDetails: "Acoustic room impulse response (RIR) decay rate T60 = 0.18s vs expected open venue T60 > 1.2s."
      }
    ],
    trustGraph: {
      nodes: [
        { id: "n1", label: "CLAIM", type: "CLAIM", score: 85, status: "Context Risk", confidence: "High", details: "$85,000 Wire Transfer Request" },
        { id: "n2", label: "IMAGE", type: "IMAGE", score: 42, status: "Media Concern", confidence: "High", details: "Profile Photo attached in message" },
        { id: "n3", label: "FACE", type: "FACE", score: 38, status: "Media Concern", confidence: "High", details: "GAN facial synthesis detected" },
        { id: "n4", label: "VOICE", type: "VOICE", score: 35, status: "Identity Concern", confidence: "High", details: "Neural TTS voice clone (35% biometric match)" },
        { id: "n5", label: "TEXT", type: "TEXT", score: 48, status: "Context Risk", confidence: "Medium", details: "Urgent coercion & policy bypass language" },
        { id: "n6", label: "IDENTITY", type: "IDENTITY", score: 28, status: "Identity Concern", confidence: "High", details: "Marcus Vance (VP Finance) - Mismatch" },
        { id: "n7", label: "CONTEXT", type: "CONTEXT", score: 40, status: "Context Risk", confidence: "High", details: "Finance protocol breach" },
        { id: "n8", label: "SOURCE", type: "SOURCE", score: 61, status: "Context Risk", confidence: "Medium", details: "Unverified WhatsApp + Spoofed Email" }
      ],
      edges: [
        { source: "n1", target: "n2", status: "conflict", label: "Manipulated Artifact" },
        { source: "n2", target: "n3", status: "conflict", label: "GAN Seam Boundary" },
        { source: "n3", target: "n6", status: "conflict", label: "Identity Mismatch (28%)" },
        { source: "n1", target: "n4", status: "conflict", label: "TTS Voice Clone" },
        { source: "n4", target: "n6", status: "conflict", label: "Acoustic Discrepancy" },
        { source: "n1", target: "n5", status: "conflict", label: "Coercive Urgency" },
        { source: "n5", target: "n7", status: "conflict", label: "Policy Bypass Signal" },
        { source: "n7", target: "n8", status: "conflict", label: "Unverified Route" }
      ]
    },
    recommendations: [
      "DO NOT act on the wire transfer or payment request.",
      "Contact Marcus Vance directly using his corporate landline or out-of-band verified extension.",
      "Do NOT use telephone numbers or links supplied inside the suspicious WhatsApp message.",
      "Preserve raw voice note (.mp3) and image files for SOC / Security Incident logging.",
      "Flag this case for Human Security Analyst Verification."
    ],
    evidence: [
      {
        id: "e1",
        type: "IMAGE",
        filename: "marcus_avatar_claim.png",
        fileSize: "1.4 MB",
        url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
        uploadedAt: "2026-09-25T08:30:10Z",
        status: "ANALYZED",
        integrityScore: 42,
        anomaliesDetected: ["High Frequency Diffusion Noise", "Asymmetric Pupil Reflections", "Jawline Seam Artifacts"]
      },
      {
        id: "e2",
        type: "AUDIO",
        filename: "urgent_voice_message_marcus.wav",
        fileSize: "3.8 MB",
        uploadedAt: "2026-09-25T08:30:15Z",
        status: "ANALYZED",
        integrityScore: 35,
        anomaliesDetected: ["TTS Glottal Waveform Signature", "Unnatural Pitch Flattening", "RIR Acoustic Enclosure Discrepancy"]
      },
      {
        id: "e3",
        type: "TEXT",
        filename: "whatsapp_message_transcript.txt",
        fileSize: "12 KB",
        contentText: "Hey Sarah, I'm stuck in customs at Heathrow and my laptop died. Need you to authorize an urgent Q3 cloud vendor wire of $85,000 right now or our servers go down. Send confirmation screenshot.",
        uploadedAt: "2026-09-25T08:30:20Z",
        status: "ANALYZED",
        integrityScore: 48,
        anomaliesDetected: ["Urgency Trigger Keywords", "Standard Verification Bypass Attempt", "Suspicious Destination Account"]
      }
    ],
    timeline: [
      { timestamp: "2026-09-25 08:30:00", title: "Case Created", description: "Verification case initiated by Sarah Jenkins (Senior Accountant).", actor: "Sarah Jenkins", type: "user" },
      { timestamp: "2026-09-25 08:30:20", title: "3 Evidence Artifacts Ingested", description: "Image, Voice Note, and Text Transcript uploaded.", actor: "System", type: "system" },
      { timestamp: "2026-09-25 08:32:05", title: "Multimodal AI Engine Analysis Completed", description: "Media Integrity (42%), Identity Consistency (35%), Risk Level HIGH (92%).", actor: "TrustGuard Engine v4.2", type: "system" },
      { timestamp: "2026-09-25 08:35:00", title: "Case Flagged for SOC Review", description: "High risk notification dispatched to Admin Incident Queue.", actor: "System", type: "system" }
    ]
  },
  {
    id: "TG-1025",
    caseName: "CFO Media Statement Verification",
    claim: "Audio recording of alleged CFO comment regarding unannounced corporate restructuring.",
    claimedIdentity: "Elena Rostova (CFO)",
    source: "Social Media Video / Audio Extract",
    notes: "Audio clip circulating on X/Twitter ahead of earnings release.",
    createdAt: "2026-09-24T14:20:00Z",
    updatedAt: "2026-09-24T14:45:00Z",
    risk: "MEDIUM",
    confidenceScore: 76,
    status: "PENDING",
    userEmail: "demo@trustguard.ai",
    breakdown: {
      mediaIntegrity: 62,
      identityConsistency: 58,
      contextConsistency: 70,
      sourceReliability: 45,
      evidenceCompleteness: 65
    },
    concerns: [
      {
        id: "c21",
        title: "Media Concern — Background Noise Masking Artifacts",
        category: "Media Concern",
        description: "Background ambient cafe noise was artificially injected to mask audio splicing phase jumps.",
        severity: "MEDIUM",
        confidence: "78% Medium Confidence",
        source: "Audio Stream (cfo_interview_clip.mp3)",
        technicalDetails: "Spectral subtraction noise floor is unnaturally uniform across 0.5kHz-4kHz."
      },
      {
        id: "c22",
        title: "Identity Concern — Vocal Resonance Variance",
        category: "Identity Concern",
        description: "Vocal tract length estimation deviates by 8.4% from Elena Rostova's verified benchmark recording.",
        severity: "MEDIUM",
        confidence: "74% Medium Confidence",
        source: "Biometric Voice Matching",
        technicalDetails: "Formant ratios F1/F2 diverge during high-pitch vocal inflections."
      }
    ],
    trustGraph: {
      nodes: [
        { id: "n1", label: "CLAIM", type: "CLAIM", score: 68, status: "Context Risk", confidence: "Medium", details: "CFO Restructuring Statement" },
        { id: "n2", label: "AUDIO", type: "AUDIO", score: 62, status: "Media Concern", confidence: "Medium", details: "Splice artifacts in audio stream" },
        { id: "n3", label: "VOICE", type: "VOICE", score: 58, status: "Identity Concern", confidence: "Medium", details: "Partial voice match (58%)" },
        { id: "n4", label: "IDENTITY", type: "IDENTITY", score: 60, status: "Identity Concern", confidence: "Medium", details: "Elena Rostova (CFO)" },
        { id: "n5", label: "SOURCE", type: "SOURCE", score: 45, status: "Context Risk", confidence: "Low", details: "Anonymous Twitter Account" }
      ],
      edges: [
        { source: "n1", target: "n2", status: "conflict", label: "Audio Splicing Detected" },
        { source: "n2", target: "n3", status: "conflict", label: "Noise Masking Injected" },
        { source: "n3", target: "n4", status: "conflict", label: "Voice Resonance Delta" },
        { source: "n1", target: "n5", status: "conflict", label: "Low Source Reputation" }
      ]
    },
    recommendations: [
      "Issue a formal PR statement indicating media verification is in progress.",
      "Request Elena Rostova to provide a signed out-of-band video verification.",
      "Conduct deep acoustic forensic spectrography on raw uncompressed audio file."
    ],
    evidence: [
      {
        id: "e21",
        type: "AUDIO",
        filename: "cfo_interview_clip.mp3",
        fileSize: "2.1 MB",
        uploadedAt: "2026-09-24T14:20:10Z",
        status: "ANALYZED",
        integrityScore: 62,
        anomaliesDetected: ["Phase Discrepancy at 0:14", "Synthetic Ambient Noise Layer"]
      }
    ],
    timeline: [
      { timestamp: "2026-09-24 14:20:00", title: "Case Created", description: "Verification case created by Comms Team.", actor: "Comms Department", type: "user" },
      { timestamp: "2026-09-24 14:25:00", title: "AI Analysis Complete", description: "Medium Risk (76%) assigned.", actor: "TrustGuard Engine v4.2", type: "system" }
    ]
  },
  {
    id: "TG-1026",
    caseName: "Vendor Invoice & Identity Check",
    claim: "Regular quarterly license invoice renewal of $12,400 from Datastream Analytics Inc.",
    claimedIdentity: "Datastream Billing Team (Verified Supplier)",
    source: "Vendor Portal PDF Invoice + Signed Contract",
    notes: "Routine recurring software invoice.",
    createdAt: "2026-09-23T11:00:00Z",
    updatedAt: "2026-09-23T11:15:00Z",
    risk: "LOW",
    confidenceScore: 98,
    status: "VERIFIED",
    userEmail: "demo@trustguard.ai",
    breakdown: {
      mediaIntegrity: 96,
      identityConsistency: 95,
      contextConsistency: 94,
      sourceReliability: 98,
      evidenceCompleteness: 92
    },
    concerns: [],
    trustGraph: {
      nodes: [
        { id: "n1", label: "CLAIM", type: "CLAIM", score: 98, status: "Verified", confidence: "High", details: "Routine Vendor Invoice ($12,400)" },
        { id: "n2", label: "DOCUMENT", type: "DOCUMENT", score: 96, status: "Verified", confidence: "High", details: "Digital Signature Validated" },
        { id: "n3", label: "IDENTITY", type: "IDENTITY", score: 95, status: "Verified", confidence: "High", details: "Datastream Analytics Inc (Passport Match)" },
        { id: "n4", label: "SOURCE", type: "SOURCE", score: 98, status: "Verified", confidence: "High", details: "Verified Domain & TLS Certificates" }
      ],
      edges: [
        { source: "n1", target: "n2", status: "support", label: "Cryptographic Match" },
        { source: "n2", target: "n3", status: "support", label: "Vendor Passport Matched" },
        { source: "n3", target: "n4", status: "support", label: "TLS & SPF Passed" }
      ]
    },
    recommendations: [
      "Invoice validated successfully against Trust Passport database.",
      "Proceed with routine payment workflow."
    ],
    evidence: [
      {
        id: "e31",
        type: "DOCUMENT",
        filename: "INV_2026_Q3_Datastream.pdf",
        fileSize: "840 KB",
        uploadedAt: "2026-09-23T11:00:05Z",
        status: "ANALYZED",
        integrityScore: 96,
        anomaliesDetected: []
      }
    ],
    timeline: [
      { timestamp: "2026-09-23 11:00:00", title: "Case Submitted", description: "Automated scan on procurement entry.", actor: "AP Bot", type: "system" },
      { timestamp: "2026-09-23 11:05:00", title: "Trust Passport Verification Passed", description: "Cryptographic vendor signature matched.", actor: "TrustGuard Engine", type: "system" },
      { timestamp: "2026-09-23 11:15:00", title: "Marked as Verified", description: "Approved automatically by policy rule.", actor: "System Policy", type: "system" }
    ]
  }
];

export function generateSimulationResults(
  caseName: string,
  claim: string,
  claimedIdentity: string,
  source: string,
  notes: string | undefined,
  evidenceItems: EvidenceItem[]
): VerificationCase {
  const containsHighRiskKeywords = /urgent|wire|transfer|payment|password|crypto|customs|ceo|cfo|bank|secret|bypass/i.test(claim + caseName + claimedIdentity);
  const containsVoice = evidenceItems.some(e => e.type === 'AUDIO' || e.type === 'VIDEO');
  const containsImage = evidenceItems.some(e => e.type === 'IMAGE' || e.type === 'VIDEO');
  
  let risk: RiskLevel = 'LOW';
  let confidenceScore = 95;
  let breakdown = {
    mediaIntegrity: 92,
    identityConsistency: 90,
    contextConsistency: 94,
    sourceReliability: 91,
    evidenceCompleteness: 88
  };

  if (containsHighRiskKeywords || containsVoice || containsImage) {
    if (containsHighRiskKeywords && (containsVoice || containsImage)) {
      risk = 'HIGH';
      confidenceScore = 91;
      breakdown = {
        mediaIntegrity: 44,
        identityConsistency: 38,
        contextConsistency: 42,
        sourceReliability: 52,
        evidenceCompleteness: 78
      };
    } else {
      risk = 'MEDIUM';
      confidenceScore = 79;
      breakdown = {
        mediaIntegrity: 64,
        identityConsistency: 60,
        contextConsistency: 68,
        sourceReliability: 70,
        evidenceCompleteness: 75
      };
    }
  }

  const concerns: EvidenceConcern[] = [];

  if (risk === 'HIGH') {
    concerns.push({
      id: `c_${Date.now()}_1`,
      title: 'Identity Concern — Biometric & Reference Mismatch',
      category: 'Identity Concern',
      description: `Submitted evidence for claimed identity '${claimedIdentity}' failed cross-reference comparison against system baseline (match rating 38%).`,
      severity: 'HIGH',
      confidence: '92% High Confidence',
      source: 'Multimodal Biometric Comparator',
      technicalDetails: 'Latent feature vector distance delta d = 1.48 (threshold for match d < 0.35).'
    });
    concerns.push({
      id: `c_${Date.now()}_2`,
      title: 'Media Concern — Synthetic Neural Artifacts Detected',
      category: 'Media Concern',
      description: 'Spectral diffusion analysis identified residual generation patterns consistent with deepfake AI synthesis.',
      severity: 'HIGH',
      confidence: '88% High Confidence',
      source: 'Deepfake Forensics Engine',
      technicalDetails: 'Residual noise heatmap score: 0.84. High-frequency phase anomaly detected.'
    });
    concerns.push({
      id: `c_${Date.now()}_3`,
      title: 'Context Concern — High Pressure Coercive Sentiment',
      category: 'Context Concern',
      description: 'Textual analysis identified financial coercion indicators designed to prompt out-of-band policy violations.',
      severity: 'HIGH',
      confidence: '89% High Confidence',
      source: 'NLP Social Engineering Analyzer',
      technicalDetails: 'Coercion pattern rating: 0.91. Urgency markers detected.'
    });
  } else if (risk === 'MEDIUM') {
    concerns.push({
      id: `c_${Date.now()}_1`,
      title: 'Media Concern — Unverified Compression Seams',
      category: 'Media Concern',
      description: 'Compression metadata indicates potential re-encoding or selective frame editing.',
      severity: 'MEDIUM',
      confidence: '76% Medium Confidence',
      source: 'File Forensics Module',
      technicalDetails: 'Double quantization JPEG/AAC matrix detected.'
    });
    concerns.push({
      id: `c_${Date.now()}_2`,
      title: 'Context Concern — Unverified Source Route',
      category: 'Context Concern',
      description: `Message source '${source}' lacks verified TLS / DKIM cryptographic signatures.`,
      severity: 'MEDIUM',
      confidence: '72% Medium Confidence',
      source: 'Network Origin Classifier',
      technicalDetails: 'SPF alignment failed; domain age < 14 days.'
    });
  }

  const nodes: TrustGraphNode[] = [
    { id: "gn1", label: "CLAIM", type: "CLAIM", score: breakdown.contextConsistency, status: risk === 'HIGH' ? 'Context Risk' : 'Verified', confidence: "High", details: claim },
    { id: "gn2", label: "EVIDENCE", type: containsImage ? "IMAGE" : "TEXT", score: breakdown.mediaIntegrity, status: risk === 'HIGH' ? 'Media Concern' : 'Verified', confidence: "High", details: `${evidenceItems.length} artifact(s) submitted` },
    { id: "gn3", label: "IDENTITY", type: "IDENTITY", score: breakdown.identityConsistency, status: risk === 'HIGH' ? 'Identity Concern' : 'Verified', confidence: "Medium", details: claimedIdentity },
    { id: "gn4", label: "SOURCE", type: "SOURCE", score: breakdown.sourceReliability, status: risk === 'HIGH' ? 'Context Risk' : 'Verified', confidence: "Medium", details: source }
  ];

  const edges: TrustGraphEdge[] = [
    { source: "gn1", target: "gn2", status: risk === 'HIGH' ? 'conflict' : 'support', label: risk === 'HIGH' ? 'Synthetic Anomaly' : 'Integrity Passed' },
    { source: "gn2", target: "gn3", status: risk === 'HIGH' ? 'conflict' : 'support', label: risk === 'HIGH' ? 'Biometric Mismatch' : 'Identity Confirmed' },
    { source: "gn1", target: "gn4", status: risk === 'HIGH' ? 'conflict' : 'support', label: risk === 'HIGH' ? 'Unverified Origin' : 'Domain Validated' }
  ];

  const recommendations = risk === 'HIGH'
    ? [
        "Do not act on the request yet.",
        `Contact ${claimedIdentity} using an official out-of-band corporate channel.`,
        "Do not use contact details provided inside the unverified message.",
        "Preserve the original evidence files for security audit logging.",
        "Request independent human verification before releasing funds or sensitive data."
      ]
    : risk === 'MEDIUM'
    ? [
        "Exercise caution before processing this request.",
        "Verify credentials with the sender through an alternative medium.",
        "Inspect original raw headers or digital signature certificates."
      ]
    : [
        "Evidence passed automated integrity & identity verification checks.",
        "Safe to proceed according to standard operational procedures."
      ];

  const caseId = `TG-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id: caseId,
    caseName: caseName || "Untitled Trust Verification",
    claim: claim || "No description specified",
    claimedIdentity: claimedIdentity || "Unspecified Identity",
    source: source || "Direct Upload",
    notes: notes || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    risk,
    confidenceScore,
    status: risk === 'HIGH' ? 'FLAGGED' : 'PENDING',
    userEmail: "demo@trustguard.ai",
    breakdown,
    concerns,
    trustGraph: { nodes, edges },
    recommendations,
    evidence: evidenceItems,
    timeline: [
      { timestamp: new Date().toLocaleTimeString(), title: "Case Created", description: `Verification case ${caseId} created.`, actor: "User", type: "user" },
      { timestamp: new Date().toLocaleTimeString(), title: "AI Multimodal Scan Executed", description: `Processed ${evidenceItems.length} evidence artifact(s). Computed Risk: ${risk}.`, actor: "TrustGuard Engine", type: "system" }
    ]
  };
}
