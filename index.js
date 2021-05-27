const express = require('express'),
PORT = 3000;
const openings = require('./openings.json');
const { random } = require('./utils');
const path = require('path');

const app = express()
app.use(express.json({ limit: "200mb", extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
// app.get('*', (req, res) => )

app.get("/", (req, res) => res.sendFile('index.html'))

app.get("/openings", (req, res) => {
  // const allOpenings = JSON.parse(openings)
  const maxVal = openings.length - 1;
  const index = random(0, maxVal)
  const opening = openings[index]
  return res.json(opening)
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
