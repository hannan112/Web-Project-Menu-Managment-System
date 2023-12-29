var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var menuSchema = mongoose.Schema({
  dishName: String,
  price:Number
});
var menu = mongoose.model("menu", menuSchema);

function validatemenu(data) {
  const schema = Joi.object({
    dishName: Joi.string().min(3).max(10).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.menu = menu;
module.exports.validate = validatemenu;
