import React, { useState, useEffect } from "react";
import { GET_USERS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiTrash2, FiEdit2 } from "react-icons/fi";
import { formatToDate } from "../../core/helpers/utility";
import Pagination from "../../core/components/common/Pagination";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getUsers = async (selectedPage = 1, keyword = "") => {
    const { users, page, pages } = await FetchWrapper.get(
      `${GET_USERS}paginate?page=${selectedPage}&keyword=${keyword}`
    );
    if (users) {
      setUsers(users);
      setPage(page);
      setPages(pages);
    }
  };

  const handleDelete = (e, postId) => {
    e.preventDefault();
    if (window.confirm("êtes vous sûr de vouloir supprimer ?")) {
      axios
        .delete("http://localhost:2000/api/users/delete/" + postId)
        .then(function (response) {
          // handle success
          console.log(response);
          getUsers(page, null);
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
      setSelectedUsers((selectedUsers) => [...selectedUsers, e.target.value]);
    } else {
      setSelectedUsers(selectedUsers.filter((item) => item !== e.target.value));
    }
  };

  const doWithList = (e) => {
    e.preventDefault();
    alert(selectedUsers);
  };

  const handleSearch = (search) => {
    getUsers(page, search);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between border-b p-4 my-[40px]">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <Link className="px-4 py-2 border rounded-md" to="/studio/users/new">
          Créer
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {selectedUsers.length > 0 && (
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
                Nom complet
              </th>
              <th scope="col" className="py-3 px-6">
                Téléphone
              </th>
              <th scope="col" className="py-3 px-6">
                Groupe
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
            {users.length > 0 &&
              users?.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      value={user._id}
                      onChange={toggleSelection}
                    />
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        {user?.profilePicture ? (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user?.profilePicture}
                            alt=""
                          />
                        ) : (
                          <>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="../assets/profile.png"
                              alt=""
                            />
                          </>
                        )}
                      </div>
                      <div>
                        <h1>{user.firstName + " " + user.lastName}</h1>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.code}
                    {user.telephone}
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.isAdmin ? (
                      <>Administrateur</>
                    ) : (
                      <>Simple Utilisateur</>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {formatToDate(user.createdAt)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-end justify-end space-x-3">
                      <Link
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                        to={`/studio/users/edit/${user._id}`}
                      >
                        <FiEdit2 className="w-6 h-6" />
                      </Link>
                      <button onClick={(e) => handleDelete(e, user._id)}>
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
