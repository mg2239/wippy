import { useEffect, useState } from 'react';

export enum ScreenSizes {
  'sm' = 640,
  'md' = 768,
  'lg' = 1024,
  'xl' = 1280,
  '2xl' = 1536,
}

export const useScreenWidth = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
