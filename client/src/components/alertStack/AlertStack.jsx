import style from "./AlertStack.module.css";
import { createPortal } from "react-dom";
import AlertIcon from "../icons/AlertIcon";

const AlertStack = ({ alerts }) => {
  const root = document.getElementById("portal-root");
  if (!root) return null;

  return createPortal(
    <section className={style.alertStack}>
      {alerts.map((item) => (
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

export default AlertStack;
