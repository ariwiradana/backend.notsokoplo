const routes = (app) => {
  app.use("/api/gallery", require("../routes/gallery.routes"));
};

module.exports = routes;
