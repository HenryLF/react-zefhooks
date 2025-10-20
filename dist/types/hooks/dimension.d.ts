export type HookOption = {
    eventThrottle?: number;
};
export declare function useDimension(options?: HookOption): {
    height: number;
    width: number;
} | null;
export declare function useResponsive(breakpoints: Record<string, number> | undefined, options: HookOption): string[] | null;
export declare function useBreakPoints<T>(breakpoints: Record<number, T>): T | null;
//# sourceMappingURL=dimension.d.ts.map