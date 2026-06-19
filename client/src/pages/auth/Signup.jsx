import { useState } from "react";
import style from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import instance from "../../axios";
import AlertStack from "../../components/alertStack/AlertStack";
import useAlertStack from "../../hooks/useAlertStack";

const Signup = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alerts, setAlert, addAlert] = useAlertStack([]);
  const [loading, setLoading] = useState(false);

  const handleSendForm = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      addAlert("All fields are required", "error");
      return;
    }
    setLoading(true);

    try {
      const response = await instance.post("/auth/register", formData, {
        withCredentials: true,
      });
      addAlert("Registration successful!", "success");
    } catch (error) {
      addAlert(
        error.response?.data?.message || error.message || "Ошибка регистрации",
        "error",
      );
    } finally {
      setLoading(false);
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

        <form className={style.form} onSubmit={handleSendForm}>
          <h3>Create Account</h3>
          <p>Sign up to start tracking your habits!</p>
          <div className={style.formGroup}>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={loading}
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <div className={style.checkboxGroup}>
            <input type="checkbox" id="rememberMe" disabled={loading} />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button
            className={style.submitButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
