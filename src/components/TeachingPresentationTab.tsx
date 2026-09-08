import React, { useState } from 'react';
import { TEACHING_STEPS } from '../data/lessonData';
import { TeachingStep } from '../types';
import {
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Maximize2,
  Tv,
} from 'lucide-react';

interface TeachingPresentationTabProps {
  onSetAngle: (deg: number) => void;
  onAnimateToAngle: (deg: number) => void;
  currentDegrees: number;
}

export const TeachingPresentationTab: React.FC<TeachingPresentationTabProps> = ({
  onSetAngle,
  onAnimateToAngle,
  currentDegrees,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const step: TeachingStep = TEACHING_STEPS[currentStepIdx];

  const handleGoToStep = (idx: number) => {
    setCurrentStepIdx(idx);
    setShowAnswer(false);
    const targetAngle = TEACHING_STEPS[idx].demonstrationAngle;
    onAnimateToAngle(targetAngle);
  };

  const handleNext = () => {
    if (currentStepIdx < TEACHING_STEPS.length - 1) {
      handleGoToStep(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      handleGoToStep(currentStepIdx - 1);
    }
  };

  const handleTriggerDemonstration = () => {
    setShowAnswer(true);
    onAnimateToAngle(step.demonstrationAngle);
  };

  return (
    <div className="space-y-4">
      {/* Header banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-md flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-300 font-bold text-[10px] uppercase tracking-wider border border-indigo-500/40">
                Chế độ máy chiếu / Giảng dạy trên lớp
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">
              Tiến trình hình thành khái niệm Góc lượng giác
            </h2>
          </div>
        </div>

        {/* Step dots navigation */}
        <div className="flex items-center gap-1.5">
          {TEACHING_STEPS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleGoToStep(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                currentStepIdx === idx
                  ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main Big Slide Presentation Card */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 shadow-md space-y-5">
        {/* Step Badge and Title */}
        <div className="border-b border-slate-200 pb-4">
          <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600">
            Tiết học: Bài 1 - Góc lượng giác (Toán 11 - GDPT 2018)
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {step.title}
          </h1>
          <p className="text-sm text-slate-600 mt-2 font-medium">
            🎯 <b>Nhiệm vụ cho học sinh:</b> {step.prompt}
          </p>
        </div>

        {/* Central Pedagogical Question */}
        <div className="p-4 bg-indigo-50/80 rounded-xl border border-indigo-200 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
            <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>Câu hỏi gợi mở thảo luận trên lớp:</span>
          </div>
          <div className="text-base font-extrabold text-slate-900 pl-7 leading-snug">
            "{step.keyQuestion}"
          </div>
        </div>

        {/* Action button: Hiện đáp án & Chạy mô phỏng */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleTriggerDemonstration}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mô phỏng tia quay ({step.demonstrationAngle}°)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{showAnswer ? 'Ẩn kiến thức trọng tâm' : 'Hiện kiến thức trọng tâm (SGK)'}</span>
          </button>
        </div>

        {/* Educational Content / Answer Box */}
        {showAnswer && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 space-y-3 transition-all animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Nội dung chốt kiến thức chuẩn SGK:</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 pl-7 font-medium">
              {step.explanation}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200 flex items-start gap-2 text-xs text-slate-500">
              <span className="font-bold text-slate-700 shrink-0">📌 Hướng dẫn giáo viên:</span>
              <span>{step.teacherGuide}</span>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStepIdx === 0}
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Bước trước</span>
          </button>

          <span className="text-xs font-bold text-slate-500">
            Bước {currentStepIdx + 1} / {TEACHING_STEPS.length}
          </span>

          <button
            type="button"
            disabled={currentStepIdx === TEACHING_STEPS.length - 1}
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            <span>Bước tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
