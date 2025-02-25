import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  productDes: { type: String, required: true },
  productPrice: { type: String, required: true },
  productRating: { type: Number, required: true },
});

// Define a schema that stores an array of product objects
const storeSchema = new mongoose.Schema({
    storeName: { type: String, required: true },
    products: [productSchema], // This will store an array of product objects
  });
  
  // Create a model for the Store collection
  const Store = mongoose.model('Store', storeSchema);

// Create a model for the Product collection
const Product = mongoose.model('Product', productSchema);

export  {Product, Store};
