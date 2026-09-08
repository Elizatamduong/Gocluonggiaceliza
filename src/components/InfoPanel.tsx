import React from 'react';
import { analyzeAngle, degreesToPrettyRadian } from '../utils/mathUtils';
import { Compass, RotateCw, RotateCcw, MapPin, Sparkles, HelpCircle, CheckCircle } from 'lucide-react';

interface InfoPanelProps {
  degrees: number;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ degrees }) => {
  const data = analyzeAngle(degrees);

  // Deconstruct formula
  const turns = Math.floor(Math.abs(degrees) / 360);
  const remainder = degrees % 360;

  // Pedagogical reflective prompt based on current angle characteristics
  const getPedagogicalObservation = () => {
    if (degrees === 0) {
      return {
        question: 'Tia cuối OB đang ở đâu?',
        answer: 'Tia OB trùng với tia đầu OA trên chiều dương trục hoành Ox. Góc lượng giác có số đo 0°.',
      };
    }
    if (Math.abs(degrees) > 360) {
      return {
        question: 'Khi góc lớn hơn 360° (quay quá một vòng), điều gì xảy ra?',
        answer: `Tia OB đã quay đủ ${turns} vòng đầy đủ và đi thêm ${Math.abs(remainder)}°. Vị trí tia cuối giống với góc ${remainder >= 0 ? remainder : remainder + 360}°, nhưng số đo của góc lượng giác là ${degrees}°. Hai góc này có cùng tia đầu và tia cuối nhưng số đo KHÁC NHAU!`,
      };
    }
    if (degrees < 0) {
      return {
        question: 'Dấu âm (-) của góc lượng giác thể hiện điều gì?',
        answer: `Góc âm nghĩa là tia OB quay CÙNG CHIỀU kim đồng hồ. Ví dụ: góc ${degrees}° có số đo âm, quay ngược lại so với chiều dương quy ước.`,
      };
    }
    return {
      question: 'Tia OB đang quét qua góc phần tư nào?',
      answer: `Tia cuối OB đang ${data.quadrantName}. Khi tia quay ngược chiều kim đồng hồ, số đo góc tăng dần theo chiều dương.`,
    };
  };

  const observation = getPedagogicalObservation();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-rose-600" />
          <h3 className="font-bold text-slate-800 text-sm">Thông tin lượng giác trực quan</h3>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          (OA, OB)
        </span>
      </div>

      {/* Grid of Key Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Metric 1: Số đo Góc (Độ & Radian) */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Số đo góc lượng giác</div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 font-mono">
              {degrees > 0 ? `+${degrees}°` : `${degrees}°`}
            </span>
            <span className="text-sm font-bold text-purple-700 font-mono bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
              {data.radianFraction} rad
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-500 font-mono">
            ≈ {data.radianDecimal} radian
          </div>
        </div>

        {/* Metric 2: Chiều quay */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chiều quay</div>
          <div className="mt-1 flex items-center gap-2">
            {degrees > 0 ? (
              <>
                <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-bold text-emerald-700">Chiều DƯƠNG (+)</span>
              </>
            ) : degrees < 0 ? (
              <>
                <RotateCw className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-sm font-bold text-amber-700">Chiều ÂM (−)</span>
              </>
            ) : (
              <span className="text-sm font-bold text-slate-600">Góc ban đầu (0°)</span>
            )}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {degrees > 0
              ? 'Ngược chiều kim đồng hồ'
              : degrees < 0
              ? 'Cùng chiều kim đồng hồ'
              : 'Tia OB trùng tia OA'}
          </div>
        </div>

        {/* Metric 3: Số vòng quay & Công thức phân tích */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Số vòng quay</div>
          <div className="mt-1 text-sm font-bold text-indigo-900 font-mono">
            {Math.abs(degrees) >= 360 ? (
              <span>
                {turns} vòng {Math.abs(remainder) !== 0 ? `+ ${Math.abs(remainder)}°` : ''}
              </span>
            ) : (
              <span>Chưa quay hết 1 vòng ({Math.abs(degrees)}° / 360°)</span>
            )}
          </div>
          <div className="mt-1 text-xs text-slate-600 font-mono bg-white px-2 py-1 rounded border border-slate-200 inline-block">
            α = {Math.trunc(degrees / 360)} × 360° + ({remainder}°)
          </div>
        </div>

        {/* Metric 4: Vị trí tia cuối & Tọa độ B */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vị trí tia cuối OB</div>
          <div className="mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="text-xs font-bold text-slate-800 line-clamp-1">{data.quadrantName}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-xs font-mono text-slate-700">
            <span>Điểm B(cos; sin):</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
              ({data.pointCoordinates.x}; {data.pointCoordinates.y})
            </span>
          </div>
        </div>
      </div>

      {/* Pedagogical Reflection Card (Tiến trình sư phạm quan sát -> nhận xét -> hình thành khái niệm) */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 space-y-1.5">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Gợi ý quan sát sư phạm (SGK Toán 11):</span>
        </div>
        <div className="text-xs font-semibold text-amber-950 flex items-start gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
          <span>{observation.question}</span>
        </div>
        <p className="text-xs text-amber-900/90 pl-5 leading-relaxed">
          {observation.answer}
        </p>
      </div>
    </div>
  );
};
