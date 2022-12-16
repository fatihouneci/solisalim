import React, { useEffect, useState } from "react";
import { GET_USER_POSTS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiTrash2, FiEdit2 } from "react-icons/fi";
import { formatToDate } from "../../core/helpers/utility";
import Pagination from "../../core/components/common/Pagination";
import PostList from "../../components/studio/PostList";

export default function MyPostPage() {
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
      <div className="flex items-center justify-between border-b p-4 my-[40px]">
        <h1 className="text-2xl font-bold">Mes articles</h1>
        <Link className="px-4 py-2 border rounded-md" to="/studio/posts/new">
          Créer
        </Link>
      </div>

      <PostList />
    </div>
  );
}
