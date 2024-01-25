import React, { useState } from "react";
import axios from "axios";
import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";

function CommentForm(props: any) {
  const [required, setRequired] = useState(true);

  function handleSubmission(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      ".comment-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    addComment(formObj);

    setRequired(false);
    for (let i = 0; i < props.boolFlagsSetters.length; i++) {
      props.boolFlagsSetters[i](false);
    }
  }

  function addComment(formObj): void {
    const url: string = "http://localhost:3000/api/v1/comments/";
    const headerObj = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .post(url, formObj, headerObj)
      .then((response) => {
        props.setComments([response.data, ...props.comments]);
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
            <h1>Create a new comment!</h1>
            <form className="comment-form">
              <input
                type="hidden"
                name="user_id"
                value={getUserId() as number}
              ></input>

              <input
                type="hidden"
                name="post_id"
                value={props.post.id as number}
              ></input>

              <label htmlFor="body">Body: </label>
              <textarea
                id="body"
                name="body"
                placeholder="Share your comments here!"
              ></textarea>

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

export default CommentForm;
