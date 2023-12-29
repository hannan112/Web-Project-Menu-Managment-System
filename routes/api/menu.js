const express = require("express");
let router = express.Router();
const validatemenu = require("../../middlewares/validatemenu");
const { menu } = require("../../models/menu");
//get menus
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let menus = await menu.find().skip(skipRecords).limit(perPage);
  return res.send(menus);
});
//get single menus
router.get("/:id", async (req, res) => {
  try {
    let menus= await menu.findById(req.params.id);
    if (!menu)
      return res.status(400).send("menu With given ID is not present"); //when id is not present id db
    return res.send(menus); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", validatemenu, async (req, res) => {
  let menus = await menu.findById(req.params.id);
  menu.name = req.body.name;
  menu.price = req.body.price;
  await menu.save();
  return res.send(menus);
});
//update a record
router.delete("/:id", async (req, res) => {
  let menus = await menu.findByIdAndDelete(req.params.id);
  return res.send(menus);
});
//Insert a record
// Insert a record
router.post("/", validatemenu, async (req, res) => {
  let newmenu = new menu();
  newmenu.dishName = req.body.dishName;
  newmenu.price = req.body.price;
 
  await newmenu.save();
  return res.send(newmenu);
});

module.exports = router;
