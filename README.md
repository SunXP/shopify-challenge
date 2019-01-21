# Shopify Developer Intern Challenge

This is the implementation of a REST API for a fruit shop. It features:

- Querying all products (with or without available inventory)
- Querying one product
- Adding a product to a cart
- Checking the contents of a cart
- Making a purchase

The API was built using Node.js and Express.js

Dummy data was used for the purposes of the demo.

Title | Price | Inventory Count
--- | --- | ---
apple | 1 | 3
orange | 2 | 5
banana | 1.5 | 1

# Setup
Node.js needs to be installed. `v10.14.2` was used.

1. On a command terminal, clone the repo and change to project directory.
2. run `npm install`
3. run `node app.js`

# Documentation

GET `/`

Welcomes users to the fruit store!

---

POST `/products`
Request body: `"flag": true|false`

Takes as argument a boolean flag whether the user wants to return products with available inventory or not.

Returns all the products of the store with all their properties.

---

GET `/products/:product`

Returns the properties of the product specified.
example: `/products/apple`

---

POST `/products/:product/addToCart`
Request body: `"id": UUID GIVEN TO USER`

Adds a product to a user's cart. If a UUID is not provided in the request body, a new one is generated for the user. 

example: `/products/apple/addToCart`

**NOTE FOR DEMO:** Once given an id, pass it in the request body to add more products to the cart, check its contents, or make a purchase.

---

POST `/cart`
Request body: `"id": UUID GIVEN TO USER`

Returns the total and contents of the user's cart.

---

POST `cart/buy`
Request body: `"id": UUID GIVEN TO USER`

Completes a purchase of the contents of the cart and updates the inventory count of the products in the store. After the transaction, the cart's content is deleted.
