import { RefObject } from "react";
declare const defaultScrollData: {
    scrollTop: number;
    scrollLeft: number;
    ratioV: number;
    ratioH: number;
    maxScrollTop: number;
    maxScrollLeft: number;
};
export type ScrollData = typeof defaultScrollData;
export default function useScrollData(target: RefObject<HTMLElement | null>, eventThrottle?: number): {
    scrollTop: number;
    scrollLeft: number;
    ratioV: number;
    ratioH: number;
    maxScrollTop: number;
    maxScrollLeft: number;
};
export {};
//# sourceMappingURL=scroll.d.ts.map