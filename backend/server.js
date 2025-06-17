const path = require('path');
const express = require('express');
const logger = require('morgan');
const app = express();

require('dotenv').config();

require('./db');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json());

app.use(require('./middleware/checkToken'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/games', require('./routes/games'));
app.use('/api', require('./routes/reviews'));
app.use('/api/rawg', require('./routes/rawg'));
app.use('/api/flags', require('./routes/flags'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));


// Use a "catch-all" route to deliver the frontend's production index.html
app.get('/*splat', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});