import MoonIcon from "../icons/MoonIcon";
import SunIcon from "../icons/SunIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { useTheme } from "../../hooks/useTheme";
import styles from "./Header.module.css";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();
  console.log(user);
  return (
    <header className={styles.header}>
      {!isLoading ? (
        <>
          <div className={styles.logo}>
            <h1>Habits Tracker</h1>
            <p>{user?.name}</p>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.btn}
              onClick={toggleTheme}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
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
        </>
      ) : (
        "...loading"
      )}
    </header>
  );
};

export default Header;
