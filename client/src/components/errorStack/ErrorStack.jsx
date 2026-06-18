import style from "./ErrorStack.module.css";
import { createPortal } from "react-dom";
import AlertIcon from "../icons/AlertIcon";
import { useEffect } from "react";

const ErrorStack = ({ errors }) => {
  const root = document.getElementById("toast-root");
  if (!root) return null;

  return createPortal(
    <section className={style.errorStack}>
      {errors.map((item) => (
        <div key={item.id} className={style.error}>
          <AlertIcon width="18" height="18" />
          <p>{item.message}</p>
        </div>
      ))}
    </section>,
    root,
  );
};

export default ErrorStack;
