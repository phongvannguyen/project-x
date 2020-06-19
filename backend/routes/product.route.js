const express = require("express");
const productRoutes = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image.png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  // fileFilter: fileFilter
});

let Product = require("../models/Product");

// add one product
productRoutes.route("/add").post(upload.array('productImages', 2), function(req, res) {
  const imagePaths = [];
  req.files.forEach((file) => {
    imagePaths.push(file.path.replace('\\', '/')); // Replace all the backward slashes from Window with forward one
  });

  let product = new Product(JSON.parse(req.body.productDTO));
  product.images = imagePaths;

  product
    .save()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(400).send("unable to save to database", err);
    });
});

// get all products
productRoutes.route('/').get(function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.json(products);
    }
  });
});

// get user products
productRoutes.route('/myproducts/:id').get(function (req, res) {
  let myproduct = {
    userId: req.params.id
  };
  Product.find(myproduct, function(err, products) {
    if (!products) {
      res.json([]);
    }
    res.json(products);
  });
});

// get one product
productRoutes.route('/:id').get(function (req, res) {
  Product.findById(req.params.id, function(err, product) {
    res.json(product);
  });
});

// edit one product
productRoutes.route('/edit/:id').post(function (req, res) {
  Product.findById(req.params.id, function(err, product) {
    if (!product) return next(new Error('Could not load Document'));
    else {
      product.productName = req.body.productName;
      product.price = req.body.price;
      product.description = req.body.description;

      product.save().then(product => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
});

// delete one product
productRoutes.route('/delete/:id').get(function (req, res) {
  Product.findOneAndRemove({_id: req.params.id}, function (err, product) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = productRoutes;