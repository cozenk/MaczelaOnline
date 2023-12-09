"use client";

import { createContext, useState } from "react";

export const NavContext = createContext({});

export default function NavProvider({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserNavigation, setShowUserNavigation] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState({
    show: false,
    focusTo: "",
  });

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const showEditUserInfo = (focusTo) => {
    setEditUserInfo((prev) => ({ ...prev, show: true, focusTo }));
    setShowUserNavigation(false);
  };

  const closeEditUserInfo = () => {
    setEditUserInfo((prev) => ({ ...prev, show: false }));
    setShowUserNavigation(true);
  };

  return (
    <NavContext.Provider
      value={{
        mobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        showUserNavigation,
        setShowUserNavigation,
        editUserInfo,
        showEditUserInfo,
        closeEditUserInfo,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
