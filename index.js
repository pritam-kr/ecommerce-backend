
import express from 'express';
import generateFakeProduct from './backend/faker/index.js';
import connectDB from './backend/config/index.js';
import { Product, Store } from './backend/schema/products.js';
 
const app = express();
const PORT = 4000;

connectDB()

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.get('/api/generate-fake-product', async (req, res) => {
const data = await generateFakeProduct(req, res, 20);
Product.insertMany(data)
})


app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
})





app.listen(PORT, () => {
    console.log('Server is running on port ' + 'http://localhost:' + PORT);
})