declare module 'react-native-circular-slider' {
  import { ComponentType } from 'react';

  interface CircularSliderProps {
    startAngle?: number;
    angleLength?: number;
    onUpdate?: (data: { startAngle: number; angleLength: number }) => void;
    segments?: number;
    strokeWidth?: number;
    radius?: number;
    gradientColorFrom?: string;
    gradientColorTo?: string;
    showClockFace?: boolean;
    clockFaceColor?: string;
    bgCircleColor?: string;
    stopIcon?: React.ReactNode;
    startIcon?: React.ReactNode;
  }

  const CircularSlider: ComponentType<CircularSliderProps>;
  export default CircularSlider;
}
