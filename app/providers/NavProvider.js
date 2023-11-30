"use client";

import { createContext, useState } from "react";

export const NavContext = createContext();

export default function NavProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <NavContext.Provider
      value={{ mobileMenuOpen, openMobileMenu, closeMobileMenu }}
    >
      {children}
    </NavContext.Provider>
  );
}
