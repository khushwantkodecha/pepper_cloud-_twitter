const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes/api');
// const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 7070;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//HTTP request logger(it consoles https requests)
app.use(morgan('tiny'));

// app.use(cors());
app.use('/api', routes);

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
