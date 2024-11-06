const config = require("config");
const axios = require("axios");

const searchItems = async (queryParams) => {
  try {
    const { data } = await axios.get(
      `${config.get("EXTERNAL_API.MELI.baseUrl")}${config.get(
        "EXTERNAL_API.MELI.siteId"
      )}/search`,
      { params: queryParams }
    );
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const getProductById = async (id) => {
  try {
    const { data } = await axios.get(
      `${config.get("EXTERNAL_API.MELI.baseUrl")}/items/${id}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const getProductDescription = async (id) => {
  try {
    const { data } = await axios.get(
      config.get("EXTERNAL_API.MELI.baseUrl") + "/items/" + id + "/description"
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getProductCategoryById = async (id) => {
  try {
    const { data } = await axios.get(
      config.get("EXTERNAL_API.MELI.baseUrl") + "/categories/" + id
    );
    return data?.path_from_root;
  } catch (error) {
    return error;
  }
};

module.exports = {
  searchItems,
  getProductById,
  getProductDescription,
  getProductCategoryById,
};
