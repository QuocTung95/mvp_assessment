import { createContext, useState, ReactNode, useContext } from "react";

interface ITheme {
  light?: {
    foreground: string;
    background: string;
  };
  dark?: {
    foreground: string;
    background: string;
  };
}

interface IThemeContext extends ITheme {
  changeTheme: () => void;
}

// Create context with default value
export const ThemeContext = createContext<IThemeContext>({
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  changeTheme: () => {},
});

// Custom hook for consuming the theme context
export const useThemeContextProvider = (): IThemeContext =>
  useContext(ThemeContext);

// ThemeContextProvider component
const ThemeContextProvider = (props: { children?: ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<ITheme>({
    light: {
      foreground: "#000000",
      background: "#eeeeee",
    },
  });

  const changeTheme = () => {
    if (theme.light) {
      setTheme({
        dark: {
          foreground: "#ffffff",
          background: "#222222",
        },
      });
    } else {
      setTheme({
        light: {
          foreground: "#000000",
          background: "#eeeeee",
        },
      });
    }
  };

  const contextDataTheme = {
    theme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={contextDataTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
