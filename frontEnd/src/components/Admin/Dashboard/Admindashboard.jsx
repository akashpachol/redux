import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  adminLogout,
  reset,
  searchUser,
  getAllUsers,
} from "../../../feature/adminAuth/adminAuthSlice";
import { FaSearch } from "react-icons/fa";
import Userlist from "../Userlist/Userlist";

const Admindashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setstate] = useState();
  const onLogout = () => {
    dispatch(adminLogout());
    dispatch(reset());
    navigate("/admin");
  };

  const { admin, users } = useSelector((state) => state.adminAuth);

  const [searchQuery, setsearchQuery] = useState("");
  useEffect(() => {
    if (!admin) {
      navigate("/admin");
    }
    if (searchQuery) {
      dispatch(searchUser(searchQuery));
    } else {
      dispatch(getAllUsers());
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, admin, navigate, searchQuery]);
  const handleSearchchange = (e) => {
    e.preventDefault();
    setsearchQuery(e.target.value);
  };

  const onAddUser = () => {
    navigate("/admin/adduser");
  };

  return (
    <div className="container-1">
      <div className="nav">
        <h3>Admin Dashboard</h3>

        <div style={{ display: "flex" }} className="form-group">
          <input
            style={{ height: "35px" }}
            className="form-control"
            placeholder="username/email"
            type="text"
            value={searchQuery}
            onChange={handleSearchchange}
          />
          <button
            style={{ height: "35px", marginLeft: "10px" }}
            className="btn-1"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      <div className="profile  flex items-center justify-center ">
        <div className="profile-image ">
          <img
            src={
              admin?.image
                ? admin.image
                : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"
            }
            alt="profile"
          />{" "}
        </div>
        <div className="profile-card h-100">
          <div className="profile-info">
            <p>Name : {admin && admin.name}</p>
            <p> Email : {admin && admin.email}</p>
          </div>

          <div className="profile-buttons">
            <button onClick={onAddUser} className="btn-1">
              Add User
            </button>
            <button onClick={onLogout} className="btn">
              logout
            </button>
          </div>
        </div>
      </div>
      <Userlist />
    </div>
  );
};

export default Admindashboard;
