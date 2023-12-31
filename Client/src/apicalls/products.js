const { axiosInstance } = require("./axiosInstance");

export const addProducts = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getProducts = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/get-product",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProducts = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get a product by id
export const GetProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/products/get-product-by-id/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Upload Product Image
export const uploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/upload-image-to-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Update Product Status from admin
export const updateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Place a new Bid
export const PlaceNewBid = async (payload) => {
  try {
    const response = await axiosInstance.post('/api/bids/place-new-bid', payload)
    return response.data
  } catch (error) {
    return error.message;
  }
}

// Get all bids
export const GetAllBids = async (filters) => {
    try {
      const response = await axiosInstance.post('/api/bids/get-all-bids', filters);
      return response.data
    } catch (error) {
      return error.message;
    }
}