const express = require('express');
const Joi = require('joi');
const app = express();
const uuidv1 = require('uuid/v1');

app.use(express.json());

let carts = [];
let products = [
    {title: "apple", price: 1, inventory_count: 3},
    {title: "orange", price: 2, inventory_count: 5},
    {title: "banana", price: 1.5, inventory_count: 2},
];

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

// PURCHASE PRODUCT
// request body: cart id
app.post('/products/:product/addToCart', (req, res) => {
    // find existing cart or create a new one
    let cart = carts.find(c => c.id === req.body.id);
    if (!cart) {
        cart = setUpCart();
    }
    // find product or return error response
    const productName = req.params.product;
    const product = products.find(p => p.title === productName);
    if (!product) {
        return res.status(404).send("404: Product does not exist");
    }
    if (product.inventory_count === 0){
        return res.status(400).send(`There is not more of this product: ${product.title}`);
    }
    // find product in cart and increment
    // or add product with 1 count
    if (cart.items.find(item => item.title === productName)) {
        const item = cart.items.find(item => item.title === productName);
        if (item.count >= product.inventory_count) {
            return res.status(400).send("400: You cannot add of more this product.");
        }
        item.count++;
        res.send(cart);
    }
    else {
        const item = addToCart(product);
        cart.items.push(item);
        carts.push(cart);
        res.send(cart);
    }
});
// CART INFO
// request body: cart id
app.post('/cart', (req, res) => {
    const cart = carts.find(c => c.id === req.body.id);
    if (!cart) {
        return res.status(404).send("404: Cart does not exist");
    }
    res.send(cart.items);
})

// CART
function setUpCart() {
    const cart = {};
    cart.id = uuidv1();
    cart.items = [];
    return cart;
};

function addToCart(product) {
    let item = {};
    item.title = product.title;
    item.price = product.price;
    item.count = 1;
    return item;
}


// function validateCount(product) {
//     const schema = {
//         inventory_count: Joi.number().required()
//     };
//     return Joi.validate(product, schema);
// }

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));