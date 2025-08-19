"use client"
import { Touch, TouchEvent, useRef } from "react";

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

function maybeCall(func: CallableFunction | undefined | null) {
  if (func) {
    return func();
  }
}


export function useSwipeDirection(options: SwipeMotionOptions) {
  const touchStart = useRef<Touch>(null);
  const touchEnd = useRef<Touch>(null);

  const threshold = options.swipeThreshold ?? 50;
  const swipeThreshold =
    typeof threshold === "number"
      ? { vertical: threshold, horizontal: threshold }
      : threshold;

  const onTouchStart = (e: TouchEvent) => {
    touchEnd.current = e.targetTouches[0];
    touchStart.current = e.targetTouches[0];
  };

  const onTouchMove = (e: TouchEvent) =>
    (touchEnd.current = e.targetTouches[0]);

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distanceX = touchStart.current.clientX - touchEnd.current.clientX;

    const distanceY = touchStart.current.clientY - touchEnd.current.clientY;
    if (distanceX > swipeThreshold.horizontal) {
      maybeCall(options.onSwipeLeft);
    }
    if (distanceX < -swipeThreshold.horizontal) {
      maybeCall(options.onSwipeRight);
    }
    if (distanceY > swipeThreshold.vertical) {
      maybeCall(options.onSwipeUp);
    }
    if (distanceY < -swipeThreshold.vertical) {
      maybeCall(options.onSwipeDown);
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}

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

export function useSwipeMotion(handle: SwipeMotionHandler = console.log) {
  const touchStart = useRef<Touch>(null);
  const touchEnd = useRef<Touch>(null);
  const timer = useRef(performance.now());

  const onTouchStart = (e: TouchEvent) => {
    touchEnd.current = e.targetTouches[0];
    touchStart.current = e.targetTouches[0];
    timer.current = performance.now();
  };

  const onTouchMove = (e: TouchEvent) =>
    (touchEnd.current = e.targetTouches[0]);

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const { clientX: xS, clientY: yS } = touchStart.current;
    const { clientX: xE, clientY: yE } = touchEnd.current;
    const distance = Math.hypot(xE - xS, yE - yS);
    const duration = performance.now() - timer.current;
    const velocity = distance / duration;
    const data: SwipeMotionData = {
      touchStart: { x: xS, y: yS },
      touchEnd: { x: xE, y: yE },
      delta: { x: xE - xS, y: yE - yS },
      velocity,
      duration,
      distance,
      angle: Math.atan2(yE - yS, xE - xS),
    };
    handle(data);
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
