const { axiosInstance } = require("./axiosInstance");

export const addProducts = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/products/add-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getProducts = async () => {
    try {
        const response = await axiosInstance.get('/api/products/get-product')
        return response.data
    } catch (error) {
        return error.message;
    }
}
