import "./App.css";
import axios from "axios";
import Posts from "./components/Posts.tsx";
import Post from "./types/Post.tsx";
import Login from "./components/Login.tsx";
import Logout from "./components/Logout.tsx";
import { useState, useEffect } from "react";
import React from "react";
import CreateAccount from "./components/CreateAccount.tsx";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const url: string = "http://localhost:3000/api/v1/posts";
  const url1: string = "http://localhost:3000/api/v1/comments";

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      axios
        .get(url)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      return () => {
        mounted = false;
      };
    }
  }, []);

  useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      axios
        .get(url1)
        .then((response) => {
          setComments(response.data);
        })
        .catch((error) => {
          console.log(error.response.data);
        });

      return () => {
        mounted = false;
      };
    }
  }, []);

  return (
    <div>
      <CreateAccount users={users} setUsers={setUsers} />
      <Login />
      <Logout />
      <h1>NUS NOC Forum</h1>
      <Posts
        posts={posts}
        setPosts={setPosts}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default App;
