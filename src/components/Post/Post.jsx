import React, { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import Comments from "./../Comments/Comments";
import { useMessage } from "./../../hooks/message.hook";
import "./Post.css";
const Post = ({ post, deletePost, changePost }) => {
  const { request } = useHttp();
  const message = useMessage();
  const [change, setChange] = useState(false);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(null);
  const [newComment, setNewComment] = useState(null);

  const handleDelete = async () => {
    try {
      await request(
        `https://bloggy-api.herokuapp.com/posts/${post.id}`,
        "DELETE"
      );
      deletePost();
    } catch (error) {
      console.error(error);
    }
  };
  const handleSendChanges = async () => {
    try {
      await request(
        `https://bloggy-api.herokuapp.com/posts/${post.id}`,
        "PUT",
        Object.assign(title, body)
      );
      setChange(false);
      changePost();
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenChange = () => {
    setChange(true);
  };
  const handleCloseChange = () => {
    setChange(false);
  };
  const handleShowComments = async () => {
    try {
      const data = await request(
        `https://bloggy-api.herokuapp.com/comments?postId=${post.id}`,
        "GET"
      );
      if (data === []) {
        console.log("NO COMMENTS");
      }
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  const openComments = () => {
    setShowComments(!showComments);
    handleShowComments();
  };
  const addComment = async () => {
    try {
      await request(`https://bloggy-api.herokuapp.com/comments`, "POST", {
        body: newComment,
        postId: post.id,
      });
      message("Comment added");
      handleShowComments();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" col s12 m12">
      {change ? (
        <div className="card blue-grey darken-1 ">
          <div className="card-content white-text">
            <form className="col s6">
              <div className="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  onChange={(e) => setTitle({ title: e.target.value })}
                />
                <label htmlFor="first_name">Title</label>
              </div>

              <div className="input-field col s6">
                <textarea
                  id="textarea1"
                  className="materialize-textarea"
                  onChange={(e) => setBody({ body: e.target.value })}
                />
                <label htmlFor="textarea1">Body</label>
              </div>
            </form>
          </div>
          <div className="card-action">
            <button
              className="btn btn-secondary #b71c1c red darken-4"
              onClick={handleCloseChange}
            >
              Close change
            </button>
            <button
              className="btn btn-secondary #4caf50 green darken-1 m-left"
              onClick={handleSendChanges}
            >
              Accept changes
            </button>
          </div>
        </div>
      ) : (
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{post.title}</span>
            <p>{post.body}</p>

            {showComments && comments ? (
              comments.length === 0 ? (
                <div>
                  <h4>Comments</h4>
                  <p>No comments yet</p>
                  <div className="input-field col s6">
                    <textarea
                      id="textarea2"
                      className="materialize-textarea"
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <label htmlFor="textarea2">Comment</label>
                    <button onClick={addComment}>Add Comment</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h4>Comments</h4>
                  {comments.map((comment) => (
                    <Comments comment={comment} key={comment.id} />
                  ))}
                  <div className="input-field col s6">
                    <textarea
                      id="textarea2"
                      className="materialize-textarea"
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <label htmlFor="textarea2">Comment</label>
                    <button onClick={addComment}>Add Comment</button>
                  </div>
                </div>
              )
            ) : null}
          </div>
          <div className="card-action">
            {showComments ? (
              <button
                className="btn btn-secondary #26c6da cyan lighten-1"
                onClick={openComments}
              >
                Close Comments
              </button>
            ) : (
              <button
                className="btn btn-secondary #26c6da cyan lighten-1"
                onClick={openComments}
              >
                Show Comments
              </button>
            )}

            <button
              className="btn btn-secondary #b71c1c red darken-4 m-left"
              onClick={handleDelete}
            >
              Delete Post
            </button>
            <button
              className="btn btn-secondary #b39ddb deep-purple lighten-3 m-left"
              onClick={handleOpenChange}
            >
              Change Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
