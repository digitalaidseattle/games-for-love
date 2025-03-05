/**
 *  DrawerWidthContext.tsx
 *
 *  Provides application-wide holder for a selected hospital
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { ReactNode, createContext, useEffect, useState } from "react";

interface DrawerWidthContextType {
  drawerWidth: number;
  setLastDrawerWidth: (width: number) => void;
  toggle: () => void
}

export const DrawerWidthContext = createContext<DrawerWidthContextType>({
  drawerWidth: 400,
  setLastDrawerWidth: () => { },
  toggle: () => { }
});


export const DrawerWidthContextProvider = (props: {
  children: ReactNode;
}) => {
  const defaultWidth = 800;
  // const [defaultWidth, setDefaultWidth] = useState<number>(800);
  const [drawerWidth, setDrawerWidth] = useState<number>(defaultWidth);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    setDrawerWidth(isOpen ? defaultWidth : 0);
  }, [isOpen]);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const setLastDrawerWidth = (width: number) => {
    console.log('setLastDrawerWidth', width, isOpen)
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
