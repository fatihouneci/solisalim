import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateProfile } from "../../core/redux/auth/authActions";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const [email, setEmail] = useState(user.profile.email);
  const [firstName, setFirstName] = useState(user.profile.firstName);
  const [lastName, setLastName] = useState(user.profile.lastName);
  const [aboutMe, setAboutMe] = useState(user.profile.about_me);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(dispatch, {
      profilePicture: user.profile.profilePicture,
      email,
      firstName,
      lastName,
      about_me: aboutMe,
    });
  };

  return (
    <div className="min-h-full mx-auto max-w-sm">
      <div>
        <div className="flex p-4 items-center text-center">
          <h2 className="text-3xl">Modifier Mon profile</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <Link
            to="/profile/avatar"
            className="flex items-center justify-center rounded-full h-40 w-40 bg-gray-300 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-400 focus:outline-none"
          >
            {user.profile.profilePicture && (
              <img
                className="absolute w-40 rounded-full"
                src={user.profile.profilePicture}
              />
            )}
          </Link>

          <div className="my-4 flex flex-col">
            <label className="">Nom</label>
            <input
              className="input"
              type="text"
              placeholder="Nom / Prénoms"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-4 flex flex-col">
            <label className="">Prenoms</label>
            <input
              className="input"
              type="text"
              placeholder="Nom / Prénoms"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="my-4 flex flex-col">
            <label className="">Identifiant</label>
            <input
              className="input"
              type="text"
              placeholder="Identifiant"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-4 flex flex-col">
            <label className="">A propos</label>
            <textarea
              className="input"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-2 flex flex-col">
            <button className="btn">Enregistrer</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
