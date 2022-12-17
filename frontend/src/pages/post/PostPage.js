import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../components/LoadingError/Loading";
import Message from "../../components/LoadingError/Error";
import PostCard from "../../components/Posts/PostCard";
import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { history } from "../../core/helpers/history";
import { listPost } from "../../core/redux/post/PostActions";
import Pagination from "../../core/components/common/Pagination";

const PostPage = () => {
  const query = useLocation().search;
  const dispatch = useDispatch();
  const { loading, error, posts, page, pages } = useSelector(
    (state) => state.listPost
  );
  const [keyword, setKeyword] = useState();
  const [categories, setCategories] = useState([]);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     history.navigate(`/posts?keyword=${keyword}`);
  //   } else {
  //     history.navigate("/posts");
  //   }
  // };

  useEffect(() => {
    dispatch(listPost(query));
  }, [dispatch, query]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await FetchWrapper.get(`${GET_CATEGORIES}`);
      if (response) {
        setCategories(response);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="relative bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex space-x-10">
          <div className="flex-[3]">
            <div className="py-4 px-4 flex items-center justify-between sticky top-0 z-30 bg-white">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 py-6">
                Articles
              </h1>
            </div>

            {loading ? (
              <div className="mb-5">
                <Loading />
              </div>
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="my-[40px]">
                <div className="px-4 grid grid-cols-1 gap-x-4 my-5 md:grid-cols-2 lg:grid-cols-3">
                  {posts?.map((v) => (
                    <PostCard key={v._id} post={v} />
                  ))}
                </div>
                <div>
                  {/* Pagination */}
                  <Pagination
                    route="/posts"
                    page={page}
                    pages={pages}
                    keyword={keyword ? keyword : ""}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex-[1] h-screen sticky top-0">
            <div className="w-full h-full">
              <div className="py-4 px-4 flex items-center justify-between z-30 bg-white">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 py-6">
                  Catégories
                </h1>
              </div>
              <div className="py-4 px-4">
                {categories &&
                  categories
                    ?.sort((a, b) => a.number - b.number)
                    .map((c) => (
                      <div className="flex flex-wrap">
                        <Link
                          key={c._id}
                          to={`/posts?tags=${c.name}`}
                          className="bg-gray-100 m-1 p-2 text-sm rounded-full font-semibold text-green-600 hover:text-green-800"
                        >
                          {c.name}
                        </Link>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
