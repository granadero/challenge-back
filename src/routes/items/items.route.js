const express = require("express");
const itemController = require("../../controllers/items/items.controller");
const authorMiddleware = require("../../middlewares/author.middleware");
const {
  mappingItem,
  mappingSearch,
} = require("../../middlewares/response.middleware");

const router = express.Router();

router
  .get("/", itemController.searchItems, authorMiddleware, mappingSearch)
  .get("/:id", itemController.getItem, authorMiddleware, mappingItem);

module.exports = router;
