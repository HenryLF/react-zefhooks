export function throttle<C extends unknown, T extends unknown[]>(
    func: (this: C, ...args: T) => void,
    limit?: number
): (...args: T) => void {
    if (!limit) return func
    let inThrottle: boolean = false;
    return function (this: C, ...args: T): void {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

