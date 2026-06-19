import { useState } from "react";

const useErrorStack = () => {
  const [errors, setErrors] = useState([]);
  const addError = (message, type) => {
    let id = Date.now();
    if (errors.length >= 3) {
      setErrors((prev) => prev.slice(0, 1));
    }
    setErrors((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setErrors((prev) => prev.filter((item) => item.id !== id));
    }, 2000);
  };

  return [errors, setErrors, addError];
};

export default useErrorStack;
