import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  analyzeAngle,
  calculateArrowhead,
  generateSpiralArcPath,
  degreesToPiFraction,
} from '../utils/mathUtils';

interface UnitCircleCanvasProps {
  degrees: number;
  onAngleChange?: (newDegrees: number) => void;
  secondAngle?: number | null; // For comparison mode
  isSecondRayActive?: boolean;
  hideTerminalRay?: boolean; // For prediction mode
  highlightQuadrant?: 'I' | 'II' | 'III' | 'IV' | null;
  showPositiveDir?: boolean;
  showNegativeDir?: boolean;
  showAngleArc?: boolean;
  showCoordinates?: boolean;
  showQuadrantLabels?: boolean;
  showSpecialAngles?: boolean;
  showRadianLabels?: boolean;
  interactiveDrag?: boolean;
  size?: number;
}

export const UnitCircleCanvas: React.FC<UnitCircleCanvasProps> = ({
  degrees,
  onAngleChange,
  secondAngle = null,
  isSecondRayActive = false,
  hideTerminalRay = false,
  highlightQuadrant = null,
  showPositiveDir = true,
  showNegativeDir = true,
  showAngleArc = true,
  showCoordinates = true,
  showQuadrantLabels = true,
  showSpecialAngles = true,
  showRadianLabels = false,
  interactiveDrag = true,
  size = 460,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [angleAtDragStart, setAngleAtDragStart] = useState(0);

  const center = size / 2;
  const radius = size * 0.35; // ~160px for 460px canvas

  const angleData = analyzeAngle(degrees);
  const normalizedRad = (angleData.normalizedDegrees * Math.PI) / 180;

  // Terminal point B coordinates on SVG
  const bx = center + radius * Math.cos(normalizedRad);
  const by = center - radius * Math.sin(normalizedRad); // inverted Y

  // Spiral or Arc for main angle
  const spiral = generateSpiralArcPath(center, centerYCoord(center), radius * 0.42, degrees, 24);
  const arrow = degrees !== 0 ? calculateArrowhead(spiral.endX, spiral.endY, degrees, 7) : null;

  // Second angle (for comparison)
  const secondAngleData = secondAngle !== null ? analyzeAngle(secondAngle) : null;
  const secondNormalizedRad = secondAngleData
    ? (secondAngleData.normalizedDegrees * Math.PI) / 180
    : 0;
  const b2x = secondAngleData ? center + radius * Math.cos(secondNormalizedRad) : 0;
  const b2y = secondAngleData ? center - radius * Math.sin(secondNormalizedRad) : 0;
  const secondSpiral =
    secondAngle !== null
      ? generateSpiralArcPath(center, centerYCoord(center), radius * 0.28, secondAngle, 18)
      : null;
  const secondArrow =
    secondSpiral && secondAngle !== 0
      ? calculateArrowhead(secondSpiral.endX, secondSpiral.endY, secondAngle, 7)
      : null;

  function centerYCoord(c: number) {
    return c;
  }

  // Pointer drag calculation
  const getAngleFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return 0;
      const rect = svgRef.current.getBoundingClientRect();
      const px = clientX - rect.left - rect.width / 2;
      const py = clientY - rect.top - rect.height / 2;
      // In canvas, py is down (+y), so math angle = atan2(-py, px)
      let rad = Math.atan2(-py, px);
      let deg = (rad * 180) / Math.PI;
      if (deg < 0) deg += 360;
      return deg;
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!interactiveDrag || !onAngleChange || hideTerminalRay) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    const pointerDeg = getAngleFromPointer(e.clientX, e.clientY);
    setDragStartAngle(pointerDeg);
    setAngleAtDragStart(degrees);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || !onAngleChange) return;
    const currentPointerDeg = getAngleFromPointer(e.clientX, e.clientY);
    let delta = currentPointerDeg - dragStartAngle;
    
    // Handle wrap-around across 0/360 boundary cleanly
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newDegrees = Math.round(angleAtDragStart + delta);
    onAngleChange(newDegrees);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    }
  };

  // Special angles (30, 45, 60, 120, 135, 150, etc.)
  const specialAngles = [
    30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330,
  ];

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size} ${size}`}
        className={`w-full max-w-[${size}px] aspect-square rounded-2xl bg-white shadow-md border border-slate-200 transition-all ${
          interactiveDrag && !hideTerminalRay ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
          </pattern>
          {/* Arrow markers for axes */}
          <marker id="arrow-x" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
          <marker id="arrow-y" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Background Grid */}
        <rect width={size} height={size} fill="url(#grid)" rx="16" />

        {/* Highlighted Quadrant Area if set */}
        {highlightQuadrant && (
          <path
            d={
              highlightQuadrant === 'I'
                ? `M ${center} ${center} L ${center + radius} ${center} A ${radius} ${radius} 0 0 0 ${center} ${center - radius} Z`
                : highlightQuadrant === 'II'
                ? `M ${center} ${center} L ${center} ${center - radius} A ${radius} ${radius} 0 0 0 ${center - radius} ${center} Z`
                : highlightQuadrant === 'III'
                ? `M ${center} ${center} L ${center - radius} ${center} A ${radius} ${radius} 0 0 0 ${center} ${center + radius} Z`
                : `M ${center} ${center} L ${center} ${center + radius} A ${radius} ${radius} 0 0 0 ${center + radius} ${center} Z`
            }
            fill="#38bdf8"
            fillOpacity="0.18"
            stroke="#0284c7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        )}

        {/* Quadrant Roman Numerals */}
        {showQuadrantLabels && (
          <g className="text-sm font-bold text-slate-300 pointer-events-none select-none">
            <text x={center + radius * 0.65} y={center - radius * 0.65} fill="#94a3b8" textAnchor="middle" fontSize="16" fontWeight="700">I</text>
            <text x={center - radius * 0.65} y={center - radius * 0.65} fill="#94a3b8" textAnchor="middle" fontSize="16" fontWeight="700">II</text>
            <text x={center - radius * 0.65} y={center + radius * 0.65} fill="#94a3b8" textAnchor="middle" fontSize="16" fontWeight="700">III</text>
            <text x={center + radius * 0.65} y={center + radius * 0.65} fill="#94a3b8" textAnchor="middle" fontSize="16" fontWeight="700">IV</text>
          </g>
        )}

        {/* Main Unit Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="2.5"
        />

        {/* Coordinate Axes */}
        {/* Ox axis */}
        <line
          x1={24}
          y1={center}
          x2={size - 24}
          y2={center}
          stroke="#64748b"
          strokeWidth="1.75"
          markerEnd="url(#arrow-x)"
        />
        {/* Oy axis */}
        <line
          x1={center}
          y1={size - 24}
          x2={center}
          y2={24}
          stroke="#64748b"
          strokeWidth="1.75"
          markerEnd="url(#arrow-y)"
        />

        {/* Axis Labels */}
        <text x={size - 18} y={center - 8} fill="#334155" fontSize="14" fontWeight="600">x</text>
        <text x={center + 10} y={22} fill="#334155" fontSize="14" fontWeight="600">y</text>
        <text x={center - 14} y={center + 16} fill="#475569" fontSize="13" fontWeight="bold">O</text>

        {/* Direction Arrows (+ and - indicators) */}
        {showPositiveDir && (
          <g className="transition-opacity">
            <path
              d={`M ${center + radius + 18} ${center - 10} A ${radius + 20} ${radius + 20} 0 0 0 ${center + 10} ${center - radius - 18}`}
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <polygon
              points={`${center + 10},${center - radius - 23} ${center + 2},${center - radius - 13} ${center + 18},${center - radius - 13}`}
              fill="#059669"
            />
            <text
              x={center + radius * 0.8}
              y={center - radius * 0.9}
              fill="#059669"
              fontSize="12"
              fontWeight="bold"
            >
              + (Ngược KĐH)
            </text>
          </g>
        )}

        {showNegativeDir && (
          <g className="transition-opacity">
            <path
              d={`M ${center + radius + 18} ${center + 10} A ${radius + 20} ${radius + 20} 0 0 1 ${center + 10} ${center + radius + 18}`}
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <polygon
              points={`${center + 10},${center + radius + 23} ${center + 2},${center + radius + 13} ${center + 18},${center + radius + 13}`}
              fill="#d97706"
            />
            <text
              x={center + radius * 0.8}
              y={center + radius * 0.9 + 14}
              fill="#d97706"
              fontSize="12"
              fontWeight="bold"
            >
              − (Cùng KĐH)
            </text>
          </g>
        )}

        {/* Standard Reference Points: A(1,0), B(0,1), A'(-1,0), B'(0,-1) */}
        {/* Point A (Gốc của đường tròn lượng giác) */}
        <circle cx={center + radius} cy={center} r="4.5" fill="#0284c7" />
        <text
          x={center + radius + 10}
          y={center + 18}
          fill="#0369a1"
          fontSize="13"
          fontWeight="bold"
        >
          A(1;0) {showRadianLabels ? '0 / 2π' : '0°'}
        </text>

        {/* Point B(0,1) */}
        <circle cx={center} cy={center - radius} r="4" fill="#64748b" />
        <text x={center - 32} y={center - radius - 8} fill="#475569" fontSize="12" fontWeight="600">
          B(0;1) {showRadianLabels ? 'π/2' : '90°'}
        </text>

        {/* Point A'(-1,0) */}
        <circle cx={center - radius} cy={center} r="4" fill="#64748b" />
        <text x={center - radius - 52} y={center + 16} fill="#475569" fontSize="12" fontWeight="600">
          A'(-1;0) {showRadianLabels ? 'π' : '180°'}
        </text>

        {/* Point B'(0,-1) */}
        <circle cx={center} cy={center + radius} r="4" fill="#64748b" />
        <text x={center - 32} y={center + radius + 20} fill="#475569" fontSize="12" fontWeight="600">
          B'(0;-1) {showRadianLabels ? '3π/2' : '270°'}
        </text>

        {/* Optional Special Angle Reference Points (30°, 45°, 60°...) */}
        {showSpecialAngles &&
          specialAngles.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const sx = center + radius * Math.cos(rad);
            const sy = center - radius * Math.sin(rad);
            return (
              <g key={deg}>
                <circle cx={sx} cy={sy} r="2.5" fill="#cbd5e1" />
              </g>
            );
          })}

        {/* INITIAL RAY OA (Tia đầu OA cố định) */}
        <line
          x1={center}
          y1={center}
          x2={center + radius}
          y2={center}
          stroke="#0284c7"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Initial ray label badge */}
        <rect
          x={center + radius * 0.35}
          y={center + 6}
          width="74"
          height="20"
          rx="4"
          fill="#e0f2fe"
          stroke="#7dd3fc"
          strokeWidth="1"
        />
        <text
          x={center + radius * 0.35 + 37}
          y={center + 20}
          fill="#0369a1"
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          Tia đầu OA
        </text>

        {/* SECOND ANGLE ARC & RAY (Comparison Mode) */}
        {isSecondRayActive && secondAngle !== null && secondSpiral && (
          <g className="transition-all">
            {/* Second Arc Spiral */}
            {showAngleArc && secondSpiral.path && (
              <path
                d={secondSpiral.path}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
                strokeDasharray="5 3"
                strokeLinecap="round"
              />
            )}
            {showAngleArc && secondArrow && (
              <polygon
                points={`${secondSpiral.endX},${secondSpiral.endY} ${secondArrow.leftX},${secondArrow.leftY} ${secondArrow.rightX},${secondArrow.rightY}`}
                fill="#8b5cf6"
              />
            )}
            {/* Second Terminal Ray OB2 */}
            <line
              x1={center}
              y1={center}
              x2={b2x}
              y2={b2y}
              stroke="#8b5cf6"
              strokeWidth="3.5"
              strokeDasharray="6 3"
              strokeLinecap="round"
            />
            {/* Point B2 */}
            <circle cx={b2x} cy={b2y} r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
            <text
              x={b2x + (b2x >= center ? 10 : -32)}
              y={b2y + (b2y >= center ? 16 : -10)}
              fill="#6d28d9"
              fontSize="13"
              fontWeight="bold"
            >
              B₂ ({secondAngle}°)
            </text>
          </g>
        )}

        {/* MAIN ANGLE ARC / SPIRAL (Cung lượng giác) */}
        {!hideTerminalRay && showAngleArc && spiral.path && (
          <g>
            <path
              d={spiral.path}
              fill="none"
              stroke={degrees >= 0 ? '#059669' : '#ea580c'}
              strokeWidth={Math.abs(degrees) > 360 ? '3' : '3.5'}
              strokeLinecap="round"
              className="transition-all duration-75"
            />
            {arrow && (
              <polygon
                points={`${spiral.endX},${spiral.endY} ${arrow.leftX},${arrow.leftY} ${arrow.rightX},${arrow.rightY}`}
                fill={degrees >= 0 ? '#059669' : '#ea580c'}
              />
            )}
          </g>
        )}

        {/* TERMINAL RAY OB (Tia cuối OB) */}
        {!hideTerminalRay && (
          <g>
            {/* Projection dashed lines for coordinates (cos, sin) */}
            {showCoordinates && (
              <g className="transition-opacity">
                <line
                  x1={bx}
                  y1={by}
                  x2={bx}
                  y2={center}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                <line
                  x1={bx}
                  y1={by}
                  x2={center}
                  y2={by}
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                />
                {/* Projections markers on axes */}
                <circle cx={bx} cy={center} r="3" fill="#64748b" />
                <circle cx={center} cy={by} r="3" fill="#64748b" />
              </g>
            )}

            {/* Terminal Ray Line */}
            <line
              x1={center}
              y1={center}
              x2={bx}
              y2={by}
              stroke="#e11d48"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Label along ray OB */}
            <g
              transform={`translate(${center + (bx - center) * 0.55}, ${
                center + (by - center) * 0.55
              })`}
            >
              <rect
                x="-36"
                y="-11"
                width="72"
                height="22"
                rx="5"
                fill="#ffe4e6"
                stroke="#f43f5e"
                strokeWidth="1"
              />
              <text
                x="0"
                y="4"
                fill="#be123c"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
              >
                Tia cuối OB
              </text>
            </g>

            {/* Endpoint B with glow and grab ring */}
            <circle
              cx={bx}
              cy={by}
              r="12"
              fill="#f43f5e"
              fillOpacity="0.25"
              className="animate-pulse"
            />
            <circle
              cx={bx}
              cy={by}
              r="7"
              fill="#e11d48"
              stroke="#ffffff"
              strokeWidth="2.5"
            />

            {/* Label for Point B */}
            <text
              x={bx + (bx >= center ? 14 : -32)}
              y={by + (by >= center ? 18 : -12)}
              fill="#9f1239"
              fontSize="14"
              fontWeight="bold"
            >
              B ({degrees}°)
            </text>

            {/* Display Coordinate values tag next to Point B */}
            {showCoordinates && (
              <g
                transform={`translate(${bx + (bx >= center ? 12 : -85)}, ${
                  by + (by >= center ? 34 : 6)
                })`}
              >
                <rect
                  x="0"
                  y="0"
                  width="78"
                  height="18"
                  rx="3"
                  fill="#0f172a"
                  fillOpacity="0.85"
                />
                <text
                  x="39"
                  y="12"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  ({angleData.pointCoordinates.x}; {angleData.pointCoordinates.y})
                </text>
              </g>
            )}
          </g>
        )}

        {/* Center Point O */}
        <circle cx={center} cy={center} r="4.5" fill="#1e293b" />
      </svg>

      {/* Drag instructions hint */}
      {interactiveDrag && !hideTerminalRay && (
        <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Kéo điểm <b className="text-rose-600">B</b> trên đường tròn để thay đổi góc trực tiếp</span>
        </div>
      )}
    </div>
  );
};
