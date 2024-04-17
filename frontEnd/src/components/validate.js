// validate.js
export const validate = (values, isSignup = false) => {
  let errors = {};

  if (isSignup && !values.name.trim()) {
    errors.name = "Required";
  } else if (isSignup && !/^[a-zA-Z ]+$/.test(values.name)) {
    console.log("hjhfkjdhfjkh");
    errors.name = "valid name";
  }

  if (!values.email.trim()) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!values.password.trim()) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Minimum 6 characters";
  }

  return errors;
};
export const validate1 = (values, isSignup = false) => {
  let errors = {};

  if (isSignup && !values.name.trim()) {
    errors.name = "Required";
  }

  if (!values.email.trim()) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  return errors;
};
