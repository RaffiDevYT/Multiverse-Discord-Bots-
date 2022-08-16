const app = require('express')();

app.get('/', (req, res) => res.send('Stromz#1662 Sudah Online'));

module.exports = () => {
  app.listen(3000);
}