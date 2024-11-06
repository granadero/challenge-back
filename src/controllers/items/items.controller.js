const itemsService = require("../../services/items/items.service");

const searchItems = async (req, res, next) => {
  try {
    const serviceResponse = await itemsService.searchItems(req.query);
    res.locals.data = serviceResponse;
    next();
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getItem = async (req, res, next) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
    return;
  }

  try {
    const [product, description] = await Promise.all([
      itemsService.getProductById(id),
      itemsService.getProductDescription(id),
    ]);

    res.locals.data = { item: product, description: description };
    next();
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  searchItems,
  getItem,
};
