"use client";
import { useEffect, useState } from "react";
import { throttle } from "src/utils/throttle";

export type HookOption = {
  eventThrottle?: number;
};

export function useDimension(
  defaultValue: {
    height: number;
    width: number;
  } = { width: 0, height: 0 },
  options?: HookOption
) {
  const [dimension, setDimension] = useState<{
    height: number;
    width: number;
  }>(defaultValue);

  useEffect(() => {
    const updateDimension = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    updateDimension();
    const handle = throttle(updateDimension, options?.eventThrottle);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return dimension;
}

const tailwindBreakPoint = {
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
};

export function useResponsive(
  breakpoints: Record<string, number> = tailwindBreakPoint,
  defaultValue: string[] = [],
  options: HookOption
) {
  const [responsive, setResponsive] = useState<string[]>(defaultValue);

  useEffect(() => {
    const updateResponsive = () => {
      const breakpointList = Object.entries(breakpoints);
      const w = window.innerWidth;
      const out = breakpointList.reduce<string[]>((acc, [label, size]) => {
        if (w >= size) {
          acc.push(label);
        }
        return acc;
      }, []);
      setResponsive((p) => (p && p.length == out.length ? p : out));
    };

    updateResponsive();
    const handle = throttle(updateResponsive, options?.eventThrottle);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return responsive;
}

export function useBreakPoints<T>(
  breakpoints: Record<number, T>,
  defaultValue: T | null = null,
  options?: HookOption
) {
  const [payload, setPayload] = useState<T | null>(defaultValue);

  useEffect(() => {
    const updatePayload = () => {
      const orderedBreakpoints = Object.entries(breakpoints).sort(
        (a, b) => parseFloat(b[0]) - parseFloat(a[0])
      );
      const w = window.innerWidth;
      for (let [size, payload] of orderedBreakpoints) {
        if (w >= parseFloat(size)) {
          setPayload((p) => (p === payload ? p : payload));
          return;
        }
      }
      setPayload(null);
    };

    updatePayload();
    const handle = throttle(updatePayload, options?.eventThrottle);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return payload;
}
