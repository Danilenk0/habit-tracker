import style from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import AlertStack from "../../components/alertStack/AlertStack";
import useAlertStack from "../../hooks/useAlertStack";
import instance from "../../axios";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alerts, addAlert] = useAlertStack([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/auth/login", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        addAlert("Login successful!", "success");
        navigate("/");
      }
    } catch (error) {
      addAlert(
        error?.response?.data?.message || error.message || "Unknown error",
        "error",
      );
    }
  };

  return (
    <div className={style.wrapper}>
      <AlertStack alerts={alerts} />
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
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className={style.checkboxGroup}>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button
            onClick={(e) => {
              handleSubmitForm(e);
            }}
            className={style.submitButton}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
