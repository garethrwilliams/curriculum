const express = require('express')
const app = express()
const challenge1 = require('./challenge1.js')

app.use('/', challenge1)


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.send('hello');
});



app.listen(process.env.PORT || 3000, () => console.log("app listening: 3000"));
