
import express from 'express';
import cors_proxy from 'cors-anywhere';

const HOST = '0.0.0.0';
const CORS_PORT = 8080;
const PORT = 3000;
const app = express();

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(CORS_PORT, HOST, function() {
  console.log('Running CORS Anywhere on ' + HOST + ':' + CORS_PORT);
});



app.post('/', (req, res) => {
  
  res.send({ message: 'Hello World'});
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту...`);
});