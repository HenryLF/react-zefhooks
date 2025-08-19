import { Touch, TouchEvent } from "react";
export interface SwipeMotionOptions {
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    swipeThreshold?: number | ThresholdOption;
}
interface ThresholdOption {
    vertical: number;
    horizontal: number;
}
export declare function useSwipeDirection(options: SwipeMotionOptions): {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => Touch;
    onTouchEnd: () => void;
};
type Point = {
    x: number;
    y: number;
};
type SwipeMotionData = {
    touchStart: Point;
    touchEnd: Point;
    delta: Point;
    distance: number;
    duration: number;
    angle: number;
    velocity: number;
};
type SwipeMotionHandler = (data: SwipeMotionData) => void;
export declare function useSwipeMotion(handle?: SwipeMotionHandler): {
    onTouchStart: (e: TouchEvent) => void;
    onTouchMove: (e: TouchEvent) => Touch;
    onTouchEnd: () => void;
};
export {};
//# sourceMappingURL=swipe-motion.d.ts.map