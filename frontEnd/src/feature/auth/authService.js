import axios from "axios";

const API_URL = "http://localhost:8000/";

// Register user

const register = async (userData) => {
  console.log(userData, "lk");

  const response = await axios.post(API_URL + "register", userData);
  console.log(response.data, "akash");
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
// Login user
const login = async (userData) => {
  console.log("kkkkkkkk");
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const editUserDeatils = async (token,userId, name, email, image) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + userId, {
    userId,
    name,
    email,
    image,
  },config);
  if (response.data) {
    console.log(response.data, "jjj");
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};
const authService = {
  register,
  login,
  logout,
  editUserDeatils,
};

export default authService;
