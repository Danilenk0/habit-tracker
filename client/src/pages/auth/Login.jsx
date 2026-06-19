import style from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AlertStack from "../../components/alertStack/AlertStack";
const Login = () => {
  const location = useLocation();

  return (
    <div className={style.wrapper}>
      <div className={style.login}>
        <h1>Habit Tracker</h1>
        <p>Build better habits, one day at a time.</p>
        <div className={style.buttons}>
          <Link
            className={location.pathname == "/login" ? style.active : ""}
            to="/login"
          >
            Login
          </Link>
          <Link
            className={location.pathname == "/signup" ? style.active : ""}
            to="/signup"
          >
            Sign Up
          </Link>
        </div>

        <form className={style.form}>
          <h3>Welcome Back!</h3>
          <p>Sign in to your account to continue.</p>
          <div className={style.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className={style.checkboxGroup}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button className={style.submitButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
