import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import { CameraIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checkbox, CheckboxGroup } from "../Input";
import {
  GET_CATEGORIES,
  GET_POSTS,
  NEW_POSTS,
  UPLOAD_IMG,
} from "../../constants/apiEndpoints";

import { useSelector, useDispatch } from "react-redux";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";

const PostEdit = () => {
  const dispatch = useDispatch();

  const postCreate = useSelector((state) => state.createPost);
  const { loading, error, post } = postCreate;

  const [image, setImage] = useState(null);
  const [savedPost, setSavedPost] = useState(null);
  const [coverPicture, setCoverPicture] = useState(
    "/assets/images/default-placeholder.png"
  );
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const postId = useParams().id;

  const isAddMode = !postId;

  useEffect(async () => {
    const response = await FetchWrapper.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    if (postId) {
      const response = await FetchWrapper.get(`${GET_POSTS}${postId}`);
      setSavedPost(response.post);
      setCoverPicture(response.coverPicture);
    }
  }, [postId]);

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("imageMsg", file, file.name);
    const response = await FetchWrapper.post(UPLOAD_IMG, formData);
    if (response) {
      setImage(file);
      setCoverPicture(response.data);
    }
  };

  const onImageUrlChange = async (e) => {
    setCoverPicture(e);
  };

  const initialValues = {
    title: "",
    coverPicture: "",
    media: "text",
    categories: [],
    description: "",
    content: "",
    isVisible: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).required("Informations requise"),
    categories: Yup.array().required("Choisir au moins une categorie"),
    description: Yup.string().min(3).required("Informations requise"),
    content: Yup.string().min(3).required("Informations requise"),
  });

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createPost(values, actions);
    } else {
      updatePost(values, actions);
    }
  };

  const createPost = async (values, actions) => {
    values.coverPicture = coverPicture;
    const response = await FetchWrapper.post(NEW_POSTS, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate("/my/posts");
    }
  };

  const updatePost = async (values, actions) => {
    values.coverPicture = coverPicture;
    const response = await FetchWrapper.put(`${GET_POSTS}${postId}`, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate(`/my/posts`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-16">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
          <h1 className="text-2xl">Nouvel article</h1>
          <Formik
            initialValues={savedPost || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
              isSubmitting,
            }) => {
              return (
                <Form className="">
                  {errors.length > 0 &&
                    errors.map((error) => (
                      <p className="text-red-500">{error}</p>
                    ))}
                  <div className="relative rounded-lg border hover:cursor-pointer border-dotted">
                    <input
                      className="absolute top-0 left-0 right-0 bottom-0 w-full h-[400px] rounded-lg opacity-0"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadFile(e.target.files[0])}
                    />
                    <img
                      className="w-full h-[400px] object-cover rounded-lg border border-dotted shadow-md"
                      src={coverPicture}
                    />
                  </div>

                  <div className="my-2">
                    <label className="" htmlFor="name">
                      Image de couverture
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="coverPicture"
                        type="text"
                        value={coverPicture}
                        onChange={(e) => onImageUrlChange(e.target.value)}
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="name">
                      Titre
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="title"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="description">
                      Description
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="description"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="description" />
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <ReactQuill
                      className="w-full h-[500px] mb-10"
                      value={values.content || ""}
                      onChange={(e) => setFieldValue("content", e)}
                    />
                  </div>

                  <div>
                    <h2 className="text-xl my-3">Categories</h2>
                    <CheckboxGroup
                      id="categories"
                      label="selection des categories"
                      value={values.categories}
                      error={errors.categories}
                      touched={touched.categories}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    >
                      {categories &&
                        categories.map((c) => (
                          <Field
                            key={c._id}
                            component={Checkbox}
                            name="categories"
                            id={c._id}
                            label={c.name}
                          />
                        ))}
                    </CheckboxGroup>
                  </div>

                  <div className="my-4">
                    <h2>Visibilite de l'article</h2>
                    <Field
                      component={Checkbox}
                      name="isVisible"
                      id="isVisible"
                      label="Publier ?"
                    />
                  </div>

                  <div className="flex items-center justify-between my-4">
                    <button
                      className="flex items-center justify-center bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? "Loading..." : "Enregistrer"}
                    </button>
                    <a
                      className="flex items-center border-2 border-blue-400 justify-center bg-white text-blue-600 rounded-full px-4 py-2 hover:bg-blue-100"
                      href="/my/posts"
                    >
                      Annuler
                    </a>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PostEdit;
