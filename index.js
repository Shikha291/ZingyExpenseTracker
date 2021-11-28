const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors')
const app = express();
const port = 5000;
const auth = require('./routes/auth');
const expenses = require('./routes/expenses')

app.use(express.json());
app.use(cors());
connectToMongo();

app.use('/api/auth', auth);
app.use('/api/expenses', expenses);

app.listen(port, () => {console.log(`Connected to port ${port}`);})