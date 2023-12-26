const express = require('express');
const app = express();
const port = 3001;
const sequelize = require('./config/sequelize.js');
const {User,  Post, Comment, Like} = require('./models/ModelAssociations.js');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Models synced successfully.');
  })
  .catch((error) => {
    console.error('Error syncing models:', error);
  });

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is listening on port ${port}! <3`));