const routes = (app) => {
  app.use("/api/gallery", require("../routes/gallery.routes"));
  app.use("/api/slideshow", require("../routes/slideshow.routes"));
};

module.exports = routes;
