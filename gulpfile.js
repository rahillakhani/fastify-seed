const del = require("del");
const { series } = require("gulp");

// Makes sure to delete 'dist' folder if it exists
const clean = async cb => {
  await del("./dist");
  cb();
};

exports.default = series(clean)