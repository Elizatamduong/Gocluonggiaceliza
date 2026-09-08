/**
 * Curriculum Data for Lesson "Góc lượng giác" - Toán 11 (Kết nối tri thức với cuộc sống)
 */

import { AnglePreset, AngleComparisonPair, TeachingStep, QuizQuestion } from '../types';

export const ANGLE_PRESETS: AnglePreset[] = [
  {
    name: '60°',
    degrees: 60,
    note: 'Góc nhọn cơ bản, tia cuối thuộc Góc phần tư I. (π/3 rad)',
    category: 'co_ban',
  },
  {
    name: '120°',
    degrees: 120,
    note: 'Góc tù, tia cuối thuộc Góc phần tư II. (2π/3 rad)',
    category: 'co_ban',
  },
  {
    name: '270°',
    degrees: 270,
    note: 'Quay 3/4 vòng theo chiều dương, tia cuối nằm trên tia Oy\'. (3π/2 rad)',
    category: 'co_ban',
  },
  {
    name: '-45°',
    degrees: -45,
    note: 'Góc âm quay cùng chiều kim đồng hồ, tia cuối thuộc Góc phần tư IV. (-π/4 rad)',
    category: 'goc_am',
  },
  {
    name: '360°',
    degrees: 360,
    note: 'Đúng 1 vòng trọn vẹn theo chiều dương, tia cuối trở về trùng tia đầu OA. (2π rad)',
    category: 'co_ban',
  },
  {
    name: '450°',
    degrees: 450,
    note: '450° = 360° + 90° (1 vòng + 90°). Tia cuối trùng tia Oy (giống vị trí 90° nhưng số đo khác!).',
    category: 'quay_nhieu_vong',
  },
  {
    name: '-360°',
    degrees: -360,
    note: 'Quay 1 vòng trọn vẹn theo chiều âm (cùng chiều KĐH). (-2π rad)',
    category: 'goc_am',
  },
  {
    name: '810°',
    degrees: 810,
    note: '810° = 2 × 360° + 90° (Quay trọn vẹn 2 vòng + thêm 90°). Tia cuối dừng ở tia Oy.',
    category: 'quay_nhieu_vong',
  },
  {
    name: '-135°',
    degrees: -135,
    note: 'Quay theo chiều âm qua -90° tới -135°, tia cuối thuộc Góc phần tư III.',
    category: 'goc_am',
  },
  {
    name: '720°',
    degrees: 720,
    note: '720° = 2 × 360° (Quay đúng 2 vòng theo chiều dương). Tia cuối trùng tia OA.',
    category: 'quay_nhieu_vong',
  },
  {
    name: '1080°',
    degrees: 1080,
    note: '1080° = 3 × 360° (Quay trọn 3 vòng theo chiều dương).',
    category: 'quay_nhieu_vong',
  },
  {
    name: '-450°',
    degrees: -450,
    note: '-450° = -360° - 90° (Quay 1 vòng âm rồi thêm 90° âm, dừng tại tia Oy\').',
    category: 'goc_am',
  },
];

export const COMPARISON_PAIRS: AngleComparisonPair[] = [
  {
    id: 'pair-1',
    title: 'Góc 90° và 450°',
    angleA: 90,
    angleB: 450,
    explanation:
      'Góc 450° = 360° + 90°. Hai góc này có cùng tia đầu OA và cùng vị trí tia cuối OB (trên trục Oy), nhưng góc 450° đã quay nhiều hơn 1 vòng tròn (360°). Chúng là hai góc lượng giác khác nhau về số đo.',
    sameTerminalRay: true,
  },
  {
    id: 'pair-2',
    title: 'Góc 60° và 420°',
    angleA: 60,
    angleB: 420,
    explanation:
      'Góc 420° = 360° + 60°. Hiệu số đo là 420° - 60° = 360° (đúng 1 vòng). Do đó, hai tia cuối hoàn toàn trùng nhau tại Góc phần tư I.',
    sameTerminalRay: true,
  },
  {
    id: 'pair-3',
    title: 'Góc 90° và -270°',
    angleA: 90,
    angleB: -270,
    explanation:
      'Góc 90° quay ngược chiều KĐH (chiều dương), góc -270° quay cùng chiều KĐH (chiều âm). Hiệu số đo: 90° - (-270°) = 360°. Cả hai đều có tia cuối nằm trên tia Oy.',
    sameTerminalRay: true,
  },
  {
    id: 'pair-4',
    title: 'Góc 180° và 540°',
    angleA: 180,
    angleB: 540,
    explanation:
      '540° = 360° + 180°. Cả hai góc đều có tia cuối trùng với tia Ox\' (nửa trục hoành âm, điểm A\'(-1, 0)).',
    sameTerminalRay: true,
  },
  {
    id: 'pair-5',
    title: 'Góc -45° và 315°',
    angleA: -45,
    angleB: 315,
    explanation:
      '315° - (-45°) = 360°. Tia cuối của cả hai góc cùng nằm trong Góc phần tư IV, tạo với trục Ox góc hình học 45° phía dưới.',
    sameTerminalRay: true,
  },
  {
    id: 'pair-6',
    title: 'Góc 60° và 120° (Tia cuối khác nhau)',
    angleA: 60,
    angleB: 120,
    explanation:
      'Góc 60° có tia cuối ở Góc phần tư I, góc 120° có tia cuối ở Góc phần tư II. Hiệu số đo không phải bội nguyên của 360°, nên tia cuối không trùng nhau.',
    sameTerminalRay: false,
  },
];

export const TEACHING_STEPS: TeachingStep[] = [
  {
    id: 1,
    title: 'Bước 1: Đường tròn lượng giác và Tia đầu OA',
    prompt: 'Quan sát đường tròn tâm O, bán kính R = 1, trục tọa độ Oxy và điểm A(1, 0).',
    demonstrationAngle: 0,
    explanation:
      'Trong mặt phẳng tọa độ Oxy, đường tròn định hướng tâm O, bán kính R = 1, với gốc là điểm A(1, 0) được gọi là ĐƯỜNG TRÒN LƯỢNG GIÁC. Tia OA nằm trên chiều dương trục Ox được cố định làm TIA ĐẦU.',
    keyQuestion: 'Tia OA nằm ở vị trí nào trên hệ trục tọa độ?',
    teacherGuide:
      'Nhắc nhở học sinh: Điểm A(1, 0) luôn là điểm gốc cố định, tia OA luôn là tia đầu của góc lượng giác.',
  },
  {
    id: 2,
    title: 'Bước 2: Sự quay của tia quanh gốc O theo Chiều Dương',
    prompt: 'Quan sát tia OB xuất phát từ OA và quay ngược chiều kim đồng hồ đến 60°.',
    demonstrationAngle: 60,
    explanation:
      'Quy ước quốc tế và SGK: Chiều ngược chiều quay của kim đồng hồ là CHIỀU DƯƠNG (+). Khi tia OB quay từ OA theo chiều này một góc 60°, ta được góc lượng giác (OA, OB) = +60°.',
    keyQuestion: 'Chiều quay ngược chiều kim đồng hồ được quy ước mang dấu gì?',
    teacherGuide:
      'Cho tia quay từ từ và nhấn mạnh: Mũi tên chỉ chiều quay ngược kim đồng hồ là chiều dương.',
  },
  {
    id: 3,
    title: 'Bước 3: Số đo góc lượng giác (Độ và Radian)',
    prompt: 'Quan sát góc 90° (tương ứng với π/2 radian).',
    demonstrationAngle: 90,
    explanation:
      'Đơn vị đo góc lượng giác có thể dùng ĐỘ (°) hoặc RADIAN (rad). Mối liên hệ cốt lõi: 180° = π rad. Khi tia quay được 1/4 đường tròn theo chiều dương, góc là 90° hay π/2 rad.',
    keyQuestion: 'Góc 90° tương ứng với bao nhiêu radian?',
    teacherGuide:
      'Mở bảng đổi đơn vị: 180° = π rad, 90° = π/2 rad, 60° = π/3 rad, 45° = π/4 rad, 30° = π/6 rad.',
  },
  {
    id: 4,
    title: 'Bước 4: Góc lượng giác quay quá một vòng (> 360°)',
    prompt: 'Quan sát chuyển động của tia khi quay góc 450° = 360° + 90°.',
    demonstrationAngle: 450,
    explanation:
      'Khác với góc hình học thông thường (chỉ từ 0° đến 180° hoặc 360°), góc lượng giác CÓ THỂ QUAY NHIỀU VÒNG. Góc 450° quay trọn vẹn 1 vòng (360°) rồi quay tiếp 90°. Tia cuối dừng ở vị trí tia Oy (giống 90°), nhưng số đo góc là 450°!',
    keyQuestion: 'Góc 450° và góc 90° có trùng nhau hoàn toàn về mặt số đo không?',
    teacherGuide:
      'Nhấn mạnh: Chúng có cùng vị trí tia cuối nhưng số đo góc lượng giác khác nhau do số vòng quay khác nhau.',
  },
  {
    id: 5,
    title: 'Bước 5: Sự quay theo Chiều Âm (Góc âm)',
    prompt: 'Quan sát chuyển động của tia khi quay góc -90° hoặc -135°.',
    demonstrationAngle: -90,
    explanation:
      'Chiều cùng chiều quay của kim đồng hồ là CHIỀU ÂM (-). Khi tia OB quay từ OA theo chiều kim đồng hồ một góc 90°, số đo góc lượng giác là -90° (hoặc -π/2 rad).',
    keyQuestion: 'Tia cuối của góc -90° nằm ở vị trí nào trên đường tròn lượng giác?',
    teacherGuide:
      'Chỉ ra rằng góc -90° có tia cuối nằm trên tia Oy\' (nửa dưới trục tung), trùng vị trí với góc +270°.',
  },
  {
    id: 6,
    title: 'Bước 6: Tổng quát các góc có cùng tia đầu và tia cuối',
    prompt: 'Quan sát các góc: 60°, 420°, 780°, -300°... đều có cùng tia cuối OB.',
    demonstrationAngle: 420,
    explanation:
      'Nếu góc lượng giác (OA, OB) có một số đo là α thì mọi góc lượng giác có cùng tia đầu OA và tia cuối OB đều có số đo dạng: α + k · 360° (k ∈ ℤ) hay α + k · 2π (k ∈ ℤ).',
    keyQuestion: 'Công thức tổng quát của các góc lượng giác có cùng tia đầu và tia cuối là gì?',
    teacherGuide:
      'Khắc sâu công thức trọng tâm bài học: α + k · 360° với k là số nguyên (số vòng quay).',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Tia cuối của góc lượng giác có số đo 90° nằm ở vị trí nào?',
    options: [
      'Nằm trên tia Ox (chiều dương trục hoành)',
      'Nằm trên tia Oy (chiều dương trục tung)',
      'Thuộc Góc phần tư II',
      'Nằm trên tia Oy\' (chiều âm trục tung)',
    ],
    correctIndex: 1,
    explanation:
      'Góc 90° quay ngược chiều kim đồng hồ đúng 1/4 vòng tròn, tia cuối nằm chính xác trên tia Oy (trục tung dương, điểm B(0, 1)).',
    visualAngle: 90,
    category: 'vi_tri',
  },
  {
    id: 2,
    question: 'Góc lượng giác 450° đã quay bao nhiêu vòng và thêm bao nhiêu độ?',
    options: [
      'Quay 1 vòng theo chiều dương và thêm 90°',
      'Quay 2 vòng theo chiều dương và thêm 90°',
      'Quay 1 vòng theo chiều âm và thêm 90°',
      'Quay 1 vòng theo chiều dương và thêm 180°',
    ],
    correctIndex: 0,
    explanation:
      'Ta có 450° = 1 × 360° + 90°. Như vậy tia quay đúng 1 vòng trọn vẹn theo chiều dương rồi quay tiếp một góc 90°.',
    visualAngle: 450,
    category: 'vong_quay',
  },
  {
    id: 3,
    question: 'Góc lượng giác có số đo -90° quay theo chiều nào?',
    options: [
      'Quay ngược chiều kim đồng hồ (chiều dương)',
      'Quay cùng chiều kim đồng hồ (chiều âm)',
      'Không xác định được chiều quay',
      'Đổi chiều quay liên tục',
    ],
    correctIndex: 1,
    explanation:
      'Dấu âm (-) của góc lượng giác chỉ chiều quay cùng chiều kim đồng hồ (chiều âm theo quy ước lượng giác).',
    visualAngle: -90,
    category: 'chieu_quay',
  },
  {
    id: 4,
    question: 'Hai góc lượng giác 60° và 420° có mối liên hệ như thế nào về tia cuối?',
    options: [
      'Tia cuối vuông góc với nhau',
      'Tia cuối đối xứng nhau qua gốc O',
      'Có cùng vị trí tia cuối (trùng nhau)',
      'Tia cuối nằm ở hai góc phần tư khác nhau',
    ],
    correctIndex: 2,
    explanation:
      'Vì 420° = 60° + 1 × 360°, hai góc này có cùng tia đầu OA và cùng tia cuối OB (tia cuối trùng nhau). Số đo của chúng khác nhau 1 vòng (360°).',
    visualAngle: 420,
    category: 'cung_tia_cuoi',
  },
  {
    id: 5,
    question: 'Tia cuối của góc lượng giác -135° thuộc góc phần tư nào?',
    options: [
      'Góc phần tư I',
      'Góc phần tư II',
      'Góc phần tư III',
      'Góc phần tư IV',
    ],
    correctIndex: 2,
    explanation:
      'Quay theo chiều âm (cùng chiều KĐH): từ 0° đến -90° (thuộc góc IV), từ -90° đến -180° (thuộc góc III). Vì -180° < -135° < -90°, tia cuối thuộc Góc phần tư III.',
    visualAngle: -135,
    category: 'goc_phan_tu',
  },
  {
    id: 6,
    question: 'Góc lượng giác có số đo 810° có bao nhiêu vòng quay đầy đủ?',
    options: [
      '1 vòng đầy đủ',
      '2 vòng đầy đủ',
      '3 vòng đầy đủ',
      'Không có vòng đầy đủ nào',
    ],
    correctIndex: 1,
    explanation:
      'Ta có 810° = 2 × 360° + 90°. Vậy có đúng 2 vòng quay trọn vẹn và thêm 90°.',
    visualAngle: 810,
    category: 'vong_quay',
  },
  {
    id: 7,
    question: 'Công thức nào biểu diễn TẤT CẢ các góc lượng giác có cùng tia đầu OA và tia cuối OB với góc α (đo bằng độ)?',
    options: [
      'α + k · 180° (k ∈ ℤ)',
      'α + k · 360° (k ∈ ℤ)',
      'α + k · 90° (k ∈ ℤ)',
      'k · 360° (k ∈ ℤ)',
    ],
    correctIndex: 1,
    explanation:
      'Theo SGK Toán 11 - Kết nối tri thức: Mọi góc lượng giác có cùng tia đầu OA và tia cuối OB đều có số đo dạng α + k · 360° (với k ∈ ℤ).',
    visualAngle: 60,
    category: 'ly_thuyet',
  },
];
