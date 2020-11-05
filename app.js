const express = require('express');
const multer = require('multer');

const { lookup: dns_lookup } = require('dns');
const { hostname: os_hostname } = require('os');

const app = express();
const PORT = 8080;

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (_, file, cb) => {
      const timeStamp = new Date().getTime();
      cb(null, timeStamp + '-' + file.originalname);
    },
  }),
});

app.use(express.static('./public'));

app.post('/upload', upload.any(), (req, res) => {
  res.redirect('/?uploaded');
});

app.listen(PORT, () => {
  dns_lookup(os_hostname(), (_, addr) => {
    console.log(`Server started at http://${addr}:${PORT}`);
  });
});
