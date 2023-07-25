var express = require("express");
const { connect } = require("http2");
var router = express.Router();
const { MongoClient } = require("mongodb");
var url = "mongodb+srv://m001-student:m001-mongodb-basics@cluster0.ywcljgf.mongodb.net/?retryWrites=true&w=majority";
var client = new MongoClient(url);
const dbName = "inventory";
const collectionName = "inventory_items";

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}


/* GET the list of items. */
router.get("/", async function (req, res, next) {
  try {
    const items = await retrieveAllDocuments();
    console.log("Retrieved Documents:");
    console.log(items);
    return res.send(items);
  } catch (error) {
    console.error("Error retrieving documents", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
 
async function retrieveAllDocuments() {
  try {
    await connectToMongo();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const items = await collection.find().toArray();
    return items;
  } catch (error) {
    console.error("Error retrieving documents", error);
    throw error;
  }
}

async function addNewDocument(newItem) {
  try {
    await connectToMongo();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertOne(newItem);
    return result.insertedId;
  } catch (error) {
    console.error("Error adding item to collection", error);
    throw error;
  }
}



router.post("/", function (req, res, next) {
  if (!req.body.name) {
    return res.status(400).send({ error: "Item Name must be provided." });
  }
  description = null;
  if (!req.body.description) {
    description = "";
  } else {
    description = req.body.description;
  }

  if (!req.body.price) {
    return res.status(400).send({ error: "Price must be provided." });
  }
  if (!req.body.quantity){
    return res.status(400).send({ error: "Quantity must be provided." });
 }  
 if (!req.body.image_url) {
    return res.status(400).send({ error: "Image must be provided." });
  }
  if(!req.body.supplier) {
    return res.status(400).send({ error: "Supplier must be provided." });
  }

  const newItem = {
    name: req.body.name,
    description: description,
    price: req.body.price,
    quantity: req.body.quantity,
    supplier: req.body.supplier,
    image_url: req.body.image_url,
  };
  addNewDocument(newItem);
  return res.send(newItem);
});

router.delete("/:name", async function (req, res, next) {
  try {
    console.log("whyyy");
    const deletedQuestion = await deleteDocument(req.params.name);
    if (!deletedQuestion) {
      console.log("what");
      return res.status(404).send("Question not found");
    }
    return res.send({ message: "Question deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("An error occurred");
  }
});

async function deleteDocument(name) {
  try {
    await connectToMongo();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    console.log(name);
    name = name.trim();
    const result = await collection.deleteOne({ name: name });
    console.log("WHATTT");
    console.log(result.deletedCount);
    return result.deletedCount;
  } catch (error) {
    console.error("Error deleting item from collection", error);
    throw error;
  }
}


router.patch("/:name", async function (req, res, next) {
  if (!req.body.price) {
    return res.status(400).send({ error: "Price must be provided." });
  }
  try {
    const result = await updateDocument(req.params.name, req.body.price);
    if (result === 0) {
      return res.status(404).send({ error: "Item not found." });
    }
    return res.send({ success: true });
  } catch (error) {
    console.error("Err");
}}
);

async function updateDocument( name, price) {
  try {
    await connectToMongo();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.updateOne(
      { name: name },
      { $set: { price: price } }
    );
    return result.modifiedCount;
  } catch (error) {
    console.error("Error updating item", error);
    throw error;
  }
}


router.get("/:name", async function (req, res, next) {
  try {
    const result = await filterItem(req.params.name);
    if (result === 0) {
      return res.status(404).send({ error: "Item not found." });
    }
    return res.send(result);
  } catch (error) {
    console.error("Error updating item", error);
    throw error;
  }
});

async function filterItem( name) {
  try {
    await connectToMongo();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.find({ name: name });
    return result;
  } catch (error) {
    console.error("Error updating item", error);
    throw error;
  }
}


module.exports = router;
