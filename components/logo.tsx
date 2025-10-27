'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 30 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`${className} bg-neutral-200 dark:bg-neutral-800 rounded-lg animate-pulse`}
      />
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/logo.svg"
        alt="NG-Soft Logo"
        width={size}
        height={size}
        priority
        quality={100}
        className={`${
          resolvedTheme === 'dark'
            ? 'brightness-0 invert'
            : ''
        } transition-all duration-300`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
