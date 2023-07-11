const Hello = require("../model/hello.model");

const getHello = async (req, res) => {
  try {
    const data = await Hello.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getHello,
};
