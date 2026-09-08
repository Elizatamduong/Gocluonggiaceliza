import React, { useState, useEffect, useRef } from 'react';
import { ANGLE_PRESETS } from '../data/lessonData';
import { analyzeAngle, degreesToPiFraction } from '../utils/mathUtils';
import {
  Search,
  RotateCcw,
  RotateCw,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle,
  Play,
  Pause,
} from 'lucide-react';

interface ExploreTabProps {
  currentDegrees: number;
  onSelectAngle: (deg: number) => void;
  onAnimateToAngle: (targetDeg: number) => void;
  isAnimating: boolean;
}

export const ExploreTab: React.FC<ExploreTabProps> = ({
  currentDegrees,
  onSelectAngle,
  onAnimateToAngle,
  isAnimating,
}) => {
  const [customInput, setCustomInput] = useState<string>('450');
  const [activeCategory, setActiveCategory] = useState<'all' | 'quay_nhieu_vong' | 'goc_am' | 'co_ban'>('all');

  const filteredPresets =
    activeCategory === 'all'
      ? ANGLE_PRESETS
      : ANGLE_PRESETS.filter((p) => p.category === activeCategory);

  const angleData = analyzeAngle(currentDegrees);

  // Decompose current angle
  const fullTurns = Math.floor(Math.abs(currentDegrees) / 360);
  const remainder = currentDegrees % 360;
  const isMultiTurn = Math.abs(currentDegrees) >= 360;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(customInput);
    if (!isNaN(val)) {
      onAnimateToAngle(Math.round(val));
    }
  };

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="bg-gradient-to-r from-indigo-50 via-white to-blue-50 border border-indigo-100 rounded-2xl p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Khám phá bản chất Góc lượng giác
            </h2>
            <p className="text-xs text-slate-500">
              Nhập bất kỳ góc nào để quan sát animation tia quay thực tế, số vòng lặp và phân biệt chiều quay.
            </p>
          </div>
        </div>

        {/* Input box for Custom Angle with Play Animation */}
        <form onSubmit={handleCustomSubmit} className="mt-3.5 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-300 shadow-xs focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
            <label htmlFor="custom-angle" className="text-xs font-bold text-slate-600">
              Nhập góc cần mô phỏng:
            </label>
            <input
              id="custom-angle"
              type="number"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="VD: 450, 810, -135..."
              className="w-24 text-sm font-bold text-slate-800 focus:outline-none font-mono"
            />
            <span className="text-sm font-bold text-slate-500">°</span>
          </div>

          <button
            type="submit"
            disabled={isAnimating}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Mô phỏng tia quay</span>
          </button>
        </form>
      </div>

      {/* Real-time Pedagogical Breakdown Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Phân tích sư phạm góc hiện tại: {currentDegrees > 0 ? `+${currentDegrees}°` : `${currentDegrees}°`}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
            {angleData.radianFraction} rad
          </span>
        </div>

        {/* Detailed Explanation according to SGK Ket noi tri thuc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Box 1: Chiều quay */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">1. Chiều quay của tia</div>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              {currentDegrees > 0 ? (
                <>
                  <RotateCcw className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Chiều DƯƠNG (+)</span>
                </>
              ) : currentDegrees < 0 ? (
                <>
                  <RotateCw className="w-4 h-4 text-amber-600" />
                  <span className="text-amber-700">Chiều ÂM (−)</span>
                </>
              ) : (
                <span className="text-slate-600">Góc ban đầu 0°</span>
              )}
            </div>
            <p className="text-slate-600 leading-normal">
              {currentDegrees > 0
                ? 'Tia OB quay ngược chiều kim đồng hồ quanh gốc O.'
                : currentDegrees < 0
                ? 'Tia OB quay cùng chiều kim đồng hồ quanh gốc O.'
                : 'Tia OB chưa thực hiện chuyển động quay.'}
            </p>
          </div>

          {/* Box 2: Phân tích số vòng */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">2. Số vòng quay</div>
            <div className="font-bold text-sm text-indigo-900 font-mono">
              {currentDegrees} = {Math.trunc(currentDegrees / 360)} × 360° + ({remainder}°)
            </div>
            <p className="text-slate-600 leading-normal">
              {isMultiTurn ? (
                <span>
                  Tia OB quay <b className="text-indigo-700">{fullTurns} vòng</b> đầy đủ rồi quay tiếp <b className="text-indigo-700">{Math.abs(remainder)}°</b>.
                </span>
              ) : (
                <span>Tia OB chưa quay quá một vòng trọn vẹn (360°).</span>
              )}
            </p>
          </div>

          {/* Box 3: Vị trí tia cuối */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="font-bold text-slate-500 uppercase text-[10px]">3. Vị trí tia cuối OB</div>
            <div className="font-bold text-sm text-rose-700">
              {angleData.quadrantName}
            </div>
            <p className="text-slate-600 leading-normal">
              Tia cuối OB dừng tại vị trí tương ứng với điểm <b className="font-mono">({angleData.pointCoordinates.x}; {angleData.pointCoordinates.y})</b> trên đường tròn.
            </p>
          </div>
        </div>

        {/* Highlighted Pedagogical Warning regarding 450° vs 90° */}
        {isMultiTurn && (
          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>LƯU Ý TRỌNG TÂM SGK TOÁN 11:</span>
            </div>
            <p className="leading-relaxed">
              Mặc dù vị trí của tia cuối OB sau khi quay <b>{currentDegrees}°</b> trùng với vị trí tia cuối của góc <b>{remainder >= 0 ? remainder : remainder + 360}°</b>, 
              nhưng <b>chúng không phải là cùng một góc lượng giác về mặt số đo</b>! 
              Góc <b>{currentDegrees}°</b> đã trải qua <b>{fullTurns} vòng quay ({fullTurns * 360}°)</b> bổ sung.
            </p>
          </div>
        )}
      </div>

      {/* Preset Library from SGK Ket noi tri thuc */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-600" />
            <h3 className="font-bold text-slate-800 text-sm">
              Các góc tiêu biểu trong SGK Toán 11
            </h3>
          </div>
          {/* Category Filter Pills */}
          <div className="flex gap-1">
            {(
              [
                { id: 'all', label: 'Tất cả' },
                { id: 'co_ban', label: 'Cơ bản' },
                { id: 'quay_nhieu_vong', label: 'Quay nhiều vòng' },
                { id: 'goc_am', label: 'Góc âm' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-0.5 text-[11px] rounded-md font-semibold transition ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredPresets.map((preset) => {
            const isSelected = currentDegrees === preset.degrees;
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => onAnimateToAngle(preset.degrees)}
                className={`text-left p-2.5 rounded-xl border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 ring-2 ring-indigo-200'
                    : 'bg-slate-50/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900 font-mono">
                    {preset.name}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold font-mono ${
                      preset.degrees < 0
                        ? 'bg-amber-100 text-amber-800'
                        : Math.abs(preset.degrees) >= 360
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {degreesToPiFraction(preset.degrees)} rad
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-tight">
                  {preset.note}
                </p>
                <div className="mt-2 text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                  <span>Mô phỏng</span>
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
