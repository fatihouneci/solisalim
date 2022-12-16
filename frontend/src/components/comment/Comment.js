import React from "react";
import { UNCOMMENT_POST } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { formatTimeAgo } from "../../core/helpers/utility";
import ProfileImg from "../../images/profile.png";
import { TrashIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const Comment = ({ postId, comment, deleteComment }) => {
  const { user } = useSelector((state) => state.auth);

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await FetchWrapper.put(`${UNCOMMENT_POST}/${postId}`, {
      comment,
    });
    if (response) {
      deleteComment(response);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex space-x-4 my-5">
      <div>
        {comment.postedBy && (
          <div className="relative">
            {comment.postedBy.profilePicture ? (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={comment.postedBy.profilePicture}
              />
            ) : (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={ProfileImg}
              />
            )}
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <span className="text-gray-800 font-semibold text-xs truncate">
            {comment?.postedBy.firstName + " " + comment?.postedBy.lastName} -
          </span>
          <span className="text-xs truncate">
            {formatTimeAgo(comment?.createdAt)}
          </span>
        </div>
        <p>{comment?.text}</p>
        {comment.postedBy._id === user.profile._id && (
          <button onClick={handleDelete}>
            <TrashIcon className="w-4 -h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
