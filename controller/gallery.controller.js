const Gallery = require("../model/gallery.model");
const GalleryThumbnail = require("../model/gallery.thumbnail.model");

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
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
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
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const getGalleryThumbnail = async (req, res) => {
  const { page, size } = req.query;

  try {
    let data;
    if (page && size) {
      data = await GalleryThumbnail.find()
        .limit(Number(size))
        .skip(Number(page) * Number(size) - Number(size))
        .sort({ date: -1 });
    } else {
      data = await GalleryThumbnail.find().sort({ date: -1 });
    }
    const response = {
      total: await GalleryThumbnail.count(),
      data,
    };
    res.status(200).json(response);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const deleteGallery = async (req, res) => {
  const { path } = req.params;
  const responseData = await Gallery.deleteMany({ path });
  const responseThumbnail = await GalleryThumbnail.deleteMany({ path });

  const response = {
    gallery: responseData,
    thumbnail: responseThumbnail,
  };
  try {
    res.status(200).json(response);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
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
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const setGalleryThumbnail = async (req, res) => {
  const { image, date, title } = req.body;

  const path = title?.toLowerCase().replace(/[^a-z0-9]/gi, "");
  const alt = `alt-${title?.toLowerCase().replace(/[^a-z0-9]/gi, "")}`;

  try {
    const newImage = await GalleryThumbnail.create({
      path,
      image,
      alt,
      date,
      title,
    });
    res.status(200).json(newImage);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const setGalleryMulti = async (req, res) => {
  const body = req.body;

  try {
    const newImage = await Gallery.insertMany(body);
    res.status(200).json(newImage);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const updateGalleryThumbnail = async (req, res) => {
  const data = req.body;
  const { path } = req.params;
  try {
    const result = await GalleryThumbnail.updateOne({ path }, { $set: data });
    res.status(200).json(result);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const updateGallery = async (req, res) => {
  const data = req.body;
  const { path } = req.params;
  try {
    const result = await Gallery.updateOne({ path }, { $set: data });
    res.status(200).json(result);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

module.exports = {
  getGallery,
  getGalleryPath,
  setGallery,
  updateGallery,
  deleteGallery,
  setGalleryMulti,
  setGalleryThumbnail,
  getGalleryThumbnail,
  updateGalleryThumbnail,
};
