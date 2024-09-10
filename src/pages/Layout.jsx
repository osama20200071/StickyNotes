import { Outlet } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";

import { useAuth } from "../context/AuthContext";
import Logout from "../Icons/Logout";

const Layout = () => {
  const { theme, toggleTheme } = useTheme();
  const { handleLogout, user } = useAuth();
  const icon = theme === "dark" ? moon : sun;
  return (
    <main id="app">
      <div className="icon theme-icon" onClick={toggleTheme}>
        <img src={icon} alt="" />
      </div>
      {user && (
        <div className="icon logout-icon" onClick={handleLogout}>
          <Logout />
        </div>
      )}
      <Outlet />
    </main>
  );
};

export default Layout;
