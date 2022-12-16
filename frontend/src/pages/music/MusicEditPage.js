import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  GET_CATEGORIES,
  GET_MUSICS,
  UPLOAD_AUDIO,
} from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../core/helpers/FetchWrapper";
import { useDispatch, useSelector } from "react-redux";
import { uploadAudio } from "../../core/redux/upload/UploadActions";
import { createMusic, updateMusic } from "../../core/redux/music/MusicActions";
import { ArrowLeftIcon, RefreshIcon } from "@heroicons/react/outline";
import { history } from "../../core/helpers/history";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const MusicEditPage = () => {
  const dispatch = useDispatch();
  const { loading, error, music } = useSelector((state) => state.createMusic);

  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const musicId = useParams().id;

  const [data, setData] = useState();
  const initialValues = {
    musicUrl: "",
    title: "",
    description: "",
    tags: [],
  };

  const validationSchema = Yup.object().shape({
    musicUrl: Yup.string().min(3).required("Informations requise"),
    title: Yup.string().min(3).required("Informations requise"),
  });

  async function onSubmit(values) {
    if (musicId) {
      dispatch(updateMusic(musicId, values));
    } else {
      dispatch(createMusic(values));
    }
  }

  useEffect(async () => {
    if (musicId) {
      const response = await FetchWrapper.get(`${GET_MUSICS}${musicId}`);
      setData(response);
    }
  }, [musicId]);

  useEffect(async () => {
    if (music) {
      history.navigate("/musics");
    }
  }, [music]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: data || initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handleUploadFile = async (file) => {
    setIsAudioLoading(true);
    const formData = new FormData();
    formData.append("track", file, file.name);
    // dispatch(uploadAudio(formData));
    const response = await FetchWrapper.post(UPLOAD_AUDIO, formData);
    if (response) {
      setFieldValue("title", file.name);
      setFieldValue("musicUrl", response.data);
      setIsAudioLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="py-2 flex items-center justify-between sticky top-0 z-50 bg-white border-b mb-5">
          <Link to="/musics" className="text-2xl">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="py-4">
            <h1 className="text-3xl">Charger un audio</h1>
          </div>
          {error && <p className="my-2 text-sm text-red-500">{error}</p>}
          <div className="border-dotted">
            <p>Selectionner un fichier audio</p>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleUploadFile(e.target.files[0])}
            />
            {isAudioLoading && <>Loading...</>}
          </div>
          <div className="py-4">
            <label>Lien de la musique</label>
            <input
              name="musicUrl"
              className="input"
              type="text"
              value={values.musicUrl}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.musicUrl && errors.musicUrl ? (
              <span className="text-red-500 text-sm">{errors.musicUrl}</span>
            ) : (
              ""
            )}
            <div>
              <small className="">
                Vous pouvez choisir un lien pour la musique ou charger
              </small>
            </div>
          </div>
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

export default MusicEditPage;
