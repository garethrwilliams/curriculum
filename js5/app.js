const express = require('express')
const app = express()
const challenge1 = require('./challenge1.js')



app.use('/', challenge1)


app.use(express.static('public'))
app.get('/challenge1', (req, res) => {
    const JSONObject = JSON.stringify(challenge1)
    res.send(JSONObject);
});



app.listen(process.env.PORT || 3000, () => console.log("app listening: 300"));
