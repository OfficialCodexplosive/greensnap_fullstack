const path = require('node:path');
const turf = require("@turf/turf");
const shp = require('shpjs');
const fs = require('fs');
resolve = require('path').resolve;

const shapefilePath = resolve('storage/VG250_KRS.zip');
const shapefileData = fs.readFileSync(shapefilePath);