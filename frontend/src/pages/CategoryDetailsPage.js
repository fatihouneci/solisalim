import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import EmptyList from "../components/EmptyList";
import Loading from "../components/LoadingError/Loading";
import PostListHorizontal from "../components/Posts/PostListHorizontal";
import { GET_CATEGORIES } from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";

const CategoryDetailsPage = () => {
  const categoryId = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [othersCategories, setOthersCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    setIsLoading(true);
    const response = await httpRequest.get(`${GET_CATEGORIES}${categoryId}`);
    if (response) {
      setCategory(response.category);
      setPosts(response.posts);
      setOthersCategories(response.othersCategories);
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-auto max-w-6xl py-4">
            <div className="grid grid-cols-3 gap-6">
              {/* Post list for selected category */}
              <div className="col-span-2 my-5">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {category.name}
                  </h1>
                  <p className="text-gray-400">
                    Nombre d'articles {posts.length}
                  </p>
                </div>
                <div>
                  {posts.length > 0 ? (
                    <PostListHorizontal posts={posts} />
                  ) : (
                    <EmptyList />
                  )}
                </div>
                {/* Post list */}
              </div>
              {/* Others categories */}
              <div className="border-l p-4 hidden md:block flex-1">
                <h1 className="text-sm font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Autres catégories
                </h1>
                <div className="flex flex-wrap">
                  {othersCategories?.map((category) => (
                    <Link
                      to={`/category/${category._id}`}
                      className="rounded-lg my-1 mr-1 px-2 border hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetailsPage;
