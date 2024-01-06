const express = require('express');
const app = express();
const port = 3001;
const userActivityRoutes = require('./routes/userActivityRoutes.js');
const playlistRoutes = require('./routes/playlistRoutes.js');
const userRoutes = require('./routes/userRoutes.js');



app.use(express.json());

app.use('/userActivity', userActivityRoutes);
app.use('/playlist', playlistRoutes);
app.use('/user', userRoutes);


app.listen(port, () => console.log(`Server is listening on port ${port}! <3`));
