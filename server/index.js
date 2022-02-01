const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors');
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json());
app.use(cors());


app.listen(port, () => { console.log(`listening on port ${port}`) });