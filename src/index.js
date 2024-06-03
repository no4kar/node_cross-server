import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3001;
const serverUrl = process.env.URL || 'http://ec2-13-53-106-198.eu-north-1.compute.amazonaws.com';

// Enable CORS
app.use(cors());

// Use express.json() and express.urlencoded() to handle request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', (req, res) => {
  const url = serverUrl + req.url;
  console.info(`Forwarding ${req.method} request to: ${url}`);

  const options = {
    url: url,
    headers: req.headers,
    method: req.method,
    json: true,
    body: req.body,
  };

  req.pipe(request(options)).pipe(res);
});

const port = 3000; // You can change this port if needed
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
