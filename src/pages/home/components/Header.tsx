import React, { useState } from "react";
import { MoonStar, Sun, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Header({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const { user, logout } = useAuth();

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
        <a href="/">Logs</a>

        <a
          href="https://samueladerogba.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Projects
        </a>

        <a href="/experiments">Experiments</a>

        <a href="/contact">Contact</a>

        {/* Authentication */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="text-theme w-9 h-9 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <User size={18} />
              </div>

              <span className="hidden sm:block text-theme">
                {user.username}
              </span>
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 text-theme"
            >
              <LogOut size={18} />
              <span className="hidden sm:block text-theme">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-[var(--accent)] text-[var(--text)] shadow-[4px_4px_0_var(--border)]">
              Login
            </button>
          </Link>
        )}

        {/* Theme */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle rounded-[14px] py-[12px] px-[18px] flex items-center justify-center"
        >
          {darkMode ? <Sun /> : <MoonStar />}
          <p className="sm:hidden">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </p>
        </button>
      </nav>
    </header>
  );
}

export default Header;