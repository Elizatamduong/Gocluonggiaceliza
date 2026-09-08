import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/lessonData';
import { QuizQuestion } from '../types';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Eye,
  RotateCcw,
  Trophy,
} from 'lucide-react';

interface QuizTabProps {
  onShowAngleOnCircle: (deg: number) => void;
}

export const QuizTab: React.FC<QuizTabProps> = ({ onShowAngleOnCircle }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];
  const isAnswered = submitted[currentQ.id] !== undefined;
  const selectedOpt = selectedAnswers[currentQ.id];
  const isCorrect = selectedOpt === currentQ.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
  };

  const handleCheckAnswer = () => {
    if (selectedOpt === undefined || isAnswered) return;
    const correct = selectedOpt === currentQ.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
    }
    setSubmitted((prev) => ({ ...prev, [currentQ.id]: true }));
    // Automatically visualize angle on the circle for reinforcement
    onShowAngleOnCircle(currentQ.visualAngle);
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmitted({});
    setScore(0);
  };

  const progressPercent = Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 border border-amber-200 rounded-2xl p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Thử sức: Câu hỏi tương tác trực quan
              </h2>
              <p className="text-xs text-slate-500">
                Luyện tập các câu hỏi kiểm tra trực giác về đường tròn lượng giác, số vòng quay và chiều âm dương.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl border border-amber-200 text-xs font-bold text-amber-800 shadow-xs">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>
                Điểm: {score} / {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRestart}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition"
              title="Làm lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 space-y-1">
          <div className="flex justify-between text-[11px] font-semibold text-slate-500">
            <span>Câu {currentIdx + 1} trên {QUIZ_QUESTIONS.length}</span>
            <span>{progressPercent}% hoàn thành</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Câu hỏi {currentIdx + 1}
            </span>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onShowAngleOnCircle(currentQ.visualAngle)}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1.5 rounded-xl border border-indigo-200 hover:bg-indigo-100 shrink-0 transition"
            title="Minh họa góc này trên đường tròn lượng giác"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem góc ({currentQ.visualAngle}°)</span>
          </button>
        </div>

        {/* Options */}
        <div className="space-y-2 pt-1">
          {currentQ.options.map((opt, oIdx) => {
            const isChosen = selectedOpt === oIdx;
            const showSuccess = isAnswered && oIdx === currentQ.correctIndex;
            const showError = isAnswered && isChosen && !isCorrect;

            let borderClass = 'border-slate-200 bg-slate-50/60 hover:bg-slate-100/80';
            if (showSuccess) {
              borderClass = 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-200 text-emerald-950 font-bold';
            } else if (showError) {
              borderClass = 'border-rose-500 bg-rose-50/90 ring-2 ring-rose-200 text-rose-950';
            } else if (isChosen) {
              borderClass = 'border-indigo-400 bg-indigo-50/80 ring-2 ring-indigo-200 font-semibold';
            }

            return (
              <button
                key={oIdx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(oIdx)}
                className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between text-xs cursor-pointer ${borderClass}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      isChosen
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span>{opt}</span>
                </div>

                {showSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                {showError && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100 flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Câu trước
            </button>

            {!isAnswered ? (
              <button
                type="button"
                disabled={selectedOpt === undefined}
                onClick={handleCheckAnswer}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Trả lời
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onShowAngleOnCircle(currentQ.visualAngle)}
                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Minh họa trên đường tròn</span>
              </button>
            )}
          </div>

          <button
            type="button"
            disabled={currentIdx === QUIZ_QUESTIONS.length - 1}
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-1.5 bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Detailed Explanation Box */}
        {isAnswered && (
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${
              isCorrect
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CHÍNH XÁC!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>HÃY XEM GIẢI THÍCH CHI TIẾT:</span>
                </>
              )}
            </div>
            <p className="pl-5 text-slate-700">{currentQ.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
