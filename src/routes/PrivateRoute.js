import { getUser } from "../utils/user";

const PrivateRoute = ({ children }) => {
  const user = getUser();
  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    window.location.href = "/login";
    return;
  }

  return children;
};

export default PrivateRoute;
