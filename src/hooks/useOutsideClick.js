import { useEffect } from "react";

const useOutSideClick = (ref, callback, triggerRef) => {
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the click is outside the main referenced element
      const isOutsideRef = ref.current && !ref.current.contains(event.target);

      // Check if the click is outside the optional trigger element
      // This prevents the hook from firing when the button that opens the element is clicked again
      const isOutsideTrigger =
        !triggerRef ||
        (triggerRef.current && !triggerRef.current.contains(event.target));

      if (isOutsideRef && isOutsideTrigger) {
        callback();
      }
    };

    document.addEventListener("click", handleClick, true); // Use capture phase to prevent race conditions

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, callback, triggerRef]);
};

export default useOutSideClick;
