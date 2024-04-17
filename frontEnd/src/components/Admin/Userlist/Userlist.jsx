import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  editUser,
  getAllUsers,
  reset,
  UserBlock,
} from "../../../feature/adminAuth/adminAuthSlice";

import { useFormik } from "formik";
import { validate1 } from "../../validate";

const initialValues = {
  name: "",
  email: "",
  userI: "",
};

function Userlist() {
  const onSubmit = (values) => {
    console.log(values, "123");
    dispatch(editUser(values));
    setShowModal(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values) => validate1(values, true),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const users = useSelector((state) => state.adminAuth.users);
  const isLoading = useSelector((state) => state.adminAuth.isLoading);

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleBlock = (userId, block) => {
    if (
      window.confirm(
        `Are you sure want to ${block ? " Block" : "Unblock"} the user?`
      )
    ) {
      dispatch(UserBlock(userId));
    }
  };

  const handleEdit = (userId, name, email) => {
    const userToEdit = users.find((user) => user._id === userId);
    console.log(userToEdit, "akkakak");
    formik.setValues({
      name: userToEdit.name,
      email: userToEdit.email,
      userId: userToEdit._id,
    });

    // Show the modal
    setShowModal(true);
  };

  return (
    <div className="user-list">
      {isLoading && <p>Loading...</p>}
      {users && users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {/* <img src={`user_photo${index + 1}.jpg`} alt="User Photo" /> */}
                  <img
                    src={
                      user?.profileUrl
                        ? user.profileUrl
                        : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
                    }
                    alt="profile"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.is_blocked ? " Unblocked" : "Blocked"}</td>
                <td className="action-buttons">
                  <div className="table-button">
                    <button
                      onClick={() => handleBlock(user._id, user.is_blocked)}
                      className="btn"
                    >
                      {user.is_blocked ? " Block" : "Unblock"}
                    </button>
                    <button
                      onClick={() =>
                        handleEdit(user._id, user.name, user.email)
                      }
                      className="btn-1"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Edit</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your name"
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 ms-4">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Enter your email"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 ms-4">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Userlist;
