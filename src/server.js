
const express = require('express');
const cors = require('cors');
const router = require('./router');
const { PORT = 3001 } = process.env;

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
// Using CORS for when server and app are served on different ports
app.use('/api', cors(), router);

// Serve app production bundle
app.use(express.static('dist/app'));

// Listen the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
