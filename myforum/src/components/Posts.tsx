import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../types/Post.tsx";
import PostForm from "./PostForm.tsx";
import EditPostForm from "./EditPostForm.tsx";

import Comments from "./Comments.tsx";
import CommentForm from "./CommentForm.tsx";

import getJWT from "../utils/getJwt.tsx";
import getUserId from "../utils/getUserId.tsx";

function Posts(props: any) {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [targetPost, setTargetPost] = useState<Object>({});

  function handleCreate(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    setIsCreating(true);
  }

  function handleEdit(
    e: React.MouseEvent<HTMLButtonElement>,
    post: Post
  ): void {
    e.preventDefault();
    setIsEditing(true);
    setTargetPost(post);
  }

  function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    _post: Post
  ): void {
    e.preventDefault();

    const url: string = "http://localhost:3000/api/v1/posts/" + _post.id;
    const headerObj = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    };

    axios
      .delete(url, headerObj)
      .then((response) => {
        const filteredPosts = props.posts.filter(
          (post) => post.id !== _post.id
        );
        props.setPosts(filteredPosts);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function handleComment(e, post) {
    e.preventDefault();
    setIsCommenting(true);
    setTargetPost(post);
  }

  return (
    <div>
      {isCreating && (
        <div>
          <PostForm
            posts={props.posts}
            setPosts={props.setPosts}
            boolFlagsSetters={[setIsCreating, setIsEditing, setIsCommenting]}
          />
          <button type="button" onClick={() => setIsCreating(false)}>
            Close
          </button>
        </div>
      )}

      {isEditing && (
        <div>
          <EditPostForm
            post={targetPost}
            posts={props.posts}
            setPosts={props.setPosts}
            boolFlagsSetters={[setIsCreating, setIsEditing, setIsCommenting]}
          />
          <button type="button" onClick={() => setIsEditing(false)}>
            Close
          </button>
        </div>
      )}

      {isCommenting && (
        <div>
          <CommentForm
            post={targetPost}
            comments={props.comments}
            setComments={props.setComments}
            boolFlagsSetters={[setIsCreating, setIsEditing, setIsCommenting]}
          />
          <button type="button" onClick={() => setIsCommenting(false)}>
            Close
          </button>
        </div>
      )}

      {!isEditing && !isCreating && !isCommenting && (
        <div>
          <button type="button" onClick={(e) => handleCreate(e)}>
            Create a new post!
          </button>
          <h1>Posts</h1>
          {props.posts.map((post, index) => {
            return (
              <div key={index}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
                <Comments
                  comments={props.comments}
                  setComments={props.setComments}
                  post={post}
                />

                {post.user_id === getUserId() && (
                  <div>
                    <button
                      type="button"
                      onClick={(e) => handleEdit(e, { ...post })}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, { ...post })}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {post.user_id === getUserId() &&
                  typeof getUserId() === "number" && (
                    <button
                      type="button"
                      onClick={(e) => handleComment(e, { ...post })}
                    >
                      Comment
                    </button>
                  )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Posts;
