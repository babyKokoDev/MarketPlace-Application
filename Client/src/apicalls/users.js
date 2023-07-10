const { axiosInstance } = require("./axiosInstance");

// Register User
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Login User
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-current-users");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
