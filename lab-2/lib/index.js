// Pour exec l'app : node index.js in terminal
// Pour voir le result : localhost:3000 dans le browser ou curl localhost:3000 in terminal

const express = require('express')

const app = express()
const port = 3000

const content = '<!DOCTYPE html>' +
  '<html>' +
  '    <head>' +
  '        <meta charset="utf-8" />' +
  '        <title>Lab 1 root</title>' +
  '    </head>' +
  '    <body>' +
  '         <p>Page d\'accueil</p>' +
  '         <p>SI / OCRES / hello/usr</p>' +
  '    </body>' +
  '</html>'


app.get('/', (req, res) => {
  res.send(content)
})

app.get('/SI', (req, res) => {
  res.send('Channel SI')
})

app.get('/OCRES', (req, res) => {
  res.send('Channel OCRES')
})

app.get('/hello/:usr', function(req, res) {
  var response = req.params['usr'];

  res.send('Hello ' + response)

})

module.exports = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})
