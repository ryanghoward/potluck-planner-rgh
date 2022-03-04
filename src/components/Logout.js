import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const Logout = () => {
  const { push } = useHistory();

  useEffect(() => {
    localStorage.removeItem("token");
    push("/login");
    axiosWithAuth()
      .post("http://localhost:3000/api/logout")
      .then((response) => {
        localStorage.removeItem("token");
        push("/login");
      });
  }, [push]);

  return (
    <div>
      <h1>Goodbye! Come back soon!</h1>
    </div>
  );
};

export default Logout;
