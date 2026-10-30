import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  Award,
  CheckCircle,
  Clock,
  HelpCircle,
  FileCheck,
  Download,
  Printer,
  ChevronRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { Language, TrainingLesson, UserProfile } from '../types';
import { translations } from '../translations';
import { trainingLessons } from '../data/mockData';

interface TrainingCenterProps {
  language: Language;
  userProfile: UserProfile;
}

export const TrainingCenter: React.FC<TrainingCenterProps> = ({
  language,
  userProfile,
}) => {
  const t = translations[language] || translations.en;

  const [activeLesson, setActiveLesson] = useState<TrainingLesson>(trainingLessons[0]);
  const [activeTab, setActiveTab] = useState<'lessons' | 'quiz' | 'certificate'>('lessons');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>(['lesson-1']);
  const [certificateEarned, setCertificateEarned] = useState<boolean>(true);

  // Quiz evaluation
  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // If all correct, earn certificate
    let correctCount = 0;
    activeLesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === activeLesson.quiz.length) {
      setCertificateEarned(true);
      if (!completedLessons.includes(activeLesson.id)) {
        setCompletedLessons((prev) => [...prev, activeLesson.id]);
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-indigo-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <GraduationCap className="w-3.5 h-3.5 text-lime-300" />
              <span>National & Odisha Krishi Vigyan Kendra Certified Modules</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.trainingTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              {t.trainingSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/25 backdrop-blur-md p-3 rounded-2xl border border-white/20">
            <Award className="w-8 h-8 text-amber-300" />
            <div>
              <div className="text-xs text-emerald-200 font-medium">Academy Progress</div>
              <div className="text-base font-bold text-white">
                {completedLessons.length} / {trainingLessons.length} Modules
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs (Lessons / Quiz / Certificate) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'lessons'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Interactive Masterclasses</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-stone-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Certification Quiz</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'certificate'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-stone-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Smart Farmer Certificate</span>
        </button>
      </div>

      {/* TAB 1: Lessons List & Video Masterclass */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Video & Lesson Details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-4">
              {/* Video Player Mock with rich overlay */}
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-black shadow-lg group">
                <img
                  src={activeLesson.videoThumbnail}
                  alt={activeLesson.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl cursor-pointer transform group-hover:scale-110 transition">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-black/70 backdrop-blur-md text-white border border-white/20">
                    {activeLesson.category.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                    {activeLesson.level}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="font-bold">4K Agriculture Masterclass</span>
                  <span className="flex items-center gap-1 font-mono text-emerald-300">
                    <Clock className="w-3.5 h-3.5" />
                    {activeLesson.duration}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {activeLesson.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  {activeLesson.summary}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Practical Takeaways for Polyhouse</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-800 dark:text-emerald-200">
                  {activeLesson.keyTakeaways.map((k, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveTab('quiz');
                    handleResetQuiz();
                  }}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <span>{t.startQuiz}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Curriculum Directory (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider px-1">
              Course Modules Curriculum
            </h4>

            {trainingLessons.map((lesson) => {
              const isSelected = activeLesson.id === lesson.id;
              const isDone = completedLessons.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setActiveLesson(lesson);
                    handleResetQuiz();
                  }}
                  className={`w-full p-3.5 rounded-2xl border-2 text-left transition flex items-center justify-between group ${
                    isSelected
                      ? 'border-emerald-600 bg-white dark:bg-stone-900 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={lesson.videoThumbnail}
                      alt={lesson.title}
                      className="w-16 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase">
                        {lesson.category} • {lesson.duration}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5 group-hover:text-emerald-600 transition">
                        {lesson.title}
                      </h5>
                    </div>
                  </div>

                  <div className="pl-2">
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Quiz Evaluation */}
      {activeTab === 'quiz' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                Certification Exam
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {activeLesson.title}
              </h3>
            </div>
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-6">
            {activeLesson.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <div
                  key={qIdx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-stone-800/50 border border-slate-200/80 dark:border-stone-700/80 space-y-3"
                >
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Q{qIdx + 1}. {q.question}
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      let optionClasses =
                        'border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400';

                      if (isChosen) {
                        optionClasses =
                          'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                      }

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses =
                            'border-emerald-600 bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold';
                        } else if (isChosen && optIdx !== q.correctIndex) {
                          optionClasses =
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs transition flex items-center justify-between ${optionClasses}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIdx === q.correctIndex && (
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300">
                      <strong>Explanation: </strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-stone-800">
            <span className="text-xs text-slate-500">
              Answer all questions to qualify for smart certificate
            </span>

            {quizSubmitted ? (
              <button
                onClick={() => setActiveTab('certificate')}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <span>View Certificate</span>
                <Award className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length < activeLesson.quiz.length}
                className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md disabled:opacity-50 transition"
              >
                Submit Answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: Printable PolySmart Certificate */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          <div className="flex justify-end gap-3">
            <button
              onClick={printCertificate}
              className="py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-stone-950 font-bold text-xs flex items-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF Certificate</span>
            </button>
          </div>

          {/* Certificate Layout */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 border-8 border-double border-amber-600/60 shadow-2xl text-center max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b-2 border-amber-600/30 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-base text-slate-900 block leading-tight">
                    PolySmart
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold">
                    Smart Agriculture Academy • Govt of Odisha Partnered
                  </span>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-500 font-mono">
                <div>Cert ID: PS-ODISHA-{Date.now().toString().slice(-6)}</div>
                <div>Status: Verified & Validated</div>
              </div>
            </div>

            <div className="space-y-2 py-4">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-700 block">
                Certificate of Competence & Completion
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-wide">
                Smart Polyhouse Agronomist
              </h2>
              <p className="text-xs text-slate-500">
                This is officially awarded to honor the achievement of:
              </p>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-800 font-serif pt-2 border-b border-dashed border-amber-600/40 max-w-md mx-auto pb-1">
                {userProfile.name}
              </div>
              <p className="text-xs text-slate-600 max-w-lg mx-auto pt-2 leading-relaxed">
                For successfully qualifying in Precision Polyhouse Climate Control, Automated Drip Fertigation, Integrated Pest Management (IPM), and High-Value Crop Economics under the PolySmart Agricultural Standard.
              </p>
            </div>

            <div className="flex items-end justify-between pt-6 border-t-2 border-amber-600/30 text-xs">
              <div className="text-left">
                <div className="font-serif italic font-bold text-slate-800 text-sm">
                  Dr. B. K. Mohapatra
                </div>
                <div className="text-[10px] text-slate-500">
                  Chief Agronomist & KVK Dean
                </div>
              </div>

              {/* Gold Ribbon Badge */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-xl flex items-center justify-center border-4 border-amber-600 text-amber-950 font-black text-[10px] text-center p-2 uppercase transform rotate-6">
                Verified Smart Farmer
              </div>

              <div className="text-right">
                <div className="font-mono text-slate-800 text-xs font-bold">
                  {new Date().toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <div className="text-[10px] text-slate-500">Date of Certification</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
