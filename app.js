const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const products = [
    {title: "apple", price: 1, inventory_count: 3},
    {title: "orange", price: 2, inventory_count: 5},
    {title: "banana", price: 1.5, inventory_count: 1},
]

app.get('/', (req, res) => {
    res.send("Welcome to the fruit store");
});

// GET ALL PRODUCTS
app.get('/products', (req, res) => {
    let product_list = [];
    products.forEach(product => {
        if (product.inventory_count > 1){
            product_list.push(product);
        }
    });
    res.send(product_list);
})


// GET PRODUCT INFO
app.get('/products/:product', (req, res) => {
    const product = products.find(p => p.title === req.params.product);
    if (!product) {
        return res.status(404).send("404: Product does not exist");
    }
    res.send(product);
});

// PURCHASE PRODUCTS
app.put('/products/:product/buy', (req, res) => {
    const product = products.find(p => p.title === req.params.product);
    if (!product) {
        return res.status(404).send("404: Product does not exist");
    }
    if (product.inventory_count === 0){
        return res.status(400).send(`There is not more of this product: ${product.name}`);
    }
    if (product.inventory_count < req.params.count){
        return res.status(400).send(`There is only ${inventory_count} of this product: ${product.title}`);
    }
    product.inventory_count--
    res.send(product);
});

// function validateCount(product) {
//     const schema = {
//         inventory_count: Joi.number().required()
//     };
//     return Joi.validate(product, schema);
// }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));