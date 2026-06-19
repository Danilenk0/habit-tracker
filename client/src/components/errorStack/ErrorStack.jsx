import style from "./ErrorStack.module.css";
import { createPortal } from "react-dom";
import AlertIcon from "../icons/AlertIcon";

const ErrorStack = ({ errors }) => {
  const root = document.getElementById("toast-root");
  if (!root) return null;

  return createPortal(
    <section className={style.errorStack}>
      {errors.map((item) => (
        <div
          key={item.id}
          className={`${style.stackItem} ${style[`stackItem__${item.type}`]}`}
        >
          <AlertIcon width="18" height="18" />
          <div className={style.alertData}>
            <h6>{item.type}</h6>
            <p>{item.message}</p>
          </div>
        </div>
      ))}
    </section>,
    root,
  );
};

export default ErrorStack;
