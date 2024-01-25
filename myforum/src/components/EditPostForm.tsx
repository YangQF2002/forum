import React from "react";
import { useState } from "react";
import axios from "axios";

import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";

function EditPostForm(props: any) {
  const [required, setRequired] = useState<boolean>(true);
  const [title, setTitle] = useState<string>(props.post.title);
  const [body, setBody] = useState<string>(props.post.body);

  function handleResubmit(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    const formElement: HTMLFormElement = document.querySelector(
      ".edit-post-form"
    ) as HTMLFormElement;
    const data: FormData = new FormData(formElement);
    const formObj = Object.fromEntries(data.entries());
    updatePost(formObj);

    setRequired(false);
    for (let i = 0; i < props.boolFlagsSetters.length; i++) {
      props.boolFlagsSetters[i](false);
    }
  }

  function updatePost(formObj): void {
    const url: string = "http://localhost:3000/api/v1/posts/" + props.post.id;
    const headerObj = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .put(url, formObj, headerObj)
      .then((response) => {
        props.setPosts(
          props.posts.map((post) => {
            return post.id === response.data.id ? response.data : post;
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
        <h1>Edit your post!</h1>
        <form className="edit-post-form">
          <input
            type="hidden"
            name="user_id"
            value={getUserId() as number}
          ></input>

          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <br></br>

          <label htmlFor="body">Body: </label>
          <br></br>
          <textarea
            id="body"
            name="body"
            placeholder="Share your experiences here!"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <br></br>
          <button type="submit" onClick={(e) => handleResubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditPostForm;
