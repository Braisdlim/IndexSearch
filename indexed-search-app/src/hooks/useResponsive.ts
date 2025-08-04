import { useState, useEffect } from 'react';

export interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isExtraLarge: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: screenWidth < 640,
    isTablet: screenWidth >= 640 && screenWidth < 1024,
    isDesktop: screenWidth >= 1024 && screenWidth < 1280,
    isLargeDesktop: screenWidth >= 1280 && screenWidth < 1536,
    isExtraLarge: screenWidth >= 1536,
    screenWidth,
    screenHeight,
  };
};

export const useBreakpoint = (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
  const { screenWidth } = useResponsive();
  
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  };

  return screenWidth >= breakpoints[breakpoint];
};

export const useOrientation = () => {
  const { screenWidth, screenHeight } = useResponsive();
  return screenWidth > screenHeight ? 'landscape' : 'portrait';
};

export const usePreferredColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
};

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}; 