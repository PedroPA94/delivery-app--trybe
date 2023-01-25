const path = require("path");

const getImage = async (req, res) => {
  const { filename } = req.params;
  const absolutePath = path.resolve(`images/${filename}`);
  res.status(200).sendFile(absolutePath);
}

module.exports = {
  getImage
}