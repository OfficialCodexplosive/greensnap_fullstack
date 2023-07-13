const turf = require("@turf/turf");
const shp = require('shpjs');
const fs = require('fs');
resolve = require('path').resolve;

const shapefilePath = resolve('storage/VG250_KRS.zip');
const shapefileData = fs.readFileSync(shapefilePath);

function getMunicipalityByCoordinates(lat, lon)
{
    return new Promise((resolve, reject) => {
    shp(shapefileData)
        .then((data) => {
            let municipality = null;
            for (const feature of data.features) {
                if (feature.geometry.type === 'Polygon') 
                {
                    const municipalityPolygon = turf.polygon(feature.geometry.coordinates);
                    if (turf.booleanPointInPolygon([lon, lat], municipalityPolygon)) 
                    {
                        municipality = feature;
                        break; // Exit the loop if a match is found
                    }
                }
            }
            if (municipality != null)
            {
                let municipalityDict = {
                    "id" : municipality.properties.OBJID,
                    "verwaltungseinheit" : municipality.properties.BEZ,
                    "geo_name" : municipality.properties.GEN,
                }

                resolve(JSON.stringify(municipalityDict));
            }else{
                resolve(null);
            }
        })
        .catch((err) => {
            reject(err);
        });
    });
}

/*
let lat=50.9835255;
let lon=6.183676;

getMunicipalityByCoordinates(lat, lon)
    .then((municipalityData) => { console.log(municipalityData) });
 */

module.exports = { getMunicipalityByCoordinates }