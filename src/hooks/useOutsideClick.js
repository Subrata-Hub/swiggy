import { useEffect } from "react";

const useOutSideClick = (ref, callback, tiggerRef) => {
  useEffect(() => {
    const handleClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !(tiggerRef.current && tiggerRef.current.contains(event.target))
      ) {
        callback();
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback, tiggerRef]);
};

export default useOutSideClick;
