import React, { useState } from "react";
import { useHttp } from "./../../hooks/http.hook";
import "./CreatePost.css";
import { useMessage } from "./../../hooks/message.hook";
const CreatePost = () => {
  const message = useMessage();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const { request } = useHttp();

  const handleCreatePost = async () => {
    try {
      await request(
        `https://bloggy-api.herokuapp.com/posts`,
        "POST",
        Object.assign(title, body)
      );
      message("Post created");
    } catch (error) {
      console.error(error);
      message(error);
    }
  };
  return (
    <div className="create-post">
      <form className="col s6">
        <div className="input-field col s6">
          <input
            id="first_name"
            type="text"
            className="validate"
            onChange={(e) => setTitle({ title: e.target.value })}
          />
          <label for="first_name">Title</label>
        </div>

        <div className="input-field col s6">
          <textarea
            id="textarea1"
            className="materialize-textarea"
            onChange={(e) => setBody({ body: e.target.value })}
          />
          <label for="textarea1">Textarea</label>
        </div>
      </form>
      <button className="btn btn-primary" onClick={handleCreatePost}>
        Create post
      </button>
    </div>
  );
};

export default CreatePost;
