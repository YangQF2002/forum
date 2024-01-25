import React from "react";
import { useState } from "react";
import EditCommentForm from "./EditCommentForm.tsx";

import axios from "axios";
import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";

function Comments(props: any) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [targetComment, setTargetComment] = useState<Object>({});

  const filteredComments = props.comments.filter(
    (comment) => props.post.id === comment.post_id
  );

  function handleEdit(e, _comment) {
    e.preventDefault();
    setIsEditing(true);
    setTargetComment(_comment);
  }

  function handleDelete(e, _comment) {
    e.preventDefault();
    const url: string = "http://localhost:3000/api/v1/comments/" + _comment.id;
    const headerObj = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .delete(url, headerObj)
      .then((response) => {
        const updatedComments = props.comments.filter(
          (comment) => comment.id !== _comment.id
        );
        console.log(updatedComments);
        props.setComments(updatedComments);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      {isEditing && (
        <div>
          <EditCommentForm
            comment={targetComment}
            comments={props.comments}
            setComments={props.setComments}
            boolFlagSetter={setIsEditing}
          />
          <button type="button" onClick={() => setIsEditing(false)}>
            Close
          </button>
        </div>
      )}

      {!isEditing && (
        <div>
          {filteredComments.map((comment, index) => {
            return (
              <div key={index}>
                <h3>Comment</h3>
                <p>{comment.body}</p>
                {getUserId() === comment.user_id && (
                  <div>
                    <button
                      type="button"
                      onClick={(e) => handleEdit(e, comment)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, comment)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Comments;
