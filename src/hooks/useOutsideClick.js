/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

const useOutSideClick = (ref, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      console.log(event);
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
};

export default useOutSideClick;
