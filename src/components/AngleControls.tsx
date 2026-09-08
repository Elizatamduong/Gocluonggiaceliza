import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  RotateCw,
  Sliders,
  Eye,
  EyeOff,
  Zap,
} from 'lucide-react';

interface AngleControlsProps {
  degrees: number;
  onAngleChange: (degrees: number) => void;
  // Annotation toggles
  showPositiveDir: boolean;
  setShowPositiveDir: (v: boolean) => void;
  showNegativeDir: boolean;
  setShowNegativeDir: (v: boolean) => void;
  showAngleArc: boolean;
  setShowAngleArc: (v: boolean) => void;
  showCoordinates: boolean;
  setShowCoordinates: (v: boolean) => void;
  showRadianLabels: boolean;
  setShowRadianLabels: (v: boolean) => void;
  // Optional target for guided animation
  targetDegrees?: number | null;
  onAnimationEnd?: () => void;
}

export const AngleControls: React.FC<AngleControlsProps> = ({
  degrees,
  onAngleChange,
  showPositiveDir,
  setShowPositiveDir,
  showNegativeDir,
  setShowNegativeDir,
  showAngleArc,
  setShowAngleArc,
  showCoordinates,
  setShowCoordinates,
  showRadianLabels,
  setShowRadianLabels,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1); // degrees per frame
  const [inputVal, setInputVal] = useState<string>(degrees.toString());
  const [showAnnotationMenu, setShowAnnotationMenu] = useState(false);

  const animFrameRef = useRef<number | null>(null);

  // Sync input box when degrees change externally
  useEffect(() => {
    setInputVal(degrees.toString());
  }, [degrees]);

  // Continuous play animation
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = () => {
      onAngleChange(degrees + playSpeed);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playSpeed, degrees, onAngleChange]);

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(inputVal);
    if (!isNaN(num)) {
      setIsPlaying(false);
      onAngleChange(Math.round(num));
    }
  };

  const handleQuickAdd = (delta: number) => {
    setIsPlaying(false);
    onAngleChange(degrees + delta);
  };

  const handleReset = () => {
    setIsPlaying(false);
    onAngleChange(0);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
      {/* Top row: Direct Angle Input & Slider value indicator */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-slate-800 text-sm">Bảng điều khiển góc</span>
        </div>

        {/* Input number box with submit */}
        <form onSubmit={handleInputSubmit} className="flex items-center gap-1.5">
          <label htmlFor="input-angle-deg" className="text-xs text-slate-500 font-medium">Nhập góc:</label>
          <div className="relative flex items-center">
            <input
              id="input-angle-deg"
              type="number"
              step="1"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-20 px-2 py-1 text-sm font-bold text-center bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
            <span className="ml-1 text-sm font-semibold text-slate-600">°</span>
          </div>
          <button
            type="submit"
            className="px-2.5 py-1 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Áp dụng
          </button>
        </form>
      </div>

      {/* Main Slider: -1080° to +1080° (3 full negative turns to 3 full positive turns) */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs text-slate-500">
          <span className="font-mono text-slate-400">-1080° (-3 vòng)</span>
          <span className="font-bold text-base text-indigo-700 font-mono">
            {degrees > 0 ? `+${degrees}°` : `${degrees}°`}
          </span>
          <span className="font-mono text-slate-400">+1080° (+3 vòng)</span>
        </div>
        <input
          id="angle-slider"
          type="range"
          min="-1080"
          max="1080"
          step="1"
          value={degrees}
          onChange={(e) => {
            setIsPlaying(false);
            onAngleChange(parseInt(e.target.value, 10));
          }}
          className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
        />
        {/* Visual tick mark at 0° */}
        <div className="flex justify-between text-[11px] text-slate-400 px-1 font-mono">
          <span>-720°</span>
          <span>-360°</span>
          <span className="text-slate-700 font-bold">0°</span>
          <span>+360°</span>
          <span>+720°</span>
        </div>
      </div>

      {/* Primary Action Buttons: Quay, Dừng, Đặt lại & Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {/* Play / Pause */}
        <button
          id="btn-play-pause"
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl shadow-sm transition ${
            isPlaying
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Tạm dừng</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Bắt đầu quay</span>
            </>
          )}
        </button>

        {/* Reset 0° */}
        <button
          id="btn-reset"
          type="button"
          onClick={handleReset}
          className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Đặt lại (0°)</span>
        </button>

        {/* Speed adjust */}
        <div className="col-span-2 sm:col-span-2 flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
          <span className="text-xs text-slate-500 font-medium">Tốc độ quay:</span>
          <div className="flex items-center gap-1">
            {[
              { label: 'Chậm', val: 0.5 },
              { label: 'Vừa', val: 1 },
              { label: 'Nhanh', val: 2.5 },
            ].map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setPlaySpeed(s.val)}
                className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition ${
                  playSpeed === s.val
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stepper Buttons: +10°, -10°, +90°, -90°, +1 vòng, -1 vòng */}
      <div className="space-y-1.5">
        <div className="text-xs font-semibold text-slate-500">Các bước nhảy góc nhanh:</div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          <button
            id="btn-step-minus-10"
            type="button"
            onClick={() => handleQuickAdd(-10)}
            className="flex items-center justify-center py-1.5 px-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-white transition"
          >
            -10°
          </button>
          <button
            id="btn-step-plus-10"
            type="button"
            onClick={() => handleQuickAdd(10)}
            className="flex items-center justify-center py-1.5 px-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-white transition"
          >
            +10°
          </button>
          <button
            id="btn-step-minus-90"
            type="button"
            onClick={() => handleQuickAdd(-90)}
            className="flex items-center justify-center py-1.5 px-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-amber-700 hover:bg-white transition"
          >
            -90°
          </button>
          <button
            id="btn-step-plus-90"
            type="button"
            onClick={() => handleQuickAdd(90)}
            className="flex items-center justify-center py-1.5 px-2 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-emerald-700 hover:bg-white transition"
          >
            +90°
          </button>
          <button
            id="btn-step-minus-turn"
            type="button"
            onClick={() => handleQuickAdd(-360)}
            className="flex items-center justify-center py-1.5 px-2 bg-amber-50 border border-amber-200 hover:border-amber-300 rounded-lg text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
          >
            -1 vòng
          </button>
          <button
            id="btn-step-plus-turn"
            type="button"
            onClick={() => handleQuickAdd(360)}
            className="flex items-center justify-center py-1.5 px-2 bg-emerald-50 border border-emerald-200 hover:border-emerald-300 rounded-lg text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition"
          >
            +1 vòng
          </button>
        </div>
      </div>

      {/* Annotations Toggle Bar */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            Hiện / Ẩn chú thích giảng dạy:
          </span>
          <button
            type="button"
            onClick={() => setShowAnnotationMenu(!showAnnotationMenu)}
            className="text-[11px] text-indigo-600 hover:underline font-medium"
          >
            {showAnnotationMenu ? 'Thu gọn' : 'Mở rộng tùy chọn'}
          </button>
        </div>

        {/* Toggles Pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setShowPositiveDir(!showPositiveDir)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
              showPositiveDir
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span>Chiều dương (+)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowNegativeDir(!showNegativeDir)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
              showNegativeDir
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span>Chiều âm (-)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAngleArc(!showAngleArc)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
              showAngleArc
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span>Cung quay / Xoắn ốc</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCoordinates(!showCoordinates)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
              showCoordinates
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span>Tọa độ B (cos, sin)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowRadianLabels(!showRadianLabels)}
            className={`px-2.5 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1 ${
              showRadianLabels
                ? 'bg-purple-50 text-purple-700 border-purple-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            <span>Nhãn Radian</span>
          </button>
        </div>
      </div>
    </div>
  );
};
