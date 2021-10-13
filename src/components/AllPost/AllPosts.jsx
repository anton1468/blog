import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Post from "./../Post/Post";
import Loader from "./../../UI/Loader/Loader";
import { useMessage } from "./../../hooks/message.hook";

const AllPosts = () => {
  const message = useMessage();
  const { request } = useHttp();
  const [posts, setPosts] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [changed, setChanged] = useState(false);

  const deletePost = () => {
    message("Post deleted");
    setDeleted(!deleted);
  };
  const changePost = () => {
    message("Post changed");
    setChanged(!changed);
  };

  useEffect(() => {
    const allTodos = async () => {
      try {
        const data = await request(
          `https://bloggy-api.herokuapp.com/posts`,
          "GET"
        );
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    allTodos();
  }, [deleted, request, changed]);

  return (
    <div className="container">
      {posts ? (
        posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            deletePost={deletePost}
            changePost={changePost}
          />
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AllPosts;
