import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../slices/profileSlice";
import { setUser, logout } from "../slices/authSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get("token");
    const queryUserType = params.get("userType");
    const queryUser = params.get("user");

    if (queryToken && queryUserType && queryUser) {
      localStorage.setItem("token", queryToken);
      localStorage.setItem("userType", queryUserType);
      localStorage.setItem("user", queryUser);

      try {
        const parsedUser = JSON.parse(queryUser);
        dispatch(setUser(parsedUser));
      } catch (err) {
        console.error("Invalid user JSON:", err);
      }
    }

    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    const localUser = JSON.parse(localStorage.getItem("user"));


    if (token && userType && (!localUser || (!localUser.fullName && !localUser.orgName))) {
      dispatch(fetchProfile({ token, userType }))
        .unwrap()
        .then((res) => {
          console.log("Profile loaded:", res);
          const correctUser =
            userType === "organization"
              ? res?.org || res?.user
              : res?.user || res?.org;

          dispatch(setUser(correctUser));
        })
        .catch((err) => console.error("Profile sync error:", err));
    }

    const handleStorageChange = (e) => {
      if (e.key === "forceReload") {
        console.log("🔁 Detected login/logout in another tab. Reloading...");
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  return <>{children}</>;
};

export default AppWrapper;
