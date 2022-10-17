import { useEffect, useState } from "react";
import "./App.css";

import ErrorPage from "./components/ErrorPage/ErrorPage";
import AppointmentPage from "./components/AppointmentPage/AppointmentPage";
import { Login } from "./zoomcare-api";

function App(): JSX.Element {
  const [token, setToken] = useState<string>("");
  const login: Login = {
    username: process.env.REACT_APP_USERNAME as string,
    password: process.env.REACT_APP_PASSWORD as string,
  };

  useEffect(() => {
    fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.authToken);
      });
  });

  return !token ? <ErrorPage /> : <AppointmentPage token={token} />;
}

export default App;
