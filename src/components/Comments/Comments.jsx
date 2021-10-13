import React, { useState } from "react";

const Comments = ({ comment, postId, comments }) => {
  return <div>{comment.body}</div>;
};

export default Comments;
