const Gallery = require("../model/gallery.model");

const getGallery = async (req, res) => {
  const { page, size } = req.query;
  try {
    let data;
    if (page && size) {
      data = await Gallery.find()
        .limit(Number(size))
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
  const { src, date, title } = req.body;

  const path = title.toLowerCase().replaceAll(" ", "-");
  const alt = `alt-${title.toLowerCase().replaceAll(" ", "-")}`;

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
