import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await instance.post("/auth/logout");
    } catch {
      // ignore error
    }
    setUser(null);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Habits Tracker</h1>
        <p>{user?.name}</p>
      </div>
      <div className={styles.buttons}>
        <button
          className="btn "
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <MoonIcon width="18" height="18" />
          ) : (
            <SunIcon width="18" height="18" />
          )}
        </button>
        <button className="btn" onClick={handleLogout}>
          <LogoutIcon width="18" height="18" />
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
