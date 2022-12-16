import { Link } from "react-router-dom";

import { formatToDate } from "../helpers/utility";

export default function PostItem({ post }) {
  return (
    <Link
      to={`/posts/${post._id}`}
      title={post.title}
      className="w-[250px] cursor-pointer bg-white rounded-md inline-block mr-5 hover:scale-105 transform transition duration-300 ease-out"
    >
      <div className="relative h-[250px] w-[250px]">
        <img
          src={post.coverPicture}
          layout="fill"
          className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-100 group-hover:opacity-100"
        />
      </div>
      <div className="w-full overflow-hidden py-5">
        <div className="text-[16px]">
          <h4 className="font-extrabold truncate uppercase">{post.title}</h4>
          <h6 className="truncate">{post.description}</h6>
        </div>
      </div>
    </Link>
  );
}
