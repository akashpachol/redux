import React from "react";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const onSubmit = (values) => {
  console.log(values, "jjjjjjj");
};

const validate = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Minimum 6 characters";
  }

  return errors;
};

const Login = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className="relative w-screen h-screen flex justify-center items-center ">
      <div className="absolute lg:w-2/6  md:h-5/6 sm:w-3/6 bg-white rounded-full   shadow-2xl flex items-center flex-col justify-center z-10">
        <div className="mx-auto ">
          <h1 className="text-3xl font-serif text-center">SIGN IN</h1>

          <p className="text-center">sign in your account</p>
          <hr className="bg-rose-500 rounded-full h-2 w-48 mx-auto"></hr>
          <div className="mt-5 lg:w-80 sm:w-50">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="mt-3">
                <label for="email" className="ms-5 ">
                  Email
                </label>
                <div class="mt-2">
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    class="border-2 border-gray-500 rounded-full p-3 w-full"
                    placeholder="you@example.com"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 ms-4">{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-3">
                <label for="password" className="ms-5 ">
                  Password
                </label>
                <div class="mt-2">
                  <input
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    class="border-2 border-gray-500 rounded-full p-3 w-full"
                    placeholder="***********"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 ms-4">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-rose-500 text-white w-full p-3 rounded-full">
                  SIGN IN
                </button>
              </div>
              <div className="mt-3">
                <p className="text-center">
                  DON'T HAVE ACCOUNT
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

export default Login;
