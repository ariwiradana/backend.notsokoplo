const Gallery = require("../model/gallery.model");

const getGallery = async (req, res) => {
  const { limit, page, size } = req.query;
  try {
    let data;
    if (limit && page && size) {
      data = await Gallery.find()
        .limit(Number(limit))
        .skip(Number(page) * Number(size) - Number(size));
    } else {
      data = await Gallery.find();
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const setGallery = async (req, res) => {
  const { path, src, alt, date, title } = req.body;

  try {
    const newImage = await Gallery.create({ path, src, alt, date, title });
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getGallery,
  setGallery,
};
