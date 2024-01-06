"use client";

import { createContext, useContext, useState } from "react";

export const SidebarContext = createContext<{
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}>({
  showSidebar: false,
  setShowSidebar: () => {},
});

export const SidebarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <SidebarContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default function useSidebar() {
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  return { showSidebar, setShowSidebar };
}
