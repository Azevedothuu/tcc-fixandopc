import React from 'react';
import type { ElementType, HTMLAttributes } from 'react';

/** tipos */
type FontVariant = 'sans' | 'display';
type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

interface TypographyProps<T extends ElementType = 'p'> extends HTMLAttributes<HTMLElement> {
  as?: T;
  variant?: FontVariant;
  size?: TextSize;
  className?: string;
  children?: React.ReactNode;
}

const merge = (...parts: Array<string | undefined>) => parts.filter(Boolean).join(' ');

export default function Typography<T extends ElementType = 'p'>({
  as,
  variant = 'sans',
  size = 'base',
  className,
  children,
  ...props
}: TypographyProps<T>) {
  const fontMap: Record<FontVariant, string> = {
    sans: 'font-sans',
    display: 'font-display',
  };

  const sizeMap: Record<TextSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };

  const Component = (as ?? 'p') as ElementType;

  return (
    <Component className={merge(fontMap[variant], sizeMap[size], className)} {...(props as any)}>
      {children}
    </Component>
  );
}
