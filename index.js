// this small project allow me to read csv files and interact with it
// documentation: https://nodejs.org/api/fs.html#fscreatereadstreampath-options

const { parse } = require('csv-parse')
// Node files system module  
const fs = require('fs')

const habitablePlanets = []

// function that parse all the habitable planets
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6
}
// reading my csv file with fs.createReadStream() method and csv parse
fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            habitablePlanets.push(data) // when event is emitted push data in the array
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        // return only the name of the planet
        console.log(habitablePlanets.map((planet) => {
            return planet['kepler_name']
        }))

        //number of planet found
        console.log(`${habitablePlanets.length} habitable planets found!`)
        console.log('done')
        // console.log(habitablePlanets); //planet complete info
    });