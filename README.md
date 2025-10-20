# React ZefHooks

A lightweight collection of React hooks for responsive layouts, gesture detection, and element observation.

## Installation

```bash
npm install react-zefhooks
# or
yarn add react-zefhooks
```

## Usage

You can import any hooks from the main package :
```ts
import {useDimension} from "react-zefhooks"
```
or from any subpackage :
```ts
import {useDimension} from "react-zefhooks/dimension"
```

## Hooks Documentation

### `react-zefhooks/dimension` 

#### `useDimension(defaultValue?, options?)`

Tracks window dimensions and updates on resize.

**Parameters:**  
`defaultValue` (optional): `{ width: number, height: number }`  
&nbsp;&nbsp;Initial dimensions before the first measurement  
&nbsp;&nbsp;_Default:_ `{ width: 0, height: 0 }`

`options` (optional): `HookOption`  
&nbsp;&nbsp;Configuration options for the hook  
&nbsp;&nbsp;_Properties:_
```ts
{
  eventThrottle?: number // Throttle time in milliseconds for resize events
}
```

**Returns:**  
`{ width: number, height: number }` - Current window dimensions

**Example:**

```jsx
const { width, height } = useDimension();
// or with custom default values and throttling
const { width, height } = useDimension(
  { width: 1024, height: 768 },
  { eventThrottle: 100 }
);
```

---

#### `useResponsive(breakpoints?, defaultValue?, options?)`

Detects active responsive breakpoints based on window width.

**Parameters:**  
`breakpoints` (optional): `Record<string, number>`  
&nbsp;&nbsp;Breakpoint definitions (name → min-width)  
&nbsp;&nbsp;_Default:_ TailwindCSS breakpoints

```ts
{
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 760,
  sm: 640
}
```

`defaultValue` (optional): `string[]`  
&nbsp;&nbsp;Initial breakpoint values before the first measurement  
&nbsp;&nbsp;_Default:_ `[]`

`options` (optional): `HookOption`  
&nbsp;&nbsp;Configuration options for the hook  
&nbsp;&nbsp;_Properties:_
```ts
{
  eventThrottle?: number // Throttle time in milliseconds for resize events
}
```

**Returns:**  
`string[]` - Array of matching breakpoint names (sorted largest to smallest)

**Example:**

```jsx
const responsive = useResponsive();
// => ['md', 'sm'] (when viewport is 800px wide)

// With custom options
const responsive = useResponsive(
  { mobile: 0, tablet: 768, desktop: 1024 },
  ['mobile'],
  { eventThrottle: 200 }
);
```

---

#### `useBreakPoints<T>(breakpoints, defaultValue?, options?)`

Returns custom responsive values based on window width.

**Type Parameters:**  
`T` - Type of returned value

**Parameters:**  
`breakpoints`: `Record<number, T>`  
&nbsp;&nbsp;Breakpoint definitions (min-width → value)

`defaultValue` (optional): `T | null`  
&nbsp;&nbsp;Initial value before the first measurement  
&nbsp;&nbsp;_Default:_ `null`

`options` (optional): `HookOption`  
&nbsp;&nbsp;Configuration options for the hook  
&nbsp;&nbsp;_Properties:_
```ts
{
  eventThrottle?: number // Throttle time in milliseconds for resize events
}
```

**Returns:**  
`T | null` - Value for the largest matching breakpoint

**Example:**

```jsx
const textSize = useBreakPoints({
  640: <div>Medium screen of larger</div>,
  0: <div>Small screen</div>,
});

// With throttling
const textSize = useBreakPoints(
  breakpointsConfig,
  <div>Loading...</div>,
  { eventThrottle: 150 }
);
```
### `react-zefhooks/swipe-motion` 

#### `useSwipeDirection(options)`

Detects swipe gestures with direction callbacks.

**Parameters:**  
`options` (SwipeMotionOptions):

```ts
{
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  swipeThreshold?: number | { vertical: number, horizontal: number }
}
```

_Threshold Default:_ `50` (pixels)

**Returns:**  
Event handlers to spread on target element:

```ts
{
  onTouchStart: (e: TouchEvent) => void,
  onTouchMove: (e: TouchEvent) => void,
  onTouchEnd: () => void
}
```

#### `useSwipeMotion(handler)`

Provides detailed swipe analytics.

**Parameters:**  
`handler` (SwipeMotionHandler):  
&nbsp;&nbsp;Callback receiving swipe metrics:

```ts
(data: SwipeMotionData) => void

interface SwipeMotionData {
  touchStart: { x: number, y: number },
  touchEnd: { x: number, y: number },
  delta: { x: number, y: number },
  distance: number,
  duration: number,
  angle: number,
  velocity: number
}
```

_Default:_ `console.log`

**Returns:**  
Same event handlers as `useSwipeDirection`

### `react-zefhooks/scroll` 

#### `useScrollData(target, eventThrottle?)`

Tracks scroll position and metrics for a DOM element.

**Parameters:**  
`target` (RefObject<HTMLElement | null>) - React ref to the target element  
`eventThrottle` (number, optional) - Throttle delay in milliseconds for scroll events

**Returns:**  
`ScrollData` object with scroll metrics:

```ts
{
  scrollTop: number,        // Current vertical scroll position
  scrollLeft: number,       // Current horizontal scroll position
  ratioV: number,           // Vertical scroll ratio (0 to 1)
  ratioH: number,           // Horizontal scroll ratio (0 to 1)
  maxScrollTop: number,     // Maximum vertical scroll position
  maxScrollLeft: number     // Maximum horizontal scroll position
}
```

**Example:**

```jsx
const containerRef = useRef(null);
const scrollData = useScrollData(containerRef, 100);

// Use scroll ratios for progress indicators
<div>Scroll Progress: {Math.round(scrollData.ratioV * 100)}%</div>
```

### `react-zefhooks/intersection-observer` 

#### `useIntersectionObserver(target, options?)`

Observes element visibility using the Intersection Observer API.

**Parameters:**  
`target` (RefObject<Element | null>) - React ref to the target element  
`options` (IntersectionObserverInit, optional) - Intersection Observer options see [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

**Returns:**  
`IntersectionObserverEntry | undefined` - Intersection Observer entry data

**Example:**

```jsx
const elementRef = useRef(null);
const intersectionData = useIntersectionObserver(elementRef, {
  threshold: 0.5
});

// Trigger animations when element becomes visible
useEffect(() => {
  if (intersectionData?.isIntersecting) {
    // Element is visible - trigger animation
  }
}, [intersectionData]);
```

## Changelogs
- v1.1.4 :
  -add default values for dimension hooks

- v1.1.3 : 
  - useScrollData;
  - useIntersectionObserver;
  - throttle option added to relevant hooks.

## License

[MIT](https://github.com/HenryLF/react-zefhooks) -  HenryLF
