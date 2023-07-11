const routes = (app) => {
  app.use("/api/gallery", require("../routes/gallery.routes"));
  app.use("/api/hello", require("../routes/hello.routes"));
};

module.exports = routes;
