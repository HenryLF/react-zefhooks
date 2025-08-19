"use client";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
export function useDimension() {
  const initialState = {
    height: window.innerHeight,
    width: window.innerWidth,
  };
  const [dimension, setDimension] = useReducer(() => {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, initialState);

  useEffect(() => {
    setDimension();
    window.addEventListener("resize", () => setDimension());
    return () => window.removeEventListener("resize", () => setDimension());
  }, []);
  return dimension;
}

const tailwindBreakPoint = {
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 760,
  sm: 640,
};

export function useResponsive(
  breakpoints: Record<string, number> = tailwindBreakPoint
) {
  const breakpointList = Object.entries(breakpoints);

  const [responsive, setResponsive] = useState<string[] | null>(null);

  const updateResponsive = () => {
    const w = window.innerWidth;
    const out = breakpointList.reduce<string[]>((acc, [label, size]) => {
      if (w >= size) {
        acc.push(label);
      }
      return acc;
    }, []);
    setResponsive(out);
  };
  useEffect(() => {
    updateResponsive();
    const handle = () => updateResponsive();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return responsive;
}
