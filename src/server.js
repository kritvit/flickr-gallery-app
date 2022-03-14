
const express = require('express');
const routes = require('./routes');
const timeout = require('express-timeout-handler');

const { API_PORT = 3001 } = process.env;

const app = express();

// The default timeout for all routes
app.use(timeout.handler({
  timeout: 10 * 1000 // Seconds
}));

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// Serve API requests from the router
app.use('/api', routes);

// Serve app production bundle
app.use(express.static('dist/app'));

// Listen the server
app.listen(API_PORT, () => {
  console.log(`Server listening at http://localhost:${API_PORT}`);
});
