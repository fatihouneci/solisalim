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
  NEW_POSTS,
  UPLOAD_AUDIO,
  UPLOAD_IMG,
} from "../../core/constants/apiEndpoints";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useRef } from "react";
import { convertToSlug } from "../../core/helpers/utility";
import Player from "../../components/Player";

export default function PostEditPage() {
  const [coverPicture, setCoverPicture] = useState("");
  const [audioUri, setAudioUri] = useState("");
  const [imgUpload, setImgUpload] = useState("");
  const [savedPost, setSavedPost] = useState();
  const [categories, setCategories] = useState([]);

  const tagsRef = useRef();

  const navigate = useNavigate();
  const postId = useParams().id;

  useEffect(async () => {
    const response = await FetchWrapper.get(GET_CATEGORIES);
    console.log(response);
    setCategories(response);
  }, []);

  useEffect(async () => {
    if (postId) {
      const response = await FetchWrapper.get(`${GET_POSTS}byid/${postId}`);
      console.log(response);
      setAudioUri(response.audioUri);
      setCoverPicture(response.coverPicture);
      setSavedPost(response);
    }
  }, [postId]);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(imgUpload);
  };

  const handleUploadFile = async (file, fileObject, fileType) => {
    let response;
    const formData = new FormData();
    if (fileType === "image") {
      formData.append("imageMsg", file, file.name);
      response = await FetchWrapper.post(UPLOAD_IMG, formData);
    }
    if (fileType === "track") {
      formData.append("track", file, file.name);
      response = await FetchWrapper.post(UPLOAD_AUDIO, formData);
    }
    if (response) {
      if (fileObject === "coverPicture") {
        formik.values.coverPicture = response.data;
        setCoverPicture(response.data);
      }
      if (fileObject === "audioUri") {
        formik.values.audioUri = response.data;
        setAudioUri(response.data);
      }
      if (fileObject === "imgUpload") {
        setImgUpload(response.data);
      }
    }
  };

  const handleSubmit = async (values, actions) => {
    values.tags = values.tags.split(",");
    values.slug = convertToSlug(values.title);
    values.coverPicture = coverPicture;
    values.audioUri = audioUri;
    if (!postId) {
      createPost(values, actions);
    } else {
      updatePost(values, actions);
    }
  };

  const createPost = async (values, actions) => {
    const response = await FetchWrapper.post(NEW_POSTS, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate("/posts");
    }
  };

  const updatePost = async (values, actions) => {
    const response = await FetchWrapper.put(`${GET_POSTS}${postId}`, values);
    if (response) {
      console.log(response);
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate(`/posts/${response.slug}`);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      coverPicture:
        savedPost?.coverPicture ||
        "https://www.ilovepdf.com/storage/blog/123-1652094034-How-to-convert-PNG-images-to-PDF-files-online.jpg",
      audioUri: savedPost?.audioUri || "",
      title: savedPost?.title || "",
      slug: savedPost?.title ? convertToSlug(savedPost?.title) : "",
      description: savedPost?.description || "",
      content: savedPost?.content || "",
      tags: savedPost?.tags.join(","),
      isExclusif: savedPost?.isExclusif,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().min(3).required("Informations requise"),
      description: Yup.string().min(3).required("Informations requise"),
      tags: Yup.string().required("Informations requise"),
      content: Yup.string().min(3).required("Informations requise"),
    }),
    onSubmit: handleSubmit,
  });

  const handleClickTag = (name) => {
    if (tagsRef.current.value.length === 0) {
      tagsRef.current.value = name;
    } else if (
      tagsRef.current.value.length > 0 &&
      !tagsRef.current.value.includes(name)
    ) {
      tagsRef.current.value = tagsRef.current.value + "," + name;
    }
    formik.setFieldValue("tags", tagsRef.current.value);
  };

  return (
    <div className="max-w-6xl mx-auto sm:px-4 py-4">
      <form onSubmit={formik.handleSubmit} className="p-2 flex space-x-5">
        <div className="w-9/12 flex flex-col space-y-3 h-screen mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Nouvel article</h1>
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
              placeholder="Titre"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <span className="text-red-500">{formik.errors.title}</span>
            ) : null}
          </div>

          <div>
            <label>Tags</label>
            <div className="flex flex-wrap space-x-1">
              {categories &&
                categories.map((c) => (
                  <span
                    key={c._id}
                    className="text-green-700 border-2 font-semibold border-green-700 cursor-pointer my-1 text-xs px-2 py-1 rounded-full hover:bg-green-700 hover:text-white"
                    onClick={() => handleClickTag(c.name)}
                  >
                    {c.name}
                  </span>
                ))}
            </div>
            {/* <input type="text" value={tags} disabled /> */}
            <input
              ref={tagsRef}
              className="w-full p-2 focus:ring-1 outline-none rounded-lg bg-white"
              type="text"
              placeholder="Tags"
              name="tags"
              onChange={formik.handleChange}
              value={formik.values.tags}
            />
            {formik.touched.tags && formik.errors.tags ? (
              <span className="text-red-500">{formik.errors.tags}</span>
            ) : null}
          </div>

          <div>
            <label>Meta description</label>
            <textarea
              className="resize-none w-full focus:ring-1 outline-none rounded-lg font-semibold"
              placeholder="Meta Description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <span className="text-red-500">{formik.errors.description}</span>
            ) : null}
          </div>

          <div className="flex items-center w-full space-x-4">
            <label
              htmlFor="image-input"
              className="flex items-center space-x-3 px-3 ring-1 ring-gray-700 rounded-lg h-10 
        text-gray-700 hover:text-white hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={(e) =>
                  handleUploadFile(e.target.files[0], "imgUpload", "image")
                }
                hidden
              />
              <span>Charger une photo pour l'article</span>
              <ImFilePicture />
            </label>
            <div className="flex flex-1 border border-gray-700 rounded-lg px-2 bg-gray-700 text-white">
              <input
                className="flex-1 border-none bg-transparent w-full"
                type="text"
                name="image"
                value={imgUpload}
                placeholder="http://www.pixabay.com/photos/dj301930202.png"
                disabled
              />
              <button
                onClick={handleCopy}
                className="flex flex-col text-xs items-center justify-center self-stretch"
              >
                <ImFileEmpty />
                <span className="">Copier</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <ReactQuill
              className="mb-10 flex-1 resize-none w-full focus:ring-1 outline-none rounded-lg font-mono tracking-wide text-lg"
              name="content"
              onChange={(e) => formik.setFieldValue("content", e)}
              value={formik.values.content || ""}
            />
            {formik.touched.content && formik.errors.content ? (
              <span className="text-red-500">{formik.errors.content}</span>
            ) : null}
          </div>
        </div>
        <div className="w-1/4 px-4 flex flex-col space-y-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Image de couverture
            </h1>
            <label className="cursor-pointer" htmlFor="thumbnail">
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUploadFile(e.target.files[0], "coverPicture", "image")
                }
                hidden
              />
              <input
                type="text"
                name="coverPicture"
                onChange={formik.handleChange}
                value={formik.values.coverPicture}
                hidden
              />
              <div
                className="border border-dashed border-gray-500 aspect-2 text-gray-500
        flex flex-col items-center justify-center"
              >
                {coverPicture ? (
                  <img
                    className="border aspect-2"
                    src={coverPicture}
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
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Fichier audio
            </h1>
            {audioUri && <Player url={audioUri} />}
            {!audioUri && (
              <label className="cursor-pointer" htmlFor="audioUri">
                <input
                  id="audioUri"
                  type="file"
                  accept="audio/*"
                  onChange={(e) =>
                    handleUploadFile(e.target.files[0], "audioUri", "track")
                  }
                  hidden
                />
                <input
                  type="text"
                  hidden
                  name="audioUri"
                  onChange={formik.handleChange}
                  value={formik.values.audioUri}
                />
                <div
                  className="border border-dashed border-gray-500 aspect-2 text-gray-500
            flex flex-col items-center justify-center"
                >
                  <ImHeadphones className="w-10 h-10" />
                  <span className="text-xs">Taille recommandée</span>
                  <span className="text-xs">Moins de 10 Megbytes</span>
                </div>
              </label>
            )}
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-700 mb-2">
              Disposition
            </h1>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isExclusif"
                name="isExclusif"
                checked={formik.values.isExclusif ? true : false}
                onChange={formik.handleChange}
                value={formik.values.isExclusif}
              />
              <label htmlFor="isExclusif">Exclusifs</label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
