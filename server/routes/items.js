var express = require("express");
var router = express.Router();

var items = [
  {
    id: 1,
    itemName: "Bananas",
    description: "Description of Item 1",
    price: 3.99,
    image:
      "https://www.thespruceeats.com/thmb/iuLwY6XcVsDZRTG3Cj3NkhuKERQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vegan-chocolate-peanut-butter-banana-smoothie-1000994-bananas-cropped-e4bdab5174cf461baf30bcdb8193c3e0.jpg",
  },
  {
    id: 2,
    itemName: "Apples",
    description: "Description of Item 2",
    price: 2.99,
    image:
      "https://parade.com/.image/t_share/MTkwNTgxNDY1MzcxMTkxMTY0/different-types-of-apples-jpg.jpg",
  },
];

/* GET the list of items. */
router.get("/", function (req, res, next) {
  return res.send(items);
});

router.post("/", function (req, res, next) {
  if (!req.body.itemName) {
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
  if (!req.body.image) {
    return res.status(400).send({ error: "Image must be provided." });
  }

  const newItem = {
    id: items.length + 1,
    itemName: req.body.itemName,
    description: description,
    price: req.body.price,
    image: req.body.image,
  };
  items.push(newItem);
  return res.send(newItem);
});

router.delete("/:itemName", function (req, res, next) {
  const item = items.find((i) => i.itemName === req.params.itemName);
  if (!item) {
    return res.status(404).send({ error: "Item not found." });
  }
  const index = items.indexOf(item);
  items.splice(index, 1);
  return res.send(item);
});

//Ability to fetch extra information when the item is clicked (not already fetched from server)
router.get("/:itemname", function (req, res, next) {
  const item = items.find((i) => i.itemName === req.params.itemname);
  if (!item) {
    return res.status(404).send({ error: "Item not found." });
  }
  return res.send(item);
});

//Ability to filter on item name when fetching
router.get("/filter/:itemname", function (req, res, next) {
  const item = items.find((i) => i.itemName === req.params.itemname);
  if (!item) {
    return res.status(404).send({ error: "Item not found." });
  }
  return res.send(item);
});

//Ability to sort items by price when fetching all items(ascending)
router.get("/sort/items", function (req, res, next) {
  items.sort((a, b) => a.price - b.price);
  return res.send(items);
});

router.patch("/:itemName", function (req, res, next) {
  if (!req.params.itemName) {
    return res.status(400).send({ error: "Item Name must be provided." });
  }
  if (!req.body.price) {
    return res.status(400).send({ error: "Price must be provided." });
  }
  for (let item of items) {
    if (item.itemName == req.params.itemName) {
      item.price = req.body.price;
      return res.send(item);
    }
  }
  return res.status(404).send({ error: "Item not found." });
});

module.exports = router;
