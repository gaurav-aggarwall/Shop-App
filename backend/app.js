const path = require('path');

const express = require('express');
const parser = require('body-parser');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const db = require('./db');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(parser.json());

app.use('/images', express.static(path.join('backend/images')));

// Set CORS headers so that the React SPA is able to communicate with this server
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


db.initDB( (err, db) => {
  if(err){
    console.log(err);
  } else {
    app.listen(3100, () => console.log('Server stared on 3100 Port'));
  }
})

