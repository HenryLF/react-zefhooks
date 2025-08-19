Here's a revised README with detailed technical documentation for each hook:

# React ZefHooks

A lightweight collection of React hooks for responsive layouts and gesture detection.

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

To be done : Real npm subpackage importable via @react-zefhooks/* .

## Hooks Documentation

### `react-zefhooks/dimension` 

#### `useDimension()`

Tracks window dimensions and updates on resize.

**Returns:**  
`{ width: number, height: number }` - Current window dimensions

**Example:**

```jsx
const { width, height } = useDimension();
```

---

#### `useResponsive()`

Detects active responsive breakpoints based on window width.

**Parameters:**  
`breakpoints` (Record<string, number>):  
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

**Returns:**  
`string[] | null` - Array of matching breakpoint names (sorted largest to smallest)

**Example:**

```jsx
const responsive = useResponsive();
// => ['md', 'sm'] (when viewport is 800px wide)

if(responsive.includes(md)){
    /* ... */
}
```

---

#### `useBreakPoints<T>()`

Returns custom responsive values based on window width.

**Type Parameters:**  
`T` - Type of returned value

**Parameters:**  
`breakpoints` (Record<number, T>):  
&nbsp;&nbsp;Breakpoint definitions (min-width → value)

**Returns:**  
`T | null` - Value for the largest matching breakpoint

**Example:**

```jsx
const textSize = useBreakPoints({
  640: <div>Medium screen of larger</div>,
  0: <div>Small screen</div>,
});
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

## License

[MIT](https://github.com/HenryLF/react-zefhooks) © HenryLF

```

```
