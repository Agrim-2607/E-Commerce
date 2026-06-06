const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const hobbiesRoutes = require('./routes/hobbies');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/hobbies', hobbiesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
