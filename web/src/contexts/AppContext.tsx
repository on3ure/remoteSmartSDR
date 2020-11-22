import React, { useEffect, useState } from 'react';

import { ITheme } from 'interfaces';
import { light, dark } from 'constants/ThemeColors';

const AppContext = React.createContext([{}, () => {}]);

const AppProvider = ({ children }) => {
  let initialTheme: ITheme = light;

  const [state, setState] = useState({
    theme: initialTheme,
  });

  useEffect(() => {
    const themeNameFromLocalStorage = localStorage.getItem("theme");

    if (themeNameFromLocalStorage && themeNameFromLocalStorage === "dark") {
      setState({ theme: dark });
    }
  }, []);

  useEffect(() => {
    if (state.theme) {
      document.documentElement.style.setProperty('--theme-color', state.theme.color);
      document.documentElement.style.setProperty('--theme-bg-color', state.theme.bgColor);
      document.documentElement.style.setProperty('--theme-contrast-color', state.theme.contrastColor);

      localStorage.setItem("theme", state.theme === light ? "light" : "dark");
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };