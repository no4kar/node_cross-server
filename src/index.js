import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3001;
const serverUrl = process.env.URL || 'http://ec2-13-53-106-198.eu-north-1.compute.amazonaws.com';

// Enable CORS
app.use(cors());

app.all('*', (req, res) => {
  const url = serverUrl + req.url;

  console.info(url);

  req.pipe(request(url)).pipe(res);
});

const port = 3000; // You can change this port if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
