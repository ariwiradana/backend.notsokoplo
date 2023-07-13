const Gigs = require("../model/gigs.model");

const getGigs = async (req, res) => {
  try {
    const data = await Gigs.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

const setGigs = async (req, res) => {
  const body = req.body;
  try {
    const newGigs = await Gigs.create(body);
    res.status(200).json(newGigs);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteGigs = async (req, res) => {
  const { _id } = req.params;
  const response = await Gigs.deleteOne({ _id });
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};

module.exports = {
  getGigs,
  deleteGigs,
  updateGigs,
  setGigs,
};
