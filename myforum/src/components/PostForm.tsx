import React, { useState } from "react";

import axios from "axios";
import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";
import Post from "../types/Post.tsx";

function PostForm(props: any) {
  const [required, setRequired] = useState(true);

  function handleSubmission(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      ".post-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    addPost(formObj);

    setRequired(false);
    for (let i = 0; i < props.boolFlagsSetters.length; i++) {
      props.boolFlagsSetters[i](false);
    }
  }

  function addPost(formObj): void {
    const url: string = "http://localhost:3000/api/v1/posts";
    const headerObj = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .post(url, formObj, headerObj)
      .then((response) => {
        props.setPosts([response.data, ...props.posts]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  if (required) {
    return (
      <div>
        {getUserId() && (
          <div>
            <h1>Create a new post!</h1>
            <form className="post-form">
              <input
                type="hidden"
                name="user_id"
                value={getUserId() as number}
              ></input>

              <label htmlFor="title">Title: </label>
              <input type="text" id="title" name="title"></input>
              <br></br>

              <label htmlFor="body">Body: </label>
              <br></br>
              <textarea
                id="body"
                name="body"
                placeholder="Share your experiences here!"
              ></textarea>
              <br></br>
              <button type="submit" onClick={(e) => handleSubmission(e)}>
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default PostForm;
