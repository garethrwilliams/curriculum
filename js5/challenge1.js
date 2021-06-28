//Please use garethrwilliams.freedomains.dev to test


const express = require('express')
const router = express.Router()
const cors = require('cors')
const fetch = require('node-fetch')
const fs = require('fs')
//router.use(cors())
let locationData = {}
let stats = {}

fs.readFile(__dirname + '/stats.db', (err, db) => {
    if (err) {
        console.log("error thrown") 
        fs.writeFile(__dirname + '/stats.db', JSON.stringify(stats), () => {})
    }
    try {
        stats = JSON.parse(db)
    } catch (err) { }
})



const updateStats = (address) => {
    const cityInfo = stats[address.cityStr] || {}
    const llKey = JSON.stringify(address.ll)
    cityInfo[llKey] = (cityInfo[llKey] || 0) + 1
    stats[address.cityStr] = cityInfo
    fs.writeFile(__dirname + '/stats.db', JSON.stringify(stats), () => { })

}

const getHTML = (address) => {
    const locationStr = Object.keys(stats).reduce((acc, cityStr) => {
        const locationMap = stats[cityStr]
        const count = Object.values(locationMap)
        return acc + `
        <a href="/visitors/city/${cityStr}"> 
        <h2>${cityStr.split(',').shift().trim()} - ${count}</h2>
        </a>
        `

    }, '')

    const localMap = stats[address.cityStr] || {}
    const locations = Object.keys(localMap).reduce((acc, latLongString) => {
        const locationArray = JSON.parse(latLongString)
        const count = Object.values(localMap).reduce((acc, i) => acc + i)
        return acc + `
        new google.maps.Marker({
            position: { lat: ${locationArray[0]}, lng:${locationArray[1]} },
            map: map,
            title: '${localMap[latLongString]} hits'
        })
        `

    }, '')

    const script = 

    `
    function myMap() {
        const mapProp= {
            center: new google.maps.LatLng(${address.ll[0]}, ${address.ll[1]}),
            zoom: 11,
            };
        const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

            ${locations}
        }
        `

    return `
        <h1>You are visiting from ${address.cityStr}</h1>
        <div id="googleMap" style="width:100%;height:500px;"></div>
        <h1>The cities our visitors come from</h1>
        <div style="max-height: 300px; overflow: auto;">
        ${locationStr}
        </div>
        
        
        
        
        <script>${script}</script>
        

        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB29pGpCzE_JGIEMLu1SGIqwoIbc0sHFHo&callback=myMap"></script>
    
        
        `

}

router.use(async (req, res, next) => {
    console.log('middleware')
    let ipString = req.headers['x-forwarded-for'] || '::ffff:192.17.18.164'
    let ipAddress = ipString.split(':').pop().trim()
    let address = locationData[ipAddress]

    if (address) {
        updateStats(address)
        req.address = address
        return next()
    }
    address = await fetch(`https://js5.c0d3.com/location/api/ip/${ipAddress}`).then(r => r.json())
    updateStats(address)
    locationData[ipAddress] = address
    req.address = address
    return next()
})

router.get('/visitors/', async (req, res, next) => {

    const HTMLString = getHTML(req.address)
    res.send(HTMLString)



})

router.get('/api/visitors', (req, res) => {
    res.json(stats)
})


router.get('/visitors/city/:location', (req, res) => {
    req.address.cityStr = req.params.location
    req.address.ll = JSON.parse(Object.keys(stats[req.params.location]))
    const HTMLString = getHTML(req.address)
    res.send(HTMLString)
}) 




module.exports = router