import { faker } from '@faker-js/faker';

 

const generateFakeProduct = async (req, res, numProducts) => {
    
    try {
        const products = [];

        for (let i = 0; i < numProducts; i++) {
            const product = {
                id: faker.string.uuid(),
                productTitle: faker.commerce.productName(),
                productImage: faker.image.urlPicsumPhotos(), // Generates a random image URL
                productDes: faker.commerce.productDescription(),
                productPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2, symbol: '$' }),
                productRating: faker.number.float({ min: 1, max: 5, precision: 0.1 }) // Rating between 1-5
            };

            products.push(product);
    
        }
       
        res.status(200).json({ products });
        return products;

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export default generateFakeProduct;