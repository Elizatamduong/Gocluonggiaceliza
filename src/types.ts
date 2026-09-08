/**
 * Type definitions for Trigonometric Angles app (Toán 11 - GDPT 2018)
 */

export type RotationDirection = 'positive' | 'negative' | 'zero';

export type QuadrantType =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'axis_x_pos'
  | 'axis_x_neg'
  | 'axis_y_pos'
  | 'axis_y_neg';

export interface AngleData {
  degrees: number;
  radians: number;
  radianFraction: string;
  radianDecimal: string;
  normalizedDegrees: number; // 0 <= deg < 360
  fullTurns: number;
  remainingDegrees: number;
  direction: RotationDirection;
  quadrant: QuadrantType;
  quadrantName: string;
  pointCoordinates: {
    x: number; // cos
    y: number; // sin
  };
}

export interface AnglePreset {
  name: string;
  degrees: number;
  note: string;
  category: 'co_ban' | 'quay_nhieu_vong' | 'goc_am' | 'sgk';
}

export interface AngleComparisonPair {
  id: string;
  title: string;
  angleA: number;
  angleB: number;
  explanation: string;
  sameTerminalRay: boolean;
}

export interface TeachingStep {
  id: number;
  title: string;
  prompt: string;
  demonstrationAngle: number;
  explanation: string;
  keyQuestion: string;
  teacherGuide: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  visualAngle: number;
  category: string;
}
