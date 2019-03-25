const Router = require('express').Router;
const mongodb = require('mongodb');

const db = require('../db');

const Decimal128 = mongodb.Decimal128;
const ObjectID = mongodb.ObjectID;

const router = Router();


// Get Products
router.get('/', (req, res, next) => {   
  const products = [];
  
  db.getDB().db()
  .collection('products')
  .find()
  .sort({price: -1})
  .forEach(product => {
    product.price = product.price.toString();
    products.push(product);
  }).then(result => {
    res.status(200).json(products);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occured'});
  });
});


// Get product with ID
router.get('/:id', (req, res, next) => {
  db.getDB().db()
  .collection('products')
  .findOne({_id: new ObjectID(req.params.id)})
  .then(product => {
    product.price = product.price.toString();
    res.status(200).json(product);
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occured'});
  });
});


// Add new product
router.post('', (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), 
    image: req.body.image
  };

  db.getDB().db()
  .collection('products')
  .insertOne(newProduct)
  .then(result => { 
    res.status(201).json({ message: 'Product added', productId: result.insertedId });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occured'});
  });
});


// Edit existing product
router.patch('/:id', (req, res, next) => {
  const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: Decimal128.fromString(req.body.price.toString()), 
      image: req.body.image
  };

  db.getDB().db()
  .collection('products')
  .updateOne({_id: new ObjectID(req.params.id)}, {$set: updatedProduct})
  .then(result => { 
    res.status(201).json({ message: 'Product Updated', productId: req.params.id });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occured'});
  });
});


// Delete a product
router.delete('/:id', (req, res, next) => {
  db.getDB().db()
  .collection('products')
  .deleteOne({_id: new ObjectID(req.params.id)})
  .then(result => { 
    res.status(200).json({ message: 'Product Deleted' });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: 'An error occured'});
  });
});

module.exports = router;