const name = "AA";
const car = {
  brand: "Tesla",
  color: "red",
};

exports.name = "colorful";

exports.getColor = function () {
  return car.color;
};

exports.setColor = function (color) {
  if (color == "Yellow" || color == "Pink") {
    car.color = color;
  }
  // TODO: 不符合的，不給改
};
