import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ITheme } from 'interfaces';
import { light, dark } from 'constants/ThemeColors';

export type AppContextValue = {
  state: { theme: ITheme };
  setState: Dispatch<SetStateAction<{ theme: ITheme; }>>;
};

const AppContextDefaultValue = {
  state: { theme: light },
  setState: () => {},
};

const AppContext = React.createContext<AppContextValue>(AppContextDefaultValue);

const AppProvider = ({ children }) => {
  const [state, setState] = useState(AppContextDefaultValue.state);

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
      document.documentElement.style.setProperty('--theme-title-color', state.theme.titleColor);
      document.documentElement.style.setProperty('--theme-grey-color', state.theme.greyColor);

      localStorage.setItem("theme", state.theme === light ? "light" : "dark");
    }
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
