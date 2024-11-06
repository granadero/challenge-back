const config = require("config");

module.exports = (req, res, next) => {
  // Solo añade el autor si hay datos en res.locals
  if (res.locals.data) {
    res.locals.data = {
      author: {
        name: config.get("AUTHOR.name"),
        lastName: config.get("AUTHOR.lastName"),
      },
      ...res.locals.data,
    };
  }
  next();
};
