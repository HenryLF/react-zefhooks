import { RefObject, useEffect, useState } from "react";

export default function useIntersectionObserver(target: RefObject<Element | null>, options?: IntersectionObserverInit) {
    const [data, setData] = useState<IntersectionObserverEntry>()
    useEffect(() => {
        if (!target.current) return
        const observer = new IntersectionObserver((entries) => setData(entries[0]), options)
        observer.observe(target.current)
        return () => observer.disconnect()
    }, [target])
    return data
}