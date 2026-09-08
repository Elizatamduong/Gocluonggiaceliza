import React from 'react';
import { BookOpen, CheckCircle, ArrowRight, Table, AlertTriangle, Sparkles } from 'lucide-react';

export const SummaryTab: React.FC = () => {
  const specialAnglesTable = [
    { deg: '0°', rad: '0', cos: '1', sin: '0' },
    { deg: '30°', rad: 'π/6', cos: '√3/2', sin: '1/2' },
    { deg: '45°', rad: 'π/4', cos: '√2/2', sin: '√2/2' },
    { deg: '60°', rad: 'π/3', cos: '1/2', sin: '√3/2' },
    { deg: '90°', rad: 'π/2', cos: '0', sin: '1' },
    { deg: '120°', rad: '2π/3', cos: '-1/2', sin: '√3/2' },
    { deg: '135°', rad: '3π/4', cos: '-√2/2', sin: '√2/2' },
    { deg: '150°', rad: '5π/6', cos: '-√3/2', sin: '1/2' },
    { deg: '180°', rad: 'π', cos: '-1', sin: '0' },
    { deg: '270°', rad: '3π/2', cos: '0', sin: '-1' },
    { deg: '360°', rad: '2π', cos: '1', sin: '0' },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Tổng kết kiến thức trọng tâm (SGK Toán 11)
            </h2>
            <p className="text-xs text-slate-500">
              Bám sát bộ sách "Kết nối tri thức với cuộc sống" – Chương trình GDPT 2018.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pillar 1: Đường tròn lượng giác */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-blue-900 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
            <h3>Đường tròn lượng giác</h3>
          </div>
          <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 leading-relaxed">
            <li>Là đường tròn định hướng tâm <b>O(0, 0)</b>, bán kính <b>R = 1</b>.</li>
            <li>Điểm <b>A(1, 0)</b> trên trục hoành Ox được chọn làm <b>điểm gốc</b> của đường tròn.</li>
            <li>Tia <b>OA</b> là <b>tia đầu</b> cố định của các góc lượng giác.</li>
            <li><b>Chiều dương (+)</b>: ngược chiều quay của kim đồng hồ.</li>
            <li><b>Chiều âm (−)</b>: cùng chiều quay của kim đồng hồ.</li>
          </ul>
        </div>

        {/* Pillar 2: Khái niệm Góc lượng giác */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-indigo-900 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">2</span>
            <h3>Khái niệm Góc lượng giác (Ou, Ov)</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Cho hai tia <i>Ou, Ov</i>. Nếu tia <i>Om</i> quay quanh gốc <i>O</i> từ vị trí <i>Ou</i> đến vị trí <i>Ov</i> theo một chiều nhất định thì ta được một <b>góc lượng giác</b> có tia đầu là <i>Ou</i> và tia cuối là <i>Ov</i>.
          </p>
          <div className="p-2.5 bg-indigo-50/70 rounded-xl border border-indigo-200 text-[11px] text-indigo-950 font-medium">
            Ký hiệu góc lượng giác tia đầu Ou, tia cuối Ov: <b>(Ou, Ov)</b>
          </div>
        </div>

        {/* Pillar 3: Phân biệt Góc hình học và Góc lượng giác */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">3</span>
            <h3>Phân biệt Góc hình học & Góc lượng giác</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-700 block mb-1">Góc hình học:</span>
              <ul className="list-disc pl-3 text-slate-500 space-y-0.5">
                <li>Không có dấu (luôn ≥ 0°).</li>
                <li>Chỉ nằm trong [0°, 180°].</li>
                <li>Không có chiều quay.</li>
              </ul>
            </div>
            <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-200">
              <span className="font-bold text-amber-800 block mb-1">Góc lượng giác:</span>
              <ul className="list-disc pl-3 text-amber-900 space-y-0.5">
                <li>Có dấu (dương hoặc âm).</li>
                <li>Có thể lớn tùy ý (&gt; 360°).</li>
                <li>Mô tả số vòng quay thực tế.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Pillar 4: Công thức họ các góc có cùng tia đầu & tia cuối */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
            <h3>Họ các góc có cùng tia đầu và tia cuối</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Nếu một góc lượng giác (OA, OB) có số đo bằng α thì mọi góc lượng giác có cùng tia đầu OA và tia cuối OB đều có số đo dạng:
          </p>
          <div className="space-y-1 text-center font-mono">
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 font-bold text-xs">
              Độ (°): α + k · 360° (với k ∈ ℤ)
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-900 font-bold text-xs">
              Radian (rad): α + k · 2π (với k ∈ ℤ)
            </div>
          </div>
        </div>
      </div>

      {/* Special Angles Lookup Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Table className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-slate-800 text-sm">
            Bảng quy đổi các góc lượng giác đặc biệt
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold">
                <th className="p-2 border border-slate-200">Độ (°)</th>
                {specialAnglesTable.map((s) => (
                  <th key={s.deg} className="p-2 border border-slate-200 text-center font-mono">
                    {s.deg}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-slate-200 font-bold text-purple-700 bg-purple-50/50">
                  Radian (rad)
                </td>
                {specialAnglesTable.map((s) => (
                  <td key={s.deg} className="p-2 border border-slate-200 text-center font-mono text-purple-800 font-bold">
                    {s.rad}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 font-semibold text-slate-600">
                  cos α (hoành độ)
                </td>
                {specialAnglesTable.map((s) => (
                  <td key={s.deg} className="p-2 border border-slate-200 text-center font-mono text-slate-600">
                    {s.cos}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 font-semibold text-slate-600">
                  sin α (tung độ)
                </td>
                {specialAnglesTable.map((s) => (
                  <td key={s.deg} className="p-2 border border-slate-200 text-center font-mono text-slate-600">
                    {s.sin}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
