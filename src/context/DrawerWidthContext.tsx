/**
 *  DrawerWidthContext.tsx
 *
 *  Provides application-wide holder for a selected hospital
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";

const START_WIDTH = 800;

interface DrawerWidthContextType {
  drawerWidth: number;
  setLastDrawerWidth: (width: number) => void;
  toggle: () => void;
}

export const DrawerWidthContext = createContext<DrawerWidthContextType>({
  drawerWidth: START_WIDTH,
  setLastDrawerWidth: () => { },
  toggle: () => { },
});


export const DrawerWidthContextProvider = (props: { children: ReactNode }) => {
  const defaultWidth = START_WIDTH;
  // const [defaultWidth, setDefaultWidth] = useState<number>(800);
  const [drawerWidth, setDrawerWidth] = useState<number>(defaultWidth);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    setDrawerWidth(isOpen ? defaultWidth : 0);
  }, [isOpen]);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  }
  const setLastDrawerWidth = (_width: number) => {
    // FIXME: This doesn't work as expected
    // if (isOpen) {
    //   setDefaultWidth(width)
    // } 
  }

  return (
    <DrawerWidthContext.Provider value={{ drawerWidth, setLastDrawerWidth, toggle }}>
      {props.children}
    </DrawerWidthContext.Provider>
  );
};
