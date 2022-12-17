import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_COMMENTS, NEW_COMMENTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import Comment from "./Comment";

const Comments = ({ postId, comments, updateComments }) => {
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await FetchWrapper.put(`${NEW_COMMENTS}/${postId}`, {
      postId,
      text,
    });
    if (response) {
      updateComments(response);
      setText("");
    }
  };

  const deleteComment = (response) => {
    updateComments(response);
  };

  return (
    <div className="w-full mx-10 sticky top-0 bg-white">
      {user && (
        <div className="w-full  flex items-center space-x-4 my-5 border-b py-5">
          <div className="w-10 h-10 rounded-full">
            <img className="w-10 h-10 rounded-full" src="/assets/profile.png" />
          </div>
          <div className="flex-1 bg-green-300">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="placeholder-gray-500 block focus:outline-none w-full border-none focus:ring-0"
                placeholder="Entrer un commentaire"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </form>
          </div>
        </div>
      )}
      {comments && comments.length > 0 ? (
        <div>
          {comments?.map((comment, i) => (
            <Comment
              key={i}
              postId={postId}
              comment={comment}
              deleteComment={deleteComment}
            />
          ))}
        </div>
      ) : (
        <div className="flex-1">
          <p>Aucuns commentaires</p>
        </div>
      )}
    </div>
  );
};

export default Comments;
