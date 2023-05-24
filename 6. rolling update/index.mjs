import express from 'express';
import os from 'os';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const hostname = os.hostname();
  res.send(`NEW IMAGE RELEASED! Hostname: ${hostname}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});