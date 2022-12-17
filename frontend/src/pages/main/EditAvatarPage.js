import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar, updateProfile } from "../../core/redux/auth/authActions";

const EditAvatarPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { loading, user } = auth;

  const handleUploadFile = async (file) => {
    updateAvatar(dispatch, file);
  };

  const handleSubmit = async () => {
    updateProfile(dispatch, {
      profilePicture: user.profile.profilePicture,
      username: user.profile.username,
      fullName: user.profile.fullName,
      about_me: user.profile.about_me,
    });
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="py-4">
        <h2 className="text-3xl">Modifier mon avatar</h2>
      </div>
      <div className="mx-auto w-1/2">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2 items-center justify-center my-4">
            <div className="inline-flex items-center justify-center rounded-full h-40 w-40 bg-gray-300 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-400 focus:outline-none">
              <input
                className="absolute z-50 w-40 rounded-full opacity-0"
                type="file"
                accept="image/*"
                onChange={(e) => handleUploadFile(e.target.files[0])}
              />
              {/* <CameraIcon className="w-24 h-24" /> */}
              {user.profile.profilePicture && (
                <img
                  className="absolute w-40 rounded-full"
                  src={user.profile.profilePicture}
                />
              )}
            </div>
          </div>
          <button type="submit" className="btn">
            {loading ? "Loading..." : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAvatarPage;
