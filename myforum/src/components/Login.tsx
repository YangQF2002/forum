import React from "react";
import { useState } from "react";
import axios from "axios";
import getUserId from "../utils/getUserId.tsx";

function Login(props: any) {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleLogin(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      ".login-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    addUser(formObj);

    setIsLoggingIn(true);
    formElement.reset();
  }

  function addUser(formObj): void {
    const url: string = "http://localhost:3000/api/v1/login";
    const headerObj = {
      headers: { "content-Type": "application/json" },
    };

    axios
      .post(url, formObj, headerObj)
      .then((response) => {
        console.log(response);
        document.cookie = `user_id=${response.data.user_id}; Secure`;
        document.cookie = `JWT=${response.data.token}; Secure`;
        window.location.reload();
        setIsLoggingIn(false);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div>
      {!isLoggingIn && !getUserId() && (
        <div>
          <button type="button" onClick={() => setIsLoggingIn(true)}>
            Login
          </button>
        </div>
      )}

      {isLoggingIn && (
        <div>
          <h1>Login</h1>

          <form className="login-form">
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name"></input>
            <br></br>

            <label htmlFor="password">Password: </label>
            <input type="text" id="password" name="password"></input>
            <br></br>

            <button type="submit" onClick={(e) => handleLogin(e)}>
              Login
            </button>
            <button type="button" onClick={() => setIsLoggingIn(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
