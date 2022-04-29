import React, { useRef, useEffect } from "react";

export function useOutsideClick(cb: Function) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        // Quick hack
        !event.target.classList.contains("MuiMenuItem-root")
      ) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return ref;
}
