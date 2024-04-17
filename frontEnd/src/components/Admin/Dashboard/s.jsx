import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  adminLogout,
  loadDashBoard,
  reset,
  setAdmin,
} from "../../../feature/adminAuth/adminAuthSlice";

const Admindashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate("/admin");
  };
  const { admin } = useSelector((state) => state.adminAuth);
  console.log(admin, "kkkk");
  useEffect(() => {
    let getAdmin = localStorage.getItem("admin");
    const Admin = JSON.parse(getAdmin);
    dispatch(setAdmin(Admin));

    dispatch(loadDashBoard());
  }, [dispatch]);

  return (
    <div className="container-1">
      hellooooooooooooo
      <button onClick={onLogout} className="btn">
        logout
      </button>
      <p>{admin}</p>
    </div>
  );
};

export default Admindashboard;
