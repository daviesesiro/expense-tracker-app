import Axios from "axios";

export const axiosClient = Axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:9000"
      : process.env.REACT_APP_API_URL,
});

export const authHeader = {
  authorization: `Bearer ${localStorage.getItem("token")}`,
};
