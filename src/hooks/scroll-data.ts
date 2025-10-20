"use client"

import { RefObject, useEffect, useState } from "react";
import { throttle } from "src/utils/throttle";

const defaultScrollData = {
    scrollTop: 0,
    scrollLeft: 0,
    ratioV: 0,
    ratioH: 0,
    maxScrollTop: 0,
    maxScrollLeft: 0,
}

export type ScrollData = typeof defaultScrollData

export default function useScrollData(target: RefObject<HTMLElement | null>, eventThrottle = 0) {
    const [scrollData, setScrollData] = useState<ScrollData>(defaultScrollData)
    useEffect(() => {
        const div = target.current
        if (!div) return

        const handle = throttle((ev: Event) => {
            if (!ev.target) return
            const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = ev.target as HTMLElement

            const maxScrollTop = scrollHeight - clientHeight;
            const maxScrollLeft = scrollWidth - clientWidth;

            const ratioV = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
            const ratioH = maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0;

            setScrollData({
                scrollLeft,
                scrollTop,
                ratioH,
                ratioV,
                maxScrollTop,
                maxScrollLeft
            })

        }, eventThrottle)
        div.addEventListener("scroll", handle, { capture: true })
        return () => div.removeEventListener("scroll", handle)
    }, [target])


    return scrollData
}

