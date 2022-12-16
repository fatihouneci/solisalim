import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { history } from "../helpers/history";

export default function SearchForm() {
  const [type, setType] = useState("posts");
  const [title, setTitle] = useState("");

  const location = useLocation().search;
  console.log(location);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.navigate(`/${type}?keyword=${title}`);
  };

  return (
    <div className="max-w-screen-lg mx-auto space-y-4 py-1">
      <form className="max-w-screen-lg mx-auto" onSubmit={handleSubmit}>
        <div className="flex rounded-lg border border-gray-400 border-1">
          <select
            onChange={(e) => setType(e.target.value)}
            name="type"
            className="rounded-l-lg border-none"
          >
            <option value="posts">Articles</option>
            <option value="videos">Videos</option>
            <option value="books">Livres</option>
            <option value="audios">Audios</option>
          </select>
          <input
            name="title"
            className="border-l border-y-0 border-r-0 w-full focus:ring-0 outline-none focus:border-0"
            type="text"
            placeholder="Rechercher un article..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="border-l px-4 hover:bg-gray-200 rounded-r-lg">
            <BsSearch />
          </button>
        </div>
      </form>
    </div>
  );
}
