import { useState, useEffect, useRef } from "react";

import { ITheme } from "interfaces";
import { light, dark } from "constants/ThemeColors";

export const useTheme = () => {
  let initialRender = useRef(true);

  const [theme, setTheme] = useState<ITheme>(light);

  const changeTheme = (newTheme) => {
    document.documentElement.style.setProperty('--theme-color', newTheme.color);
    document.documentElement.style.setProperty('--theme-bg-color', newTheme.bgColor);
    document.documentElement.style.setProperty('--theme-contrast-color', newTheme.contrastColor);
  };

  useEffect(() => {
    const themeNameFromLocalStorage = localStorage.getItem("theme");

    if (themeNameFromLocalStorage && initialRender.current == true) {
      const themeFromLocalStorage = themeNameFromLocalStorage === "light" ? light : dark;

      changeTheme(themeFromLocalStorage);

      initialRender.current = false;
    }
  }, [initialRender.current]);

  useEffect(() => {
    if (initialRender.current == false) {
      changeTheme(theme);

      localStorage.setItem("theme", theme === light ? "light" : "dark");
    }
  }, [theme, initialRender.current]);

  const toggleTheme = () => {
    const newTheme = theme === light ? dark : light;

    setTheme(newTheme);
  };

  return toggleTheme;
};
