import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ShieldPlus,
  Image as ImageIcon,
  Video as VideoIcon,
  Mic,
  FileText,
  FileCode,
  Globe,
  Upload,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { EvidenceItem, EvidenceType } from '../types';
import { generateSimulationResults } from '../services/aiEngine';
import { saveNewCase } from '../services/storage';
import { useToast } from '../components/common/Toast';

export const NewVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [caseName, setCaseName] = useState('');
  const [claim, setClaim] = useState('');
  const [claimedIdentity, setClaimedIdentity] = useState('');
  const [source, setSource] = useState('WhatsApp + Email');
  const [notes, setNotes] = useState('');

  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const handleFileUpload = (type: EvidenceType, file: File) => {
    const fileId = `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [fileId]: 10 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const current = prev[fileId] || 0;
        if (current >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [fileId]: current + 30 };
      });
    }, 150);

    const previewUrl = type === 'IMAGE' ? URL.createObjectURL(file) : undefined;
    const newItem: EvidenceItem = {
      id: fileId,
      type,
      filename: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      previewUrl,
      uploadedAt: new Date().toISOString(),
      status: 'QUEUED',
      integrityScore: 0,
      anomaliesDetected: []
    };

    setEvidenceItems(prev => [...prev, newItem]);
    showToast('info', 'File Attached', `${file.name} added to evidence payload.`);
  };

  const handleAddUrl = () => {
    if (!urlInput) return;
    const fileId = `ev_${Date.now()}`;
    const newItem: EvidenceItem = {
      id: fileId,
      type: 'URL',
      filename: urlInput,
      fileSize: 'Online Resource',
      url: urlInput,
      uploadedAt: new Date().toISOString(),
      status: 'QUEUED',
      integrityScore: 0,
      anomaliesDetected: []
    };
    setEvidenceItems(prev => [...prev, newItem]);
    setUrlInput('');
    showToast('success', 'URL Evidence Added', urlInput);
  };

  const handleAddText = () => {
    if (!textInput) return;
    const fileId = `ev_${Date.now()}`;
    const newItem: EvidenceItem = {
      id: fileId,
      type: 'TEXT',
      filename: `message_transcript_${Date.now().toString().slice(-4)}.txt`,
      fileSize: `${(textInput.length / 1024).toFixed(1)} KB`,
      contentText: textInput,
      uploadedAt: new Date().toISOString(),
      status: 'QUEUED',
      integrityScore: 0,
      anomaliesDetected: []
    };
    setEvidenceItems(prev => [...prev, newItem]);
    setTextInput('');
    showToast('success', 'Text Transcript Attached');
  };

  const handleRemoveEvidence = (id: string) => {
    setEvidenceItems(prev => prev.filter(e => e.id !== id));
    showToast('info', 'Evidence Artifact Removed');
  };

  const handleAnalyseClick = () => {
    if (!caseName.trim() || !claim.trim()) {
      showToast('error', 'Validation Error', 'Please enter Case Name and Claim Description.');
      return;
    }

    if (evidenceItems.length === 0) {
      showToast('error', 'No Evidence Uploaded', 'Please attach at least one piece of evidence (Image, Audio, Text, etc.).');
      return;
    }

    // Generate case with simulated AI engine
    const newCase = generateSimulationResults(
      caseName,
      claim,
      claimedIdentity || 'Unverified Subject',
      source,
      notes,
      evidenceItems
    );

    saveNewCase(newCase);
    showToast('success', 'Verification Ingestion Started', `Case ${newCase.id} queued for processing.`);
    navigate(`/verify/processing/${newCase.id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
            <ShieldPlus className="w-4 h-4" />
            <span>Multimodal Verification Submission</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Create New Trust Verification</h1>
          <p className="text-xs text-slate-400">
            Submit files, audio notes, transcripts, or URLs for multimodal AI correlation and Trust Graph risk scoring.
          </p>
        </div>

        {/* CASE METADATA FORM */}
        <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">1. Case Metadata</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Case Name *</label>
              <input
                type="text"
                value={caseName}
                onChange={e => setCaseName(e.target.value)}
                placeholder="e.g. CEO Urgent Overseas Transfer Request"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Claimed Identity</label>
              <input
                type="text"
                value={claimedIdentity}
                onChange={e => setClaimedIdentity(e.target.value)}
                placeholder="e.g. Marcus Vance (VP of Finance)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Claim / Suspicious Request Description *</label>
            <textarea
              rows={3}
              value={claim}
              onChange={e => setClaim(e.target.value)}
              placeholder="Paste exact message text or describe the financial / operational request..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Source / Communication Channel</label>
              <input
                type="text"
                value={source}
                onChange={e => setSource(e.target.value)}
                placeholder="e.g. WhatsApp + Voice Note + Email"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Optional Analyst Notes</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. Sender claims subject is currently in flight"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
              />
            </div>
          </div>
        </div>

        {/* EVIDENCE UPLOAD CARDS GRID */}
        <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">2. Attach Evidence Artifacts</h2>
            <span className="text-xs text-[#38D9FF] font-mono">{evidenceItems.length} artifact(s) attached</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            
            {/* Image Upload */}
            <label className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFileUpload('IMAGE', e.target.files[0])}
              />
              <ImageIcon className="w-6 h-6 text-[#38D9FF] mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">IMAGE</p>
              <p className="text-[10px] text-slate-400">JPG, PNG, WEBP</p>
            </label>

            {/* Video Upload */}
            <label className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFileUpload('VIDEO', e.target.files[0])}
              />
              <VideoIcon className="w-6 h-6 text-purple-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">VIDEO</p>
              <p className="text-[10px] text-slate-400">MP4, MOV</p>
            </label>

            {/* Audio Upload */}
            <label className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFileUpload('AUDIO', e.target.files[0])}
              />
              <Mic className="w-6 h-6 text-amber-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">AUDIO</p>
              <p className="text-[10px] text-slate-400">MP3, WAV, M4A</p>
            </label>

            {/* Document Upload */}
            <label className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={e => e.target.files?.[0] && handleFileUpload('DOCUMENT', e.target.files[0])}
              />
              <FileCode className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">DOCUMENT</p>
              <p className="text-[10px] text-slate-400">PDF, DOCX</p>
            </label>

            {/* Text Input Trigger */}
            <div className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <FileText className="w-6 h-6 text-cyan-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">TEXT</p>
              <p className="text-[10px] text-slate-400">Message Body</p>
            </div>

            {/* URL Input Trigger */}
            <div className="p-4 rounded-xl bg-[#061522] border border-slate-700/80 hover:border-[#38D9FF] cursor-pointer text-center space-y-2 group transition-all">
              <Globe className="w-6 h-6 text-rose-400 mx-auto group-hover:scale-110 transition-transform" />
              <p className="text-xs font-semibold text-white">URL</p>
              <p className="text-[10px] text-slate-400">Web Resource</p>
            </div>

          </div>

          {/* QUICK TEXT / URL ADD MODAL-LIKE CONTROLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Paste message text or transcript..."
                className="flex-1 px-3 py-2 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddText}
                className="px-3 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30"
              >
                + Add Text
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://suspicious-domain.com/audio.wav"
                className="flex-1 px-3 py-2 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddUrl}
                className="px-3 py-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold hover:bg-rose-500/30"
              >
                + Add URL
              </button>
            </div>
          </div>

          {/* ATTACHED EVIDENCE ITEMS LIST */}
          {evidenceItems.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-300">Attached Artifacts:</p>
              <div className="space-y-2">
                {evidenceItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#061522] border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      {item.previewUrl ? (
                        <img src={item.previewUrl} alt="preview" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#0D293F] flex items-center justify-center text-[#38D9FF] font-mono font-bold">
                          {item.type[0]}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-white truncate max-w-xs">{item.filename}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.type} • {item.fileSize}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveEvidence(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleAnalyseClick}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-extrabold text-sm uppercase tracking-wider shadow-cyber hover:shadow-cyber-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-[#061522]" />
            <span>Analyse Evidence</span>
          </button>
        </div>

      </div>
    </AppLayout>
  );
};
