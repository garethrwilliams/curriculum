const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://pokeapi.co/api/v2/pokemon/').then( (response) => {
    return response.json()
}).then( (data) => {
    //console.log(data)
    const fetchImage = data.results.map( (pokemon) => {
        return fetch(pokemon.url).then( (pokeResult) => {
            return pokeResult.json()
        })
    })
    return Promise.all(fetchImage)
}).then( (dataList) => {
    const pokeList = [];
    dataList.forEach ( (pokemon) => {
        const pokemonName = pokemon.name
        const pokemonImage = pokemon.sprites.front_default
        pokeList.push({
            name: pokemonName,
            img: pokemonImage
        })
    })
    const htmlStr = pokeList.reduce( (acc, e) => {
        console.log(e.img)
        return `${acc}<div><p>${e.name}</p><img src="${e.img}"/></div>`;
    }, ``)
    fs.writeFile('9.html', htmlStr, ()=>{''})
})
