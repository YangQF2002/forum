import React from "react";
import { useState } from "react";
import axios from "axios";

import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";

function EditCommentForm(props: any) {
  const [required, setRequired] = useState<boolean>(true);
  const [body, setBody] = useState<string>(props.comment.body);

  function handleResubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      ".edit-comment-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    updatePost(formObj);

    setRequired(false);
    props.boolFlagSetter(false);
  }

  function updatePost(formObj): void {
    const url: string =
      "http://localhost:3000/api/v1/comments/" + props.comment.id;

    const headerObj = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .put(url, formObj, headerObj)
      .then((response) => {
        props.setComments(
          props.comments.map((comment) => {
            return comment.id === response.data.id ? response.data : comment;
          })
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  if (required) {
    return (
      <div>
        <h1>Edit your comment!</h1>
        <form className="edit-comment-form">
          <input
            type="hidden"
            name="user_id"
            value={getUserId() as number}
          ></input>

          <input
            type="hidden"
            name="post_id"
            value={props.comment.post_id}
          ></input>

          <label htmlFor="body">Body: </label>

          <textarea
            id="body"
            name="body"
            placeholder="Edit your comment here!"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>

          <button type="submit" onClick={(e) => handleResubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditCommentForm;
