import window from "global/window";
import React, { FC, useState } from "react";

export enum Colors {
    DARK = "dark",
    LIGHT = "light",
}

export interface IColorContext {
    data: { color: Colors };
    setters: { toggleColor: () => void };
}

const ColorSchemeContext = React.createContext<Partial<IColorContext>>({});

const Provider: FC = ({ children }) => {

    const localValue =  window && window.localStorage && window.localStorage.getItem("color-scheme");
    const initialColor = localValue ? localValue as Colors : Colors.LIGHT;
    const [color, setColor] = useState<Colors>(initialColor);

    const toggleColor = () => {
        setColor((prevState) => {
            const color = prevState === Colors.LIGHT ? Colors.DARK : Colors.LIGHT;
            window && window.localStorage && window.localStorage.setItem("color-scheme", color);
            return color;
        });
    }

    const contextState: IColorContext = {
        data: { color },
        setters: { toggleColor },
    };

    return (
        <ColorSchemeContext.Provider value={contextState}>
            {children}
        </ColorSchemeContext.Provider>
    );
};

export default Provider;
export const Context = ColorSchemeContext;
