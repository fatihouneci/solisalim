import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { GET_CATEGORIES, GET_VIDEOS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../core/redux/upload/UploadActions";
import { createVideo, updateVideo } from "../../core/redux/video/VideoActions";
import { RefreshIcon } from "@heroicons/react/outline";
import { history } from "../../core/helpers/history";
import { useParams } from "react-router";
const VideoEditPage = () => {
  const dispatch = useDispatch();
  const { loading, error, video } = useSelector((state) => state.createVideo);

  const videoId = useParams().id;

  const [data, setData] = useState();
  const [categories, setCategories] = useState([]);
  const initialValues = {
    videoUrl: "",
    coverPicture: "",
    title: "",
    description: "",
    tags: [],
  };

  const validationSchema = Yup.object().shape({
    videoUrl: Yup.string().min(3).required("Informations requise"),
    coverPicture: Yup.string().min(3).required("Informations requise"),
    title: Yup.string().min(3).required("Informations requise"),
    description: Yup.string().min(3).required("Informations requise"),
    tags: Yup.array().required("Choisir au moins une tag"),
  });

  async function onSubmit(values) {
    if (videoId) {
      dispatch(updateVideo(videoId, values));
    } else {
      dispatch(createVideo(values));
    }
  }

  useEffect(async () => {
    const response = await FetchWrapper.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    if (videoId) {
      const response = await FetchWrapper.get(`${GET_VIDEOS}${videoId}`);
      setData(response);
      console.log(response);
    }
  }, [videoId]);

  useEffect(async () => {
    if (video) {
      history.navigate("/videos");
    }
  }, [video]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    isValid,
    isSubmitting,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: data || initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  // const handleCheckboxChange = (e) => {
  //   const { checked, name } = e.target;
  //   if (checked) {
  //     setFieldValue("tags", [...values.tags, name]);
  //   } else {
  //     setFieldValue(
  //       "tags",
  //       values.tags.filter((v) => v !== name)
  //     );
  //   }
  // };

  return (
    <div className="h-screen">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <h1 className="text-3xl">Charger une vidéo</h1>
          </div>
          {error && <p className="my-2 text-sm text-red-500">{error}</p>}
          <div className="py-4">
            <label>Titre</label>
            <input
              className="input"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title ? (
              <span className="text-red-500 text-sm">{errors.title}</span>
            ) : (
              ""
            )}
          </div>
          <div className="py-4">
            <label>Description</label>
            <textarea
              className="input"
              name="description"
              cols="80"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {touched.description && errors.description ? (
              <span className="text-red-500 text-sm">{errors.description}</span>
            ) : (
              ""
            )}
          </div>
          <div className="py-4">
            <label>Image de couverture</label>
            <input
              name="coverPicture"
              className="input"
              type="text"
              value={values.coverPicture}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.coverPicture && errors.coverPicture ? (
              <span className="text-red-500 text-sm">
                {errors.coverPicture}
              </span>
            ) : (
              ""
            )}
            <div>
              <small className="">
                Vous pouvez choisir un lien ou charger une image
              </small>
            </div>
          </div>
          <div className="py-4">
            <label>Video</label>
            <input
              name="videoUrl"
              className="input"
              type="text"
              value={values.videoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.videoUrl && errors.videoUrl ? (
              <span className="text-red-500 text-sm">{errors.videoUrl}</span>
            ) : (
              ""
            )}
            <div>
              <small className="">
                Vous pouvez choisir un lien ou charger une image
              </small>
            </div>
          </div>
          <div className="py-4">
            <label>Selectionner des tags</label>
            <div role="group" aria-labelledby="checkbox-group">
              {categories.map((c) => (
                <div key={c._id}>
                  <input
                    id={c._id}
                    type="checkbox"
                    name="tags"
                    value={c.name}
                    checked={values.tags.includes(c.name)}
                    onChange={handleChange}
                  />
                  <label>{c.name}</label>
                </div>
              ))}
            </div>
            {touched.tags && errors.tags ? (
              <span className="text-red-500 text-sm">{errors.tags}</span>
            ) : (
              ""
            )}
          </div>
          <div className="py-4">
            <button type="submit" className="btn">
              {loading ? (
                <RefreshIcon
                  className="animate-spin h-5 w-5 mr-3 ..."
                  viewBox="0 0 24 24"
                />
              ) : (
                "Enregistrer"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoEditPage;
