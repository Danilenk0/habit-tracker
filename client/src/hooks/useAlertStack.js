import { useState } from "react";

const useErrorStack = () => {
  const [alerts, setAlert] = useState([]);
  const addAlert = (message, type) => {
    let id = Date.now();
    if (alerts.length >= 3) {
      setAlert((prev) => prev.slice(0, 1));
    }
    setAlert((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlert((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  };

  return [alerts, setAlert, addAlert];
};

export default useErrorStack;
