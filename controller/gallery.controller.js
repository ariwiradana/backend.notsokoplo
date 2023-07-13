const Gallery = require("../model/gallery.model");

const getGallery = async (req, res) => {
  const { page, size } = req.query;

  try {
    let data;
    if (page && size) {
      data = await Gallery.aggregate([
        {
          $group: {
            _id: "$path",
            data: { $first: "$$ROOT" },
            total: {
              $sum: 1,
            },
          },
        },
        { $limit: Number(size) },
        // { $skip: Number(page) * Number(size) - Number(size) },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
    } else {
      data = await Gallery.aggregate([
        {
          $group: {
            _id: "$path",
            data: { $first: "$$ROOT" },
            total: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
    }
    const total = await Gallery.distinct("path");
    const response = {
      total: total?.length,
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getGalleryPath = async (req, res) => {
  const { path } = req.params;
  const { page, size } = req.query;

  try {
    let data;
    if (page && size) {
      data = await Gallery.find({ path })
        .limit(Number(size))
        .skip(Number(page) * Number(size) - Number(size));
    } else {
      data = await Gallery.find({ path });
    }
    const response = {
      total: await Gallery.count({ path }),
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteGallery = async (req, res) => {
  const { path } = req.params;
  const response = await Gallery.deleteMany({ path });
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const setGallery = async (req, res) => {
  const { image, date, title } = req.body;

  const path = title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const alt = `alt-${title?.toLowerCase().replace(/[^a-z0-9]/gi, "")}`;

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

const setGalleryMulti = async (req, res) => {
  const body = req.body;

  try {
    const newImage = await Gallery.insertMany(body);
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
  getGalleryPath,
  setGallery,
  updateGallery,
  deleteGallery,
  setGalleryMulti,
};
