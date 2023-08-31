const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Running in port ${PORT}`));

app.use(express.json());
app.use(cors());

module.exports = app;