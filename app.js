const express = require('express');
const { lookup: dns_lookup } = require('dns');
const { hostname: os_hostname } = require('os');

const app = express();
const PORT = 8080;

app.use(express.static('./public'));

app.listen(PORT, () => {
  dns_lookup(os_hostname(), (_, addr) => {
    console.log(`Server started at http://${addr}:${PORT}`);
  });
});
