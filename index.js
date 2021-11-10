const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const cors = require("cors");

//
const port = process.env.PORT || 5000;

// use app
app.use(cors());
app.use(express.json());
//

// connect database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o4xkh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//

async function run() {
  try {
    await client.connect();
    const database = client.db("rentive_car");
    const productsCollection = database.collection("allProducts");
    const reviewCollection = database.collection("review");

    //get
    app.get("/allProducts", async (req, res) => {
      const result = await productsCollection.find({}).limit(6).toArray();
      res.json(result);
    });
    //
    app.get("/carExplore", async (req, res) => {
      const result = await productsCollection.find({}).toArray();
      res.json(result);
    });

    app.get("/allReview", async (req, res) => {
      const review = await reviewCollection.find({}).toArray();
      res.json(review);
    });

    // post review
    app.post("/allReview", async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("Welcome to the Assignment Twelve");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
