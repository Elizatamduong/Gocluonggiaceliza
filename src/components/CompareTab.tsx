import React, { useState } from 'react';
import { COMPARISON_PAIRS } from '../data/lessonData';
import { degreesToPiFraction, normalizeDegrees } from '../utils/mathUtils';
import { Scale, ArrowRight, Check, X, Info, Sparkles } from 'lucide-react';

interface CompareTabProps {
  angleA: number;
  angleB: number;
  onChangeAngles: (a: number, b: number) => void;
}

export const CompareTab: React.FC<CompareTabProps> = ({
  angleA,
  angleB,
  onChangeAngles,
}) => {
  const [inputA, setInputA] = useState(angleA.toString());
  const [inputB, setInputB] = useState(angleB.toString());

  const delta = angleB - angleA;
  const kTurns = delta / 360;
  const isKInteger = Math.abs(kTurns - Math.round(kTurns)) < 0.0001;
  const integerK = Math.round(kTurns);

  const normA = normalizeDegrees(angleA);
  const normB = normalizeDegrees(angleB);
  const sameTerminal = Math.abs(normA - normB) < 0.001;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(inputA);
    const b = parseFloat(inputB);
    if (!isNaN(a) && !isNaN(b)) {
      onChangeAngles(Math.round(a), Math.round(b));
    }
  };

  const handleSelectPair = (pair: (typeof COMPARISON_PAIRS)[0]) => {
    setInputA(pair.angleA.toString());
    setInputB(pair.angleB.toString());
    onChangeAngles(pair.angleA, pair.angleB);
  };

  return (
    <div className="space-y-4">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-pink-50 border border-purple-100 rounded-2xl p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              So sánh hai góc lượng giác
            </h2>
            <p className="text-xs text-slate-500">
              Quan sát hai tia cuối trên cùng đường tròn lượng giác để khám phá mối liên hệ $\alpha - \beta = k \cdot 360^\circ$.
            </p>
          </div>
        </div>

        {/* Input Inputs Form */}
        <form onSubmit={handleSubmit} className="mt-3.5 flex flex-wrap items-center gap-3">
          {/* Angle A input */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-rose-300 shadow-xs">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <label htmlFor="compare-a" className="text-xs font-bold text-slate-700">
              Góc A (α):
            </label>
            <input
              id="compare-a"
              type="number"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              className="w-18 text-sm font-bold text-rose-700 font-mono focus:outline-none"
            />
            <span className="text-xs font-bold text-slate-500">°</span>
          </div>

          {/* Angle B input */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-300 shadow-xs">
            <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
            <label htmlFor="compare-b" className="text-xs font-bold text-slate-700">
              Góc B (β):
            </label>
            <input
              id="compare-b"
              type="number"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              className="w-18 text-sm font-bold text-purple-700 font-mono focus:outline-none"
            />
            <span className="text-xs font-bold text-slate-500">°</span>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
          >
            So sánh ngay
          </button>
        </form>
      </div>

      {/* Comparison Analysis Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h3 className="font-bold text-slate-800 text-sm">
            Kết quả phân tích hình học & lượng giác
          </h3>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Angle A card */}
          <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-800 uppercase text-[10px]">Tia cuối OB₁ (Góc A)</span>
              <span className="font-bold text-rose-600 font-mono">{degreesToPiFraction(angleA)} rad</span>
            </div>
            <div className="text-xl font-black text-rose-900 font-mono">
              {angleA > 0 ? `+${angleA}°` : `${angleA}°`}
            </div>
            <p className="text-rose-800/80 text-[11px]">
              Số vòng: {Math.trunc(angleA / 360)} vòng {angleA % 360 !== 0 ? `+ (${angleA % 360}°)` : ''}
            </p>
          </div>

          {/* Angle B card */}
          <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-800 uppercase text-[10px]">Tia cuối OB₂ (Góc B)</span>
              <span className="font-bold text-purple-600 font-mono">{degreesToPiFraction(angleB)} rad</span>
            </div>
            <div className="text-xl font-black text-purple-900 font-mono">
              {angleB > 0 ? `+${angleB}°` : `${angleB}°`}
            </div>
            <p className="text-purple-800/80 text-[11px]">
              Số vòng: {Math.trunc(angleB / 360)} vòng {angleB % 360 !== 0 ? `+ (${angleB % 360}°)` : ''}
            </p>
          </div>

          {/* Verdict Card */}
          <div
            className={`p-3 rounded-xl border space-y-1 flex flex-col justify-between ${
              sameTerminal
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                : 'bg-amber-50/70 border-amber-300 text-amber-900'
            }`}
          >
            <div>
              <div className="font-bold uppercase text-[10px]">Kết luận vị trí tia cuối</div>
              <div className="mt-1 flex items-center gap-1.5 font-bold text-sm">
                {sameTerminal ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>TRÙNG NHAU</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-amber-600" />
                    <span>KHÔNG TRÙNG NHAU</span>
                  </>
                )}
              </div>
            </div>
            <div className="text-[11px] font-mono">
              Hiệu: β - α = {delta}° = {isKInteger ? `${integerK} × 360°` : 'Không chia hết cho 360°'}
            </div>
          </div>
        </div>

        {/* Pedagogical Conclusion Message */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Định lý quan trọng (SGK Toán 11 - Kết nối tri thức):</span>
          </div>
          {sameTerminal ? (
            <p className="text-slate-700">
              Hai góc lượng giác <b>{angleA}°</b> và <b>{angleB}°</b> có <b>cùng tia đầu OA và cùng tia cuối OB</b> vì hiệu số đo của chúng là một bội nguyên của 360° ({delta}° = {integerK} × 360°). 
              Tuy nhiên, chúng có <b>số đo khác nhau</b> vì số vòng quay lệch nhau đúng <b>{Math.abs(integerK)} vòng</b>!
            </p>
          ) : (
            <p className="text-slate-700">
              Hai góc lượng giác <b>{angleA}°</b> và <b>{angleB}°</b> <b>không có cùng tia cuối</b> vì hiệu số đo {delta}° không phải là bội số của 360°.
            </p>
          )}
        </div>
      </div>

      {/* Recommended Standard Pairs from SGK */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2.5">
        <h3 className="font-bold text-slate-800 text-sm">
          Các cặp so sánh mẫu chuẩn SGK Kết nối tri thức
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {COMPARISON_PAIRS.map((pair) => {
            const isActive = angleA === pair.angleA && angleB === pair.angleB;
            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => handleSelectPair(pair)}
                className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                  isActive
                    ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs text-slate-900">
                  <span>{pair.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      pair.sameTerminalRay
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {pair.sameTerminalRay ? 'Cùng tia cuối' : 'Khác tia cuối'}
                  </span>
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2 leading-normal">
                  {pair.explanation}
                </p>
                <div className="mt-2 text-[10px] font-bold text-purple-600 flex items-center gap-1">
                  <span>Xem trên đường tròn</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
