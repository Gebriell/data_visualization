const express = require('express');
const cors = require('cors');

const app = express();

// Add the cors middleware
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({body: "hello world!"});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
