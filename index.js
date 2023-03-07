
import express from 'express';
import cors_proxy from 'cors-anywhere';
import items from './items.js'

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

const filterProductsByText = (text) => {
  const filterCondition = (item) => item.category.toLowerCase() === text.toLowerCase() || item.name.toLowerCase() === text.toLowerCase(); 

  return items.filter(item => {
    if(filterCondition(item)) {
      return item;
    }
  })
}

app.get('/filtered_items', (req, res) => {
  const text = req.query.text;
  res.send({ filteredItems:  filterProductsByText(text)});
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту...`);
});