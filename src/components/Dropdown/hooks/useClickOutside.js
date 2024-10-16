import { useEffect } from "react";

// ref -  element ref in the dom, onclick outside which you need to trigger the handler
// exception - if any element outside ref to be exempted, also make sure you stop propagating event from
export default function useOnClickOutside(ref, handler, exception) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (
          !ref ||
          ref.contains(event.target) ||
          exception.current.contains(event.target)
        ) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, exception]
  );
}
