import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/user";

const EXPEMPTED_ROUTES = ["/login", "/signUp"];

const TIMEOUT_MILLIS = 30 * 60 * 1000;

export function TimeoutProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef();

  useEffect(() => {
    // ignoring some routes
    if (EXPEMPTED_ROUTES.includes(location.pathname)) {
      return;
    }

    // setting and clearing timeouts
    const handleWindowEvents = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        removeUser();
        navigate("/login?expired=true");
      }, TIMEOUT_MILLIS);
    };

    // can add others events here
    window.addEventListener("mousemove", handleWindowEvents);
    window.addEventListener("click", handleWindowEvents);

    handleWindowEvents();

    //cleanup function
    return () => {
      window.removeEventListener("mousemove", handleWindowEvents);
      window.removeEventListener("click", handleWindowEvents);
    };
  }, [navigate, location.pathname]);

  return children;
}
