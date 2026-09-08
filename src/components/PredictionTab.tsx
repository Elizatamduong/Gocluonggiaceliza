import React, { useState } from 'react';
import { analyzeAngle, degreesToPiFraction, normalizeDegrees } from '../utils/mathUtils';
import { Target, CheckCircle2, XCircle, HelpCircle, ArrowRight, Shuffle, Sparkles } from 'lucide-react';

interface PredictionTabProps {
  currentDegrees: number;
  onSetAngle: (deg: number) => void;
  onRunTestAnimation: (deg: number) => void;
  isRevealed: boolean;
  setIsRevealed: (v: boolean) => void;
  setHighlightQuadrant: (q: 'I' | 'II' | 'III' | 'IV' | null) => void;
}

export const PredictionTab: React.FC<PredictionTabProps> = ({
  currentDegrees,
  onSetAngle,
  onRunTestAnimation,
  isRevealed,
  setIsRevealed,
  setHighlightQuadrant,
}) => {
  const [inputAngle, setInputAngle] = useState(currentDegrees.toString());
  const [predictedQuadrant, setPredictedQuadrant] = useState<'I' | 'II' | 'III' | 'IV' | 'axis' | null>(null);
  const [predictedDirection, setPredictedDirection] = useState<'positive' | 'negative' | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const angleData = analyzeAngle(currentDegrees);

  const sampleChallengeAngles = [-135, 210, 420, -300, 570, -45, 810, -225, 495];

  const handleApplyAngle = (deg: number) => {
    setInputAngle(deg.toString());
    onSetAngle(deg);
    setIsRevealed(false);
    setHasChecked(false);
    setPredictedQuadrant(null);
    setPredictedDirection(null);
    setHighlightQuadrant(null);
  };

  const handleRandomChallenge = () => {
    const random = sampleChallengeAngles[Math.floor(Math.random() * sampleChallengeAngles.length)];
    handleApplyAngle(random);
  };

  const handleCheck = () => {
    if (!predictedQuadrant || !predictedDirection) return;
    setHasChecked(true);
    setIsRevealed(true);
    // highlight correct quadrant
    if (['I', 'II', 'III', 'IV'].includes(angleData.quadrant)) {
      setHighlightQuadrant(angleData.quadrant as 'I' | 'II' | 'III' | 'IV');
    }
    // run visual animation to terminal ray
    onRunTestAnimation(currentDegrees);
  };

  // Evaluation
  const isDirCorrect =
    (currentDegrees > 0 && predictedDirection === 'positive') ||
    (currentDegrees < 0 && predictedDirection === 'negative') ||
    (currentDegrees === 0);

  const isQuadCorrect =
    (predictedQuadrant === 'I' && angleData.quadrant === 'I') ||
    (predictedQuadrant === 'II' && angleData.quadrant === 'II') ||
    (predictedQuadrant === 'III' && angleData.quadrant === 'III') ||
    (predictedQuadrant === 'IV' && angleData.quadrant === 'IV') ||
    (predictedQuadrant === 'axis' && angleData.quadrant.startsWith('axis'));

  const isAllCorrect = isDirCorrect && isQuadCorrect;

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-emerald-200 rounded-2xl p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Hoạt động: Dự đoán → Kiểm tra
              </h2>
              <p className="text-xs text-slate-500">
                Tia cuối đang bị ẩn trên đường tròn. Hãy dự đoán hướng quay và góc phần tư rồi bấm "Kiểm tra"!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRandomChallenge}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 rounded-xl text-xs font-bold transition shadow-xs"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Đổi góc thử thách ngẫu nhiên</span>
          </button>
        </div>

        {/* Custom angle form for teachers */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const val = parseFloat(inputAngle);
            if (!isNaN(val)) handleApplyAngle(Math.round(val));
          }}
          className="mt-3.5 flex items-center gap-2 flex-wrap"
        >
          <span className="text-xs font-bold text-slate-600">Góc kiểm tra:</span>
          <div className="flex items-center bg-white px-3 py-1 rounded-xl border border-slate-300 shadow-xs">
            <input
              type="number"
              value={inputAngle}
              onChange={(e) => setInputAngle(e.target.value)}
              className="w-20 font-mono font-bold text-sm text-slate-800 focus:outline-none"
            />
            <span className="text-sm font-semibold text-slate-500">°</span>
          </div>
          <button
            type="submit"
            className="px-3 py-1 text-xs font-bold bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition"
          >
            Đặt góc này
          </button>
        </form>
      </div>

      {/* Prediction questionnaire form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Phiếu dự đoán cho góc: <span className="font-mono text-emerald-700 font-black text-base">{currentDegrees > 0 ? `+${currentDegrees}°` : `${currentDegrees}°`}</span>
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {isRevealed ? 'Đã hiển thị tia cuối' : 'Tia cuối đang ẩn'}
          </span>
        </div>

        {/* Step 1: Predict Direction */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">1</span>
            <span>Tia OB sẽ quay theo chiều nào?</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={hasChecked}
              onClick={() => setPredictedDirection('positive')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                predictedDirection === 'positive'
                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                  : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <div>
                <div className="font-bold text-xs text-slate-800">Chiều DƯƠNG (+)</div>
                <div className="text-[11px] text-slate-500">Ngược chiều kim đồng hồ</div>
              </div>
            </button>

            <button
              type="button"
              disabled={hasChecked}
              onClick={() => setPredictedDirection('negative')}
              className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                predictedDirection === 'negative'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                  : 'bg-slate-50 border-slate-200 hover:bg-white'
              }`}
            >
              <div>
                <div className="font-bold text-xs text-slate-800">Chiều ÂM (−)</div>
                <div className="text-[11px] text-slate-500">Cùng chiều kim đồng hồ</div>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Predict Quadrant */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">2</span>
            <span>Tia cuối OB sẽ dừng ở góc phần tư nào?</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'I', label: 'Góc phần tư I', sub: '(0° đến 90°)' },
              { id: 'II', label: 'Góc phần tư II', sub: '(90° đến 180°)' },
              { id: 'III', label: 'Góc phần tư III', sub: '(180° đến 270°)' },
              { id: 'IV', label: 'Góc phần tư IV', sub: '(270° đến 360°)' },
              { id: 'axis', label: 'Trên trục tọa độ', sub: '(Ox hoặc Oy)' },
            ].map((q) => (
              <button
                key={q.id}
                type="button"
                disabled={hasChecked}
                onClick={() => setPredictedQuadrant(q.id as any)}
                className={`p-2.5 rounded-xl border text-center transition flex flex-col justify-center items-center ${
                  predictedQuadrant === q.id
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-slate-50 border-slate-200 hover:bg-white'
                }`}
              >
                <span className="font-bold text-xs text-slate-800">{q.label}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{q.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: KIỂM TRA */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            disabled={!predictedQuadrant || !predictedDirection || hasChecked}
            onClick={handleCheck}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>🔍 KIỂM TRA VÀ XEM ANIMATION</span>
          </button>

          {hasChecked && (
            <button
              type="button"
              onClick={() => handleApplyAngle(currentDegrees)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
            >
              Thử lại góc này
            </button>
          )}
        </div>

        {/* Verification Result Card */}
        {hasChecked && (
          <div
            className={`p-4 rounded-xl border transition space-y-2 ${
              isAllCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isAllCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>XUẤT SẮC! DỰ ĐOÁN HOÀN TOÀN CHÍNH XÁC!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-amber-600" />
                  <span>CHƯA CHÍNH XÁC! HÃY CÙNG QUAN SÁT GIẢI THÍCH CHI TIẾT:</span>
                </>
              )}
            </div>

            <div className="text-xs leading-relaxed space-y-1 pl-7">
              <p>
                <b>1. Chiều quay:</b> Góc là <b>{currentDegrees}°</b> {currentDegrees < 0 ? 'có dấu âm (−) nên tia quay CÙNG CHIỀU KIM ĐỒNG HỒ (chiều âm)' : 'có dấu dương (+) nên tia quay NGƯỢC CHIỀU KIM ĐỒNG HỒ (chiều dương)'}.
              </p>
              <p>
                <b>2. Vị trí tia cuối:</b> {angleData.quadrantName}. Điểm cuối B có tọa độ ({angleData.pointCoordinates.x}; {angleData.pointCoordinates.y}).
              </p>
              <p>
                <b>3. Phân tích:</b> {currentDegrees}° = {Math.trunc(currentDegrees / 360)} × 360° + ({currentDegrees % 360}°).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
