const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open',() =>{
    console.log('MongoDB was successfully connected');
});

const CreditRouter = require('./routes/credit')
const DebitRouter = require('./routes/debit')
const SubscriptionRouter = require('./routes/subscription')
const SavingRouter = require('./routes/saving')
const ProductRouter = require('./routes/product')

app.use('/credit',CreditRouter);
app.use('/debit',DebitRouter);
app.use('/subs',SubscriptionRouter);
app.use('/saving',SavingRouter);
app.use('/product',ProductRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`);
});