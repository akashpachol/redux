import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../feature/auth/authSlice";
import React, { useEffect } from "react";
import { validate } from "../validate";
const initialValues = {
  name: "",
  email: "",
  password: "",
  isAdmin:0
};


const Signup = () => {
  const onSubmit = (values) => {
console.log(values,"123");
    dispatch(register(values));
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values) => validate(values, true),
  });
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="relative w-screen h-screen flex justify-center items-center bg-gradient-to-br from-rose-700 to-indigo-900">
      <div className="absolute lg:w-2/6  md:h-5/6 sm:w-3/6 bg-white rounded-full   shadow-2xl flex items-center flex-col justify-center z-10">
        <div className="mx-auto ">
          <h1 className="text-3xl font-serif text-center">SIGN UP</h1>

          <p className="text-center">add in your account</p>
          <hr className="bg-rose-500 rounded-full h-2 w-48 mx-auto"></hr>
          <div className="mt-5 lg:w-80 sm:w-50">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="mt-2">
                <label htmlFor="username" className="ms-5 ">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border-2 border-gray-500 rounded-full p-3 w-full"
                    placeholder="xxxxxxxx"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500 ms-4">
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="email" className="ms-5 ">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border-2 border-gray-500 rounded-full p-3 w-full"
                    placeholder="you@example.com"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 ms-4">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="password" className="ms-5 ">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="border-2 border-gray-500 rounded-full p-3 w-full"
                    placeholder="you@example.com"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 ms-4">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-rose-500 text-white w-full p-3 rounded-full"
                >
                  SIGN IN
                </button>
              </div>
              <div className="mt-2">
                <p className="text-center">
                  ALREADY HAVE ACCOUNT
                  <a className="text-rose-500" href="/register">
                    SIGN IN
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 h-5/6 w-2/6 relative">
        <div className="lg:w-96 lg:h-96 sm:w-72"></div>
      </div>

      <div className="bg-rose-500 h-5/6 w-2/6 relative">
        <div className="lg:w-96 lg:h-96 sm:w-72"></div>
      </div>
    </div>
  );
};

export default Signup;
