import React, { useEffect, useState } from "react";
import { GET_USER_POSTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiTrash2, FiEdit2 } from "react-icons/fi";
import { formatToDate } from "../../core/helpers/utility";
import Pagination from "../../core/components/common/Pagination";

export default function PostList() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const getMyPost = async (selectedPage = 1, keyword = "") => {
    const { posts, page, pages } = await FetchWrapper.get(
      `${GET_USER_POSTS}?page=${selectedPage}&keyword=${keyword}`
    );
    if (posts) {
      setPosts(posts);
      setPage(page);
      setPages(pages);
    }
  };

  const handleDelete = (e, postId) => {
    e.preventDefault();
    if (window.confirm("êtes vous sûr de vouloir supprimer ?")) {
      axios
        .delete("http://localhost:2000/api/posts/delete/" + postId)
        .then(function (response) {
          // handle success
          console.log(response);
          getMyPost(page, null);
          alert(response.data.username + " a été supprimé avec succès");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const toggleSelection = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setSelectedPosts((selectedPosts) => [...selectedPosts, e.target.value]);
    } else {
      setSelectedPosts(selectedPosts.filter((item) => item !== e.target.value));
    }
  };

  const doWithList = (e) => {
    e.preventDefault();
    alert(selectedPosts);
  };

  const handleSearch = (search) => {
    getMyPost(page, search);
  };

  useEffect(() => {
    getMyPost();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          {selectedPosts.length > 0 && (
            <div>
              <button onClick={doWithList}>Supprimer la selection</button>
            </div>
          )}
        </div>

        <div className="flex mt-5">
          <div className="border px-4 rounded-full my-4 flex items-center space-x-4">
            <FiSearch />
            <input
              className="outline-none border-0 focus:border-0 focus:outline-none focus:ring-0"
              onChange={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Rechercher..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                <input type="checkbox" />
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr
                key={post._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="py-4 px-6">
                  <input
                    type="checkbox"
                    value={post._id}
                    onChange={toggleSelection}
                  />
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.coverPicture && (
                    <img src={post.coverPicture} className="w-[50px]" />
                  )}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {post.title}
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="w-[200px] truncate">{post.description}</div>
                </td>
                <td
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {formatToDate(post.createdAt)}
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-end justify-end space-x-3">
                    <Link
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                      to={`/studio/posts/edit/${post._id}`}
                    >
                      <FiEdit2 className="w-6 h-6" />
                    </Link>
                    <button onClick={(e) => handleDelete(e, post._id)}>
                      <FiTrash2 className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-[40px]">
        {/* Pagination */}
        <Pagination route="/myposts" page={page} pages={pages} />
      </div>
    </div>
  );
}
