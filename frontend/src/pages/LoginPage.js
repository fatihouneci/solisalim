import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { history } from "../core/helpers/history";
import { useFormik } from "formik";
import { login } from "../core/redux/auth/authActions";
import { RefreshIcon } from "@heroicons/react/outline";

const LoginPage = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
  const { loading, error, user } = authUser;

  const initialValues = {
    email: "",
    password: "",
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("L'identifiant est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });

  async function onSubmit(values) {
    login(dispatch, values);
  }

  useEffect(() => {
    if (user) {
      history.navigate("/");
    }
  }, [user]);

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
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <h1 className="text-2xl">Se connecter</h1>
        {error && <p className="my-2 text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>Email adresse ou Numéro de téléphone</label>
            <input
              className="input"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email ? (
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
            {touched.password && errors.password ? (
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
                "Se connecter"
              )}
            </button>
          </div>
        </form>
        <div className="my-4 text-sm font-medium text-green-600 hover:text-green-500">
          <Link to="/auth/register">Pas de compte ?</Link>
        </div>
        <div className="my-4 text-sm font-medium text-green-600 hover:text-green-500">
          <Link to="/forgotpass">Mot de passe oublier ?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
