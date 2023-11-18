const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const transactionsRoutes = require('./routes/transactionsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/transactions', transactionsRoutes);
app.use('/api/categories', categoriesRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
