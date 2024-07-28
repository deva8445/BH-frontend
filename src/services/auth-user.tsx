import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthUser = () => {
  const navigate = useNavigate();

  const getToken = () => {
    const tokenString = sessionStorage.getItem("auth");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken;
    }
  };

  const getUser = () => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user;
    }
  };
  const [token, setToken] = useState<string>(getToken());
  const [user, setUser] = useState<any>(getUser());

  const saveToken = (user: any, token: string) => {
    sessionStorage.setItem("auth", JSON.stringify(token));
    sessionStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    navigate("/books");
  };

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setToken("");
    navigate("/");
  };

  const memoizedToken = useMemo(() => token, [token]);
  const memoizedUser = useMemo(() => user, [user]);

  return {
    setToken: saveToken,
    token: memoizedToken,
    user: memoizedUser,
    getToken,
    logout,
    getUser,
  };
};
