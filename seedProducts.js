// backend/seedProducts.js
const axios = require('axios');
const path = require('path');
const { allProducts } = require(path.join(__dirname, './Productsall'));

async function seedProducts() {
  for (const product of allProducts) {
    try {
      // Remove _id if exists (in case you copy from DB)
      if (product._id) delete product._id;

      // ✅ Use localhost instead of 127.0.0.1
      await axios.post('http://localhost:9494/products/addproduct', product);

      console.log('Added:', product.id);
    } catch (err) {
      console.error('Error adding:', product.id, err.response?.data || err.message);
    }
  }
}

seedProducts();
