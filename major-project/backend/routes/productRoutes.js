const express = require("express");
const router = express.Router();
const {getDishes}=require("../controllers/dishesController");
// const{
//   getProducts
// }= require("../controllers/dishesController");

router.get("/products",getDishes);

module.exports= router;