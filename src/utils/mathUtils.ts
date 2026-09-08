/**
 * Mathematical utilities for Trigonometric Angles (Toán 11)
 */

import { AngleData, QuadrantType, RotationDirection } from '../types';

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/**
 * Converts degree to reduced fraction of pi: e.g. 60° -> π/3, 450° -> 5π/2, -135° -> -3π/4
 */
export function degreesToPiFraction(degrees: number): string {
  if (degrees === 0) return '0';
  const sign = degrees < 0 ? '-' : '';
  const absDeg = Math.abs(degrees);
  
  const numerator = absDeg;
  const denominator = 180;
  const divisor = gcd(numerator, denominator);
  
  const num = numerator / divisor;
  const den = denominator / divisor;
  
  if (den === 1) {
    if (num === 1) return `${sign}π`;
    return `${sign}${num}π`;
  }
  
  if (num === 1) {
    return `${sign}π/${den}`;
  }
  
  return `${sign}${num}π/${den}`;
}

export function degreesToPrettyRadian(degrees: number): string {
  const frac = degreesToPiFraction(degrees);
  const dec = ((degrees * Math.PI) / 180).toFixed(3);
  return `${frac} rad (≈ ${dec})`;
}

/**
 * Normalizes degree to [0, 360)
 */
export function normalizeDegrees(degrees: number): number {
  const mod = degrees % 360;
  return mod < 0 ? mod + 360 : mod;
}

/**
 * Determines quadrant or axis
 */
export function getQuadrant(normalizedDeg: number): { quadrant: QuadrantType; name: string } {
  // Check exact axes with tolerance for floating precision
  const tol = 0.001;
  if (Math.abs(normalizedDeg - 0) < tol || Math.abs(normalizedDeg - 360) < tol) {
    return { quadrant: 'axis_x_pos', name: 'Nằm trên tia Ox (chiều dương trục hoành, điểm A)' };
  }
  if (Math.abs(normalizedDeg - 90) < tol) {
    return { quadrant: 'axis_y_pos', name: 'Nằm trên tia Oy (chiều dương trục tung, điểm B)' };
  }
  if (Math.abs(normalizedDeg - 180) < tol) {
    return { quadrant: 'axis_x_neg', name: 'Nằm trên tia Ox\' (chiều âm trục hoành, điểm A\')' };
  }
  if (Math.abs(normalizedDeg - 270) < tol) {
    return { quadrant: 'axis_y_neg', name: 'Nằm trên tia Oy\' (chiều âm trục tung, điểm B\')' };
  }

  if (normalizedDeg > 0 && normalizedDeg < 90) {
    return { quadrant: 'I', name: 'Góc phần tư I (0° < α < 90°)' };
  }
  if (normalizedDeg > 90 && normalizedDeg < 180) {
    return { quadrant: 'II', name: 'Góc phần tư II (90° < α < 180°)' };
  }
  if (normalizedDeg > 180 && normalizedDeg < 270) {
    return { quadrant: 'III', name: 'Góc phần tư III (180° < α < 270°)' };
  }
  return { quadrant: 'IV', name: 'Góc phần tư IV (270° < α < 360°)' };
}

/**
 * Computes full analysis for an angle in degrees
 */
export function analyzeAngle(degrees: number): AngleData {
  const normalized = normalizeDegrees(degrees);
  const radians = (degrees * Math.PI) / 180;
  const radianFraction = degreesToPiFraction(degrees);
  const radianDecimal = radians.toFixed(3);
  
  let direction: RotationDirection = 'zero';
  if (degrees > 0) direction = 'positive';
  else if (degrees < 0) direction = 'negative';

  // Decomposition: degrees = k * 360 + remainder
  const fullTurns = degrees >= 0 ? Math.floor(degrees / 360) : Math.ceil(degrees / 360);
  const remainingDegrees = degrees - fullTurns * 360;

  const { quadrant, name: quadrantName } = getQuadrant(normalized);

  // Exact trig values for standard angles
  const rad = (normalized * Math.PI) / 180;
  const cosVal = Math.round(Math.cos(rad) * 10000) / 10000;
  const sinVal = Math.round(Math.sin(rad) * 10000) / 10000;

  return {
    degrees,
    radians,
    radianFraction,
    radianDecimal,
    normalizedDegrees: normalized,
    fullTurns,
    remainingDegrees,
    direction,
    quadrant,
    quadrantName,
    pointCoordinates: {
      x: cosVal,
      y: sinVal,
    },
  };
}

/**
 * Generates an SVG path for an angle arc or an Archimedean spiral.
 * When |degrees| > 360°, the spiral increases radius per turn so multiple turns do not overlap
 * and the student can clearly count the loops.
 */
export function generateSpiralArcPath(
  centerX: number,
  centerY: number,
  baseRadius: number,
  totalDegrees: number,
  maxSpiralGrowth: number = 28
): { path: string; endX: number; endY: number; endAngleRad: number } {
  if (Math.abs(totalDegrees) < 0.1) {
    const endX = centerX + baseRadius;
    const endY = centerY;
    return { path: '', endX, endY, endAngleRad: 0 };
  }

  const isPositive = totalDegrees > 0;
  const absDegrees = Math.abs(totalDegrees);
  
  // Step resolution: at least 3 points per 10 degrees
  const stepDeg = 2.5;
  const steps = Math.max(12, Math.ceil(absDegrees / stepDeg));
  
  // Radius variation:
  // For angles <= 360, radius stays constant at baseRadius (or slight outward expansion)
  // For angles > 360, radius smoothly expands: r(theta) = baseRadius + (maxSpiralGrowth * turns)
  const turns = absDegrees / 360;
  const growthPerDegree = turns > 1 ? maxSpiralGrowth / 360 : (turns * 6) / 360;

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const currentDeg = (i / steps) * totalDegrees;
    const currentAbsDeg = Math.abs(currentDeg);
    
    // In math: standard angle 0° is +Ox. Counter-clockwise is positive (+y down in SVG).
    // In SVG: screen y is inverted, so an angle theta has:
    // x = centerX + r * cos(theta)
    // y = centerY - r * sin(theta)
    const currentRad = (currentDeg * Math.PI) / 180;
    
    // Smooth radius interpolation
    const r = baseRadius + currentAbsDeg * growthPerDegree;
    
    const x = centerX + r * Math.cos(currentRad);
    const y = centerY - r * Math.sin(currentRad); // Notice minus for SVG coordinate inversion
    points.push({ x, y });
  }

  if (points.length < 2) {
    return { path: '', endX: centerX + baseRadius, endY: centerY, endAngleRad: 0 };
  }

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
  }

  const lastPoint = points[points.length - 1];
  const lastRad = (totalDegrees * Math.PI) / 180;

  return {
    path: d,
    endX: lastPoint.x,
    endY: lastPoint.y,
    endAngleRad: lastRad,
  };
}

/**
 * Calculates arrowhead tangent coordinates
 */
export function calculateArrowhead(
  endX: number,
  endY: number,
  totalDegrees: number,
  arrowSize: number = 8
): { leftX: number; leftY: number; rightX: number; rightY: number } {
  const isPositive = totalDegrees >= 0;
  const currentRad = (totalDegrees * Math.PI) / 180;
  
  // Tangent angle along circle in SVG:
  // Normal direction: (cos(theta), -sin(theta))
  // Tangent counter-clockwise: (-sin(theta), -cos(theta))
  // Clockwise: (sin(theta), cos(theta))
  const tangentRad = isPositive 
    ? currentRad + Math.PI / 2 
    : currentRad - Math.PI / 2;

  // Arrowhead points backwards along the tangent
  const backAngle1 = tangentRad + Math.PI - 0.5;
  const backAngle2 = tangentRad + Math.PI + 0.5;

  // In SVG, inverted Y for vector direction:
  // vector dx = cos(a), dy = -sin(a)
  const leftX = endX + arrowSize * Math.cos(backAngle1);
  const leftY = endY - arrowSize * Math.sin(backAngle1);

  const rightX = endX + arrowSize * Math.cos(backAngle2);
  const rightY = endY - arrowSize * Math.sin(backAngle2);

  return { leftX, leftY, rightX, rightY };
}
