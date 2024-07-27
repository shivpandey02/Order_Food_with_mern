const express = require("express");

// const { getDishes } = require("./controllers/dishesController");
const cors=require("cors");
const dishesRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const mongoose = require("mongoose");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://shivp4uu:eIdxri5M1jm4M3Tv@cluster0.uvfpjyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected!"));

  app.get("/", (req, res) => {
    res.send("hello world!");
  });

// console.log("hello");

// middleware

app.use((req, res, next) =>{
  console.log("Time:",Date.now());
  next();
});

app.use("/api",dishesRouter);
app.use("/api",userRouter);



// app.get("/api/foods", getDishes);

// app.post("/api/user/register", (req, res) => {
//   console.log(req.body);
//   res.send("Hello word!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
