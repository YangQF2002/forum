import React, { useState } from "react";
import axios from "axios";
import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";
import { useLocation } from "react-router-dom";

function CreateAccount(props: any) {
  const [isCreating, setIsCreating] = useState(false);

  function handleCreate(e) {
    e.preventDefault();
    setIsCreating(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      "#create-account-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    console.log(formObj);
    addUser(formObj);
    setIsCreating(false);
  }

  function addUser(formObj) {
    const url: string = "http://localhost:3000/api/v1/users";
    const headerObj = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .post(url, { user: formObj })
      .then((response) => {
        props.setUsers([response.data, ...props.users]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <div>
      {!isCreating && (
        <div>
          <button type="submit" onClick={(e) => handleCreate(e)}>
            Create an account
          </button>
        </div>
      )}

      {isCreating && (
        <div>
          <form id="create-account-form">
            <label htmlFor="name">Account name: </label>
            <input name="name"></input>

            <label htmlFor="password">Password: </label>
            <input name="password"></input>

            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button type="button" onClick={() => setIsCreating(false)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
