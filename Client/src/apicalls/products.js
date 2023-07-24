const { axiosInstance } = require("./axiosInstance");

export const addProducts = (payload) => {
  try {
    const response = axiosInstance.post("/api/products/add-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
