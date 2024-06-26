import axios from "axios";
import history from "../history";

const mainUrl = import.meta.env.VITE_APP_API_URL;

const api = async (endpoint, data = {}, type) => {
  const user = JSON.parse(localStorage.getItem("_session"));
  const token = user?.token || "";
  const url = mainUrl + endpoint;

  const headers = {
    "Content-Type":
      type === "postFile" ? "multipart/form-data" : "application/json",
    ...(token && { "x-auth": token }),
  };

  try {
    const response = await axios({
      data,
      method: type === "postWithoutToken" ? "post" : type,
      headers,
      url,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (
        error.response.status === 400 ||
        [401, 403, 503].includes(error.response.status)
      ) {
        if ([401, 403, 503].includes(error.response.status)) {
          localStorage.removeItem("user");
          if (typeof window !== "undefined") {
            history.push("/");
          }
        }
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({
          error: "Something went wrong. Please try again.",
        });
      }
    } else {
      return Promise.reject({
        error: "Network error. Please check your internet connection.",
      });
    }
  }
};

export const checkData = (data) => {
  return true; // You can customize this function as needed
};

export { api };
