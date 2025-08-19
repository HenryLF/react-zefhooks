"use client";
import {  useEffect,  useReducer, useState } from "react";
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
    window.addEventListener("resize", updateResponsive);
    return () => window.removeEventListener("resize", updateResponsive);
  }, []);

  return responsive;
}

export function useBreakPoints<T>(
  breakpoints: Record<number, T> = tailwindBreakPoint
) {
  const orderedBreakpoints = Object.entries(breakpoints).sort(
    (a, b) => parseFloat(b[0]) - parseFloat(a[0])
  );

  const [payload, setPayload] = useState<T | null>(null);

  const updatePayload = () => {
    const w = window.innerWidth;
    for (let [size, payload] of orderedBreakpoints) {
      if (w >= parseFloat(size)) {
        setPayload(payload);
        return;
      }
    }
    setPayload(null);
  };
  useEffect(() => {
    updatePayload()
    window.addEventListener("resize", updatePayload);
    return () => window.removeEventListener("resize", updatePayload);
  }, []);

  return payload;
}
