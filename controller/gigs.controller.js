const Gigs = require("../model/gigs.model");

const getGigs = async (req, res) => {
  const { page, size } = req.query;

  try {
    let data;
    if (page && size) {
      data = await Gigs.find()
        .limit(Number(size))
        .skip(Number(page) * Number(size) - Number(size))
        .sort({ date: 1 });
    } else {
      data = await Gigs.find();
    }
    const response = {
      total: await Gigs.count(),
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

const setGigs = async (req, res) => {
  const body = req.body;
  try {
    const newGigs = await Gigs.create(body);
    res.status(200).json(newGigs);
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

const deleteGigs = async (req, res) => {
  const { _id } = req.params;
  const response = await Gigs.deleteOne({ _id });
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

const updateGigs = async (req, res) => {
  const body = req.body;
  const { _id } = req.params;
  try {
    Gigs.findOneAndUpdate(
      { _id },
      body,
      { new: true, strict: false },
      (err, doc) => {
        if (err) {
          res.status(400).json({ error: true, message: err });
        }
        if (!doc)
          res.status(400).json({
            error: true,
            message: `data with id ${_id} is not found`,
          });
        res.status(200).json(doc);
      }
    );
  } catch (error) {
    if (error.statusCode === 413) {
      res.status(413).json("Request to large");
    } else {
      res.status(error.statusCode).json(error.message);
    }
  }
};

module.exports = {
  getGigs,
  deleteGigs,
  updateGigs,
  setGigs,
};
