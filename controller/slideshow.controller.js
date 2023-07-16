const Slideshow = require("../model/slideshow.model");

const getSlideshow = async (req, res) => {
  try {
    const data = await Slideshow.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const setSlideshow = async (req, res) => {
  const body = req.body;

  try {
    const newImage = await Slideshow.insertMany(body);
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteSlideshow = async (req, res) => {
  const { _id } = req.params;
  const response = await Slideshow.deleteOne({ _id });
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateSlideshow = async (req, res) => {
  const data = req.body;
  const { _id } = req.params;
  try {
    Slideshow.findOneAndUpdate(
      { _id },
      data,
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
    res.status(500).json(error.message);
  }
};

module.exports = {
  getSlideshow,
  deleteSlideshow,
  updateSlideshow,
  setSlideshow,
};
