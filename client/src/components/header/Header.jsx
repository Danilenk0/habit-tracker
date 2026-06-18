import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.css";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>Habits Tracker</h1>
        <p>vdanilenko254@gmail.com</p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={toggleTheme} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          {theme === "light" ? (
            <MoonIcon width="18" height="18" />
          ) : (
            <SunIcon width="18" height="18" />
          )}
        </button>
        <button className={styles.btn}>
          <LogoutIcon width="18" height="18" />
          <p>Logout</p>
        </button>
      </div>
    </header>
  );
};

export default Header;
