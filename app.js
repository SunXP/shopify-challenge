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

app.get('/products', (req, res) => {
    let product_list = [];
    products.forEach(product => {
        if (product.inventory_count > 1){
            product_list.push(product);
        }
    });
    res.send(product_list);
})

app.get('/products/apple', (req, res) => {
    res.send(products[0]);
});

app.get('/products/orange', (req, res) => {
    res.send(products[1]);
});

app.get('/products/banana', (req, res) => {
    res.send(products[2]);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));