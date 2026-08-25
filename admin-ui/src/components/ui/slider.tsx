import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number
  onValueChange: (value: number) => void
}

/**
 * 基于原生 input[type=range] 的滑块。
 *
 * 不引入额外依赖（与 progress.tsx 同思路），原生 range 自带键盘可达性
 * （方向键微调、Home/End 到两端），无需手写 role/aria-* 与按键处理。
 * 轨道已填充部分用 accent 色，通过 background-image 渐变实现，避免为
 * 不同浏览器分别写伪元素填充。
 */
const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, disabled, ...props }, ref) => {
    const lo = Number(min)
    const hi = Number(max)
    const pct = hi > lo ? ((value - lo) / (hi - lo)) * 100 : 0

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className={cn(
          'h-5 w-full cursor-pointer appearance-none bg-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // 轨道：已填充部分用 primary，其余用 secondary
          '[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full',
          '[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full',
          // 滑块把手
          '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
          '[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background',
          '[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm',
          '[&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4',
          '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full',
          '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background',
          '[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-sm',
          // 键盘焦点可见
          'focus-visible:outline-none',
          '[&:focus-visible::-webkit-slider-thumb]:ring-2 [&:focus-visible::-webkit-slider-thumb]:ring-ring',
          '[&:focus-visible::-webkit-slider-thumb]:ring-offset-2',
          '[&:focus-visible::-moz-range-thumb]:ring-2 [&:focus-visible::-moz-range-thumb]:ring-ring',
          className,
        )}
        style={{
          backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 0% ${pct}%, hsl(var(--secondary)) ${pct}% 100%)`,
          backgroundSize: '100% 6px',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        {...props}
      />
    )
  },
)
Slider.displayName = 'Slider'

export { Slider }
