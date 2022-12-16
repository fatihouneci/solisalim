import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { history } from "../core/helpers/history";
import { useFormik } from "formik";
import { register } from "../core/redux/auth/authActions";
import { RefreshIcon } from "@heroicons/react/outline";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.registerUser);
  const { loading, error, user } = authUser;

  const initialValues = {
    firstName: "",
    lastName: "",
    code: "+225",
    telephone: "",
    email: "",
    password: "",
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Champs requis"),
    lastName: Yup.string().required("Champs requis"),
    telephone: Yup.string().required("Champs requis"),
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("Champs requis"),
    password: Yup.string().required("Champs requis"),
  });

  async function onSubmit(values) {
    register(dispatch, values);
  }

  useEffect(() => {
    if (user) {
      history.navigate("/login");
    }
  }, [user]);

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <h1 className="text-2xl">S'enregistrer</h1>
        {error && <p className="my-2 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>Nom</label>
            <input
              className="input"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.firstName || errors.firstName ? (
              <span className="text-red-500 text-sm">{errors.firstName}</span>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label>Prénoms</label>
            <input
              className="input"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.lastName || errors.lastName ? (
              <span className="text-red-500 text-sm">{errors.lastName}</span>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <label>Numéro de téléphone</label>
            <input
              className="input"
              type="text"
              name="telephone"
              value={values.telephone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.telephone || errors.telephone ? (
              <span className="text-red-500 text-sm">{errors.telephone}</span>
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
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email || errors.email ? (
              <span className="text-red-500 text-sm">{errors.email}</span>
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
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password || errors.password ? (
              <span className="text-red-500 text-sm">{errors.password}</span>
            ) : (
              ""
            )}
          </div>
          <div className="my-2">
            <button className="btn" type="submit">
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
        <div className="my-4 text-sm font-medium text-green-600 hover:text-green-500">
          <Link to="/auth/login">Déjà un compte ?</Link>
        </div>
        <div className="my-4 text-sm font-medium text-green-600 hover:text-green-500">
          <Link to="/forgotpass">Mot de passe oublier ?</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
