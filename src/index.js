const express = require("express");
const config = require("config");
const app = express();
const morgan = require("morgan");
const itemsRoute = require("./routes/items/items.route");

const port = config.get("port");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use("/api/items", itemsRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
