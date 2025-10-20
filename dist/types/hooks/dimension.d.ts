export type HookOption = {
    eventThrottle?: number;
};
export declare function useDimension(defaultValue?: {
    height: number;
    width: number;
}, options?: HookOption): {
    height: number;
    width: number;
};
export declare function useResponsive(breakpoints: Record<string, number> | undefined, defaultValue: string[] | undefined, options: HookOption): string[];
export declare function useBreakPoints<T>(breakpoints: Record<number, T>, defaultValue?: T | null, options?: HookOption): T | null;
//# sourceMappingURL=dimension.d.ts.map