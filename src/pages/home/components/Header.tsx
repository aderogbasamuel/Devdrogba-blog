
import React, { useState } from "react";
import { MoonStar, Sun } from "lucide-react";
function Header({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) {
  
  const [openMenu, setOpenMenu] = useState(false);
  
  
  return (
    
    <header>
  <div className="logo">
    <span className="prompt">{">"}</span> sam.exe_
  </div>
  <div className="flex flex-col-reverse">
  <div
    className="menu-btn"
    onClick={() => setOpenMenu(!openMenu)}
  >
    {openMenu ? "✕" : "☰"}
  </div>

  </div>
  <nav className={openMenu ? "nav active" : "nav"}>
    <a href="">Logs</a>
    <a href="https://samueladerogba.vercel.app">Projects</a>
    <a href="">Experiments</a>
    <button className="bg-[var(--accent)] text-white text-[var(--text)] shadow-[4px_4px_0_var(--border)]">
      Contact
    </button>
    <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle rounded-[14px] py-[12px] px-[18px] flex items-center justify-center">
  {darkMode ? <Sun />:<MoonStar /> } <p className="sm:hidden">{darkMode? "Light Mode" : "Dark Mode"}</p></button>
  </nav>
</header>
    
  )
  
}

export default Header