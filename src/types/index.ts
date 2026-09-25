export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type CaseStatus = 'PENDING' | 'VERIFIED' | 'FLAGGED' | 'IN_REVIEW';
export type EvidenceType = 'IMAGE' | 'VIDEO' | 'AUDIO' | 'TEXT' | 'DOCUMENT' | 'URL';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  avatarUrl: string;
}

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  filename: string;
  fileSize: string;
  url?: string;
  previewUrl?: string;
  uploadedAt: string;
  contentText?: string;
  status: 'ANALYZED' | 'ANALYZING' | 'QUEUED';
  integrityScore: number;
  anomaliesDetected: string[];
}

export interface TrustGraphNode {
  id: string;
  label: string;
  type: 'CLAIM' | 'IMAGE' | 'FACE' | 'VOICE' | 'AUDIO' | 'TEXT' | 'DOCUMENT' | 'IDENTITY' | 'CONTEXT' | 'SOURCE';
  score: number;
  status: 'Identity Concern' | 'Media Concern' | 'Verified' | 'Context Risk' | 'Neutral';
  confidence: 'High' | 'Medium' | 'Low';
  details: string;
  x?: number;
  y?: number;
}

export interface TrustGraphEdge {
  source: string;
  target: string;
  status: 'conflict' | 'support' | 'neutral';
  label: string;
}

export interface EvidenceConcern {
  id: string;
  title: string;
  category: 'Identity Concern' | 'Media Concern' | 'Context Concern' | 'Cross-Modal Concern';
  description: string;
  severity: RiskLevel;
  confidence: string;
  source: string;
  technicalDetails?: string;
}

export interface TimelineItem {
  timestamp: string;
  title: string;
  description: string;
  actor: string;
  type: 'system' | 'user' | 'admin';
}

export interface VerificationCase {
  id: string;
  caseName: string;
  claim: string;
  claimedIdentity: string;
  source: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  risk: RiskLevel;
  confidenceScore: number;
  status: CaseStatus;
  breakdown: {
    mediaIntegrity: number;
    identityConsistency: number;
    contextConsistency: number;
    sourceReliability: number;
    evidenceCompleteness: number;
  };
  concerns: EvidenceConcern[];
  trustGraph: {
    nodes: TrustGraphNode[];
    edges: TrustGraphEdge[];
  };
  recommendations: string[];
  evidence: EvidenceItem[];
  timeline: TimelineItem[];
  userEmail: string;
  assignedAdmin?: string;
  reviewNotes?: string;
}

export interface TrustPassportItem {
  id: string;
  type: 'Email' | 'Phone' | 'Org ID' | 'Face Reference' | 'Voice Reference';
  identifier: string;
  verifiedAt: string;
  status: 'VERIFIED' | 'PENDING' | 'EXPIRED';
  confidence: number;
}

export interface TrustPassport {
  userId: string;
  userName: string;
  userEmail: string;
  organization: string;
  role: string;
  avatarUrl: string;
  status: 'VERIFIED' | 'PARTIAL' | 'UNVERIFIED';
  verifiedCount: number;
  methods: TrustPassportItem[];
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
  caseId?: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  autoScan: boolean;
  emailAlerts: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  apiSimulationDelay: number;
  showTechnicalBadges: boolean;
}
