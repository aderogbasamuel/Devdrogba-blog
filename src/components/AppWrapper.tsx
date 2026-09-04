import Header from "../pages/home/components/Header";
import React, { useEffect, useState } from "react";
export default function AppWrapper({ children }: { children: React.ReactNode }) {   
    const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
    return (
      <div className="app-wrapper">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        {children}
        </div>
    )
  }