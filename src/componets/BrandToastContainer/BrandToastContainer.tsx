import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const mediaList = window.matchMedia('(prefers-color-scheme: light)');

export function BrandToastContainer() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    handleThemeChange.call(mediaList);

    function handleThemeChange(this: MediaQueryList) {   
      const isLightMode = mediaList.matches;
  
      setTheme(isLightMode ? 'light' : 'dark');
    }

    mediaList.addEventListener('change', handleThemeChange);

    return () => {
      mediaList.removeEventListener('change', handleThemeChange);
    }
  }, []);

  return (
    <ToastContainer theme={theme} />
  );
}
