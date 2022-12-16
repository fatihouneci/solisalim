import React, { useEffect, useState } from "react";
import { ImFileEmpty, ImFilePicture, ImHeadphones } from "react-icons/im";
import { HiOutlinePlay } from "react-icons/hi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useFormik } from "formik";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_USERS,
  NEW_POSTS,
  NEW_USER,
  UPDATE_USER,
  UPLOAD_AUDIO,
  UPLOAD_IMG,
} from "../../core/constants/apiEndpoints";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";

export default function UserEditPage() {
  const [profilePicture, setProfilPicture] = useState("");
  const [savedUser, setSavedUser] = useState({});

  const navigate = useNavigate();
  const userId = useParams().id;

  useEffect(async () => {
    if (userId) {
      const response = await FetchWrapper.get(`${GET_USERS}byid/${userId}`);
      setProfilPicture(response.profilePicture);
      setSavedUser(response);
    }
  }, [userId]);

  const handleUploadFile = async (file, fileObject, fileType) => {
    let response;
    const formData = new FormData();
    if (fileType === "image") {
      formData.append("imageMsg", file, file.name);
      response = await FetchWrapper.post(UPLOAD_IMG, formData);
    }
    if (response) {
      if (fileObject === "profilePicture") {
        formik.values.profilePicture = response.data;
        setProfilPicture(response.data);
      }
    }
  };

  const handleSubmit = async (values, actions) => {
    values.profilePicture = profilePicture;
    if (!userId) {
      createPost(values, actions);
    } else {
      updatePost(values, actions);
    }
  };

  const createPost = async (values, actions) => {
    const response = await FetchWrapper.post(NEW_USER, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate("/studio/users");
    }
  };

  const updatePost = async (values, actions) => {
    const response = await FetchWrapper.put(`${UPDATE_USER}${userId}`, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate(`/studio/users`);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      profilePicture:
        savedUser?.profilePicture ||
        "https://www.ilovepdf.com/storage/blog/123-1652094034-How-to-convert-PNG-images-to-PDF-files-online.jpg",
      firstName: savedUser?.firstName,
      lastName: savedUser?.lastName,
      code: savedUser?.code || "+225",
      telephone: savedUser?.telephone,
      email: savedUser?.email,
      password: "",
      isAdmin: savedUser?.isAdmin,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().min(3).required("Informations requise"),
      lastName: Yup.string().min(3).required("Informations requise"),
      telephone: Yup.string().min(3).required("Informations requise"),
      email: Yup.string()
        .email("Adresse e-mail invalide")
        .required("Informations requise"),
      password: Yup.string().required("Informations requise"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="max-w-6xl mx-auto sm:px-4 py-4">
      <form onSubmit={formik.handleSubmit} className="p-2 flex space-x-5">
        <div className="w-9/12 flex flex-col space-y-3 h-screen mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              {savedUser && savedUser._id ? "Modifier" : "Enregistrer"} un
              utilisateur
            </h1>
            <div className="flex items-center space-x-5">
              <button
                className="flex items-center justify-center bg-green-700 text-white rounded-lg px-4 py-2 hover:opacity-70"
                disabled={formik.isSubmitting}
                type="submit"
              >
                {formik.isSubmitting ? "Loading..." : "Enregistrer"}
              </button>
            </div>
          </div>

          <div>
            <input
              className="w-full p-2 focus:ring-1 outline-none rounded-lg bg-white"
              type="text"
              placeholder="Nom"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <span className="text-red-500">{formik.errors.firstName}</span>
            ) : null}
          </div>

          <div>
            <input
              className="w-full p-2 focus:ring-1 outline-none rounded-lg bg-white"
              type="text"
              placeholder="Prénoms"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <span className="text-red-500">{formik.errors.lastName}</span>
            ) : null}
          </div>

          <div className="my-2">
            <label>Numéro de téléphone</label>
            <input
              className="input"
              type="text"
              name="telephone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telephone}
            />
            {formik.touched.telephone || formik.errors.telephone ? (
              <span className="text-red-500 text-sm">
                {formik.errors.telephone}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="my-2">
            <label>Email adresse</label>
            <input
              className="input"
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email || formik.errors.email ? (
              <span className="text-red-500 text-sm">
                {formik.errors.email}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label>Mot de passe</label>
            <input
              className="input"
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password || formik.errors.password ? (
              <span className="text-red-500 text-sm">
                {formik.errors.password}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-1/4 px-4 flex flex-col space-y-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Image de profil
            </h1>
            <label className="cursor-pointer" htmlFor="thumbnail">
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUploadFile(e.target.files[0], "profilePicture", "image")
                }
                hidden
              />
              <input
                type="text"
                name="profilePicture"
                onChange={formik.handleChange}
                value={formik.values.profilePicture}
                hidden
              />
              <div
                className="border border-dashed border-gray-500 aspect-2 text-gray-500
        flex flex-col items-center justify-center"
              >
                {profilePicture ? (
                  <img
                    className="border aspect-2"
                    src={profilePicture}
                    alt="Image de couverture"
                  />
                ) : (
                  <>
                    <span>Choisir une image</span>
                    <span className="text-xs">Taille recommandée</span>
                    <span className="text-xs">1280 * 720</span>
                  </>
                )}
              </div>
            </label>
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-2">Groupe</h1>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formik.values.isAdmin ? true : false}
                onChange={formik.handleChange}
                value={formik.values.isAdmin}
              />
              <label htmlFor="isAdmin">Administrateur ?</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
