import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  RefreshCw,
  FileText,
  Volume2,
  ShieldAlert,
  Flame,
  Leaf,
  Wind,
} from 'lucide-react';
import { Language, DiseaseDetectionResult } from '../types';
import { translations } from '../translations';

interface DiseaseDetectionProps {
  language: Language;
}

// Preloaded leaf sample images
const sampleLeaves = [
  {
    id: 'sample-capsicum',
    title: 'Capsicum Powdery Mildew',
    crop: 'Capsicum',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    hint: 'Capsicum with white powder spores on lower leaf surface',
  },
  {
    id: 'sample-tomato',
    title: 'Tomato Early Blight',
    crop: 'Tomato',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    hint: 'Tomato with concentric brown ring spots',
  },
  {
    id: 'sample-cucumber',
    title: 'Cucumber Downy Mildew',
    crop: 'Cucumber',
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=80',
    hint: 'Cucumber with angular chlorotic yellow leaf spots',
  },
];

export const DiseaseDetection: React.FC<DiseaseDetectionProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cropHint, setCropHint] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Start live camera
  const startCamera = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera error:', err);
      setErrorMsg('Camera access was not permitted. Please upload a photo or choose a sample leaf.');
    }
  };

  // Capture snapshot from camera
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setSelectedImage(dataUrl);
      stopCamera();
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Select sample
  const handleSelectSample = (sample: (typeof sampleLeaves)[0]) => {
    setSelectedImage(sample.image);
    setCropHint(sample.crop);
    setResult(null);
    setErrorMsg(null);
    stopCamera();
  };

  // Analyze with AI
  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/analyze-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: 'image/jpeg',
          cropHint,
          language,
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.data) {
          setResult(json.data);
        } else {
          setErrorMsg('Failed to parse diagnostic data.');
        }
      } else {
        setErrorMsg('Server error while diagnosing. Please try again.');
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      setErrorMsg('Unable to connect to diagnostic server.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Audio Read-Aloud for diagnosis
  const speakDiagnosis = () => {
    if (!result || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const textToSpeak = `${result.crop}. ${result.disease}. ${result.symptoms.join('. ')}. Remedies: ${result.organicRemedy.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : language === 'te' ? 'te-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-12">
      {/* Title Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-lime-300" />
            <span>AI Powered Smart Greenhouse Crop Pathology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.diseaseScannerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
            {t.diseaseScannerSubtitle}
          </p>
        </div>
      </div>

      {/* Main Diagnostic Input Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-6">
        {/* Step 1: Image Capture / Selection */}
        <div>
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
            1. {t.uploadLeafPhoto}
          </label>

          {/* Camera Viewport (if active) */}
          {isCameraActive && (
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-lg mx-auto mb-4 border-2 border-emerald-500 shadow-xl">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                <button
                  onClick={captureSnapshot}
                  className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Photo</span>
                </button>
                <button
                  onClick={stopCamera}
                  className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Upload & Camera Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-800 hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 font-bold text-sm flex items-center justify-center gap-2.5 transition group"
            >
              <Upload className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span>{t.uploadLeafPhoto}</span>
            </button>

            <button
              onClick={startCamera}
              className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-stone-700 hover:border-emerald-500 bg-slate-50 dark:bg-stone-800/50 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center justify-center gap-2.5 transition group"
            >
              <Camera className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform" />
              <span>{t.takeCameraPhoto}</span>
            </button>
          </div>

          {/* Quick Test Samples */}
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
              {t.orChooseSample}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sampleLeaves.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-stone-800 hover:border-emerald-500 flex items-center gap-3 text-left bg-white dark:bg-stone-800 transition"
                >
                  <img
                    src={sample.image}
                    alt={sample.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {sample.title}
                    </div>
                    <div className="text-[10px] text-slate-500">1-Click Test</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Image Preview & Diagnose Action */}
        {selectedImage && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/50 border border-slate-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={selectedImage}
                alt="Selected crop leaf"
                className="w-20 h-20 rounded-xl object-cover border border-slate-300 dark:border-stone-600 shadow-sm"
              />
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Leaf Image Ready for Analysis
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  High-resolution leaf cellular preview loaded
                </div>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.analyzingImage}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-lime-300" />
                  <span>{t.diagnoseCrop}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* 2. Diagnosis Results Display */}
      {result && (
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-emerald-500/40 shadow-xl space-y-6 animate-fade-in">
          {/* Header of diagnosis */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-stone-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  {t.affectedCrop}: {result.crop}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    result.severity === 'High'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  Severity: {result.severity}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                {result.disease}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={speakDiagnosis}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-stone-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition"
                title="Listen in audio"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Audio Advisory</span>
              </button>

              <div className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20">
                {t.confidenceScore}: {result.confidence}%
              </div>
            </div>
          </div>

          {/* Symptoms & Causes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Symptoms */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700/60">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>{t.symptomsLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {result.symptoms.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Root Causes in Polyhouse */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/60 border border-slate-200/60 dark:border-stone-700/60">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>{t.causesLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {result.causes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Organic Remedies & Chemical Treatment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organic Remedies */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>{t.organicRemedyLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-emerald-800 dark:text-emerald-200">
                {result.organicRemedy.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chemical Treatment */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>{t.chemicalTreatmentLabel}</span>
              </h4>
              <ul className="space-y-2 text-xs text-blue-800 dark:text-blue-200">
                {result.chemicalTreatment.map((ct, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span>{ct}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Polyhouse Climate Action */}
          {result.polyhouseClimateAdvice && (
            <div className="p-4 rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800">
              <h4 className="text-sm font-bold text-cyan-900 dark:text-cyan-300 flex items-center gap-2 mb-1.5">
                <Wind className="w-4 h-4 text-cyan-600" />
                <span>{t.polyhouseClimateAdviceLabel}</span>
              </h4>
              <p className="text-xs text-cyan-800 dark:text-cyan-200 leading-relaxed">
                {result.polyhouseClimateAdvice}
              </p>
            </div>
          )}

          {/* Expert Contact & Disclaimer Footer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center justify-center sm:justify-start gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.expertConsultation}</span>
              </div>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 max-w-xl">
                {result.disclaimer || t.aiDisclaimer}
              </p>
            </div>

            <a
              href="tel:18001801551"
              className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs whitespace-nowrap shadow-sm transition"
            >
              {t.kvkHelpline}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
