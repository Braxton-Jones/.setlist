const express = require('express');
const app = express();
const port = 3001;
const userRoutes = require('./routes/userRoutes.js');
const postRoutes = require('./routes/activtyRoutes.js');


app.use(express.json());
app.use('/users', userRoutes);
app.use('/activity', postRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server is listening on port ${port}! <3`));