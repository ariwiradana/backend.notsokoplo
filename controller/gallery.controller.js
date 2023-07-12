const Gallery = require("../model/gallery.model");

const getGallery = async (req, res) => {
  const { page, size } = req.query;
  try {
    let data;
    let grouped;
    if (page && size) {
      data = await Gallery.find()
        .limit(Number(size))
        .skip(Number(page) * Number(size) - Number(size));
      grouped = await Gallery.aggregate([
        { $group: { _id: "$path", count: { $sum: 1 } } },
      ]);
    } else {
      data = await Gallery.find();
      grouped = await Gallery.aggregate([
        { $group: { _id: "$path", count: { $sum: 1 } } },
      ]);
    }
    const response = {
      total: await Gallery.count(),
      data,
      grouped,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const setGallery = async (req, res) => {
  const { image, date, title } = req.body;

  const path = title.toLowerCase().replaceAll(" ", "-");
  const alt = `alt-${title.toLowerCase().replaceAll(" ", "-")}`;

  try {
    const newImage = await Gallery.create({
      path,
      image,
      alt,
      date,
      title,
    });
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateGallery = async (req, res) => {
  const data = req.body;
  const { path } = req.params;
  try {
    Gallery.findOneAndUpdate(
      { path },
      data,
      { new: true, strict: false },
      (err, doc) => {
        if (err) {
          res.status(400).json({ error: true, message: err });
        }
        if (!doc)
          res.status(400).json({
            error: true,
            message: `data with path ${path} is not found`,
          });

        res.status(200).json(doc);
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getGallery,
  setGallery,
  updateGallery,
};
