import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UnitCircleCanvas } from './components/UnitCircleCanvas';
import { AngleControls } from './components/AngleControls';
import { InfoPanel } from './components/InfoPanel';
import { ExploreTab } from './components/ExploreTab';
import { CompareTab } from './components/CompareTab';
import { PredictionTab } from './components/PredictionTab';
import { QuizTab } from './components/QuizTab';
import { TeachingPresentationTab } from './components/TeachingPresentationTab';
import { SummaryTab } from './components/SummaryTab';
import {
  Compass,
  Search,
  Scale,
  Target,
  BrainCircuit,
  GraduationCap,
  BookOpen,
  Maximize2,
  Tv,
} from 'lucide-react';

export default function App() {
  // Primary angle in degrees
  const [degrees, setDegrees] = useState<number>(60);
  
  // Secondary angle for comparison mode
  const [secondAngle, setSecondAngle] = useState<number | null>(null);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'explore' | 'compare' | 'predict' | 'quiz' | 'teach' | 'summary'
  >('overview');

  // Display annotations toggles
  const [showPositiveDir, setShowPositiveDir] = useState(true);
  const [showNegativeDir, setShowNegativeDir] = useState(true);
  const [showAngleArc, setShowAngleArc] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(true);
  const [showRadianLabels, setShowRadianLabels] = useState(false);

  // States for Prediction mode
  const [isPredictionRevealed, setIsPredictionRevealed] = useState(false);
  const [highlightQuadrant, setHighlightQuadrant] = useState<'I' | 'II' | 'III' | 'IV' | null>(null);

  // Animation frame state for smooth sweeping
  const [isAnimating, setIsAnimating] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  // When switching to Compare tab, enable second angle default
  useEffect(() => {
    if (activeTab === 'compare') {
      if (secondAngle === null) setSecondAngle(420);
    } else {
      setSecondAngle(null);
    }

    if (activeTab === 'predict') {
      setIsPredictionRevealed(false);
      setHighlightQuadrant(null);
    } else {
      setIsPredictionRevealed(true);
      setHighlightQuadrant(null);
    }
  }, [activeTab]);

  /**
   * Smoothly sweeps the terminal ray from current degrees to target degrees
   * so students visually see the sweep and full rotations.
   */
  const animateToAngle = useCallback(
    (targetDeg: number, onComplete?: () => void) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setIsAnimating(true);

      const start = degrees;
      const diff = targetDeg - start;
      if (Math.abs(diff) < 1) {
        setDegrees(targetDeg);
        setIsAnimating(false);
        onComplete?.();
        return;
      }

      const duration = Math.min(2200, Math.max(700, Math.abs(diff) * 1.8)); // ms
      const startTime = performance.now();

      const updateSweep = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeInOutQuad
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const current = Math.round(start + diff * ease);
        setDegrees(current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(updateSweep);
        } else {
          setDegrees(targetDeg);
          setIsAnimating(false);
          animFrameRef.current = null;
          onComplete?.();
        }
      };

      animFrameRef.current = requestAnimationFrame(updateSweep);
    },
    [degrees]
  );

  const handleAngleChange = (newDeg: number) => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setIsAnimating(false);
    setDegrees(newDeg);
  };

  const handleCompareChange = (a: number, b: number) => {
    setDegrees(a);
    setSecondAngle(b);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      {/* Top Application Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-2">
          {/* Logo & Subject info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-rose-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  GÓC LƯỢNG GIÁC
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-extrabold border border-indigo-200">
                  Toán 11 • GDPT 2018
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Bộ sách Kết nối tri thức với cuộc sống • Học liệu số & Trợ giảng trực quan
              </p>
            </div>
          </div>

          {/* Quick status badge */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl flex items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-500">Góc hiện tại:</span>
              <span className="font-mono font-black text-sm text-indigo-600">
                {degrees > 0 ? `+${degrees}°` : `${degrees}°`}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <nav className="flex space-x-1 py-1 text-xs font-bold border-t border-slate-100 min-w-max">
            {[
              { id: 'overview', label: '🌐 Đường tròn lượng giác', icon: Compass },
              { id: 'explore', label: '🔎 Khám phá góc', icon: Search },
              { id: 'compare', label: '⚖️ So sánh hai góc', icon: Scale },
              { id: 'predict', label: '🎯 Dự đoán → Kiểm tra', icon: Target },
              { id: 'quiz', label: '🧠 Thử sức (Trắc nghiệm)', icon: BrainCircuit },
              { id: 'teach', label: '🎓 Chế độ giảng dạy', icon: GraduationCap },
              { id: 'summary', label: '📖 Kết luận SGK', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT COLUMN: The Interactive Unit Circle Centerpiece (Width: 5 cols on lg) */}
          <section className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <h2 className="font-bold text-sm text-slate-800">
                    Khu vực A: Đường tròn lượng giác
                  </h2>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  R = 1, Gốc A(1; 0)
                </span>
              </div>

              {/* The SVG Canvas */}
              <UnitCircleCanvas
                degrees={degrees}
                onAngleChange={handleAngleChange}
                secondAngle={secondAngle}
                isSecondRayActive={activeTab === 'compare'}
                hideTerminalRay={activeTab === 'predict' && !isPredictionRevealed}
                highlightQuadrant={highlightQuadrant}
                showPositiveDir={showPositiveDir}
                showNegativeDir={showNegativeDir}
                showAngleArc={showAngleArc}
                showCoordinates={showCoordinates}
                showQuadrantLabels={true}
                showSpecialAngles={true}
                showRadianLabels={showRadianLabels}
                interactiveDrag={activeTab !== 'predict' || isPredictionRevealed}
                size={440}
              />
            </div>

            {/* Quick mini-summary bar under the circle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500">Tia đầu:</span>
                <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  OA (Cố định)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-500">Tia cuối:</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  OB ({degrees > 0 ? `+${degrees}°` : `${degrees}°`})
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Active Functionality / Controls / Tabs (Width: 7 cols on lg) */}
          <section className="lg:col-span-7 space-y-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* Khu vực B: Bảng điều khiển */}
                <AngleControls
                  degrees={degrees}
                  onAngleChange={handleAngleChange}
                  showPositiveDir={showPositiveDir}
                  setShowPositiveDir={setShowPositiveDir}
                  showNegativeDir={showNegativeDir}
                  setShowNegativeDir={setShowNegativeDir}
                  showAngleArc={showAngleArc}
                  setShowAngleArc={setShowAngleArc}
                  showCoordinates={showCoordinates}
                  setShowCoordinates={setShowCoordinates}
                  showRadianLabels={showRadianLabels}
                  setShowRadianLabels={setShowRadianLabels}
                />

                {/* Khu vực C: Thông tin trực quan & Gợi mở sư phạm */}
                <InfoPanel degrees={degrees} />
              </div>
            )}

            {activeTab === 'explore' && (
              <ExploreTab
                currentDegrees={degrees}
                onSelectAngle={handleAngleChange}
                onAnimateToAngle={animateToAngle}
                isAnimating={isAnimating}
              />
            )}

            {activeTab === 'compare' && (
              <CompareTab
                angleA={degrees}
                angleB={secondAngle ?? 420}
                onChangeAngles={handleCompareChange}
              />
            )}

            {activeTab === 'predict' && (
              <PredictionTab
                currentDegrees={degrees}
                onSetAngle={handleAngleChange}
                onRunTestAnimation={(deg) => {
                  animateToAngle(deg, () => setIsPredictionRevealed(true));
                }}
                isRevealed={isPredictionRevealed}
                setIsRevealed={setIsPredictionRevealed}
                setHighlightQuadrant={setHighlightQuadrant}
              />
            )}

            {activeTab === 'quiz' && (
              <QuizTab
                onShowAngleOnCircle={(deg) => {
                  animateToAngle(deg);
                }}
              />
            )}

            {activeTab === 'teach' && (
              <TeachingPresentationTab
                currentDegrees={degrees}
                onSetAngle={handleAngleChange}
                onAnimateToAngle={animateToAngle}
              />
            )}

            {activeTab === 'summary' && <SummaryTab />}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        Ứng dụng học tập tương tác môn Toán 11 • Bài 1: Góc lượng giác • Bám sát SGK Kết nối tri thức với cuộc sống (Chương trình GDPT 2018)
      </footer>
    </div>
  );
}
