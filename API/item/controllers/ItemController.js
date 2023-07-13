const ItemModel = require("../../common/models/Item");
const path = require('node:path');
const turf = require("@turf/turf");
const shp = require('shpjs');
const fs = require('fs');
resolve = require('path').resolve;

const shapefilePath = resolve('storage/VG250_KRS.zip');
const shapefileData = fs.readFileSync(shapefilePath);

/* 
async function fetchMunicipalityData()
{
  try
  {
    const shapefilePath = resolve('storage/VG250_KRS.zip');
    const shapefileData = fs.readFileSync(shapefilePath);
    const municipalityData = await shp.parseZip(shapefileData);
    console.log(municipalityData)
    return municipalityData;
  }catch(e)
  {
    console.log(e);
  }
}
*/

module.exports = {
  getAllItems: (req, res) => {
    const { query: filters } = req;

    ItemModel.findAllItems(filters)
      .then((items) => {
        return res.status(200).json({
          status: true,
          data: items,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getItemById: (req, res) => {
    const {
      params: { itemId },
    } = req;

    ItemModel.findItem({ id: itemId })
      .then((item) => {
        return res.status(200).json({
          status: true,
          data: item.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getItemsByMunicipality: (req, res) => {
    const { params: { municipalityId }, } = req;

    ItemModel.findAllItems({ municipality : municipalityId })
      .then((items) => {
        return res.status(200).json({
          status : true,
          n_entries : items.length,
          data : items,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createItem: (req, res) => {
    const { body } = req;

    shp(shapefileData)
      .then((data) => {
        let municipalityId = "Invalid coordinates";
        for (const feature of data.features) {
          if (feature.geometry.type === 'Polygon') {
            const municipalityPolygon = turf.polygon(feature.geometry.coordinates);
      
            if (turf.booleanPointInPolygon([body.longitude, body.latitude], municipalityPolygon)) 
            {
              municipalityId = feature.properties.OBJID;
              break; // Exit the loop if a match is found
            }
          }
        }
        body.municipality = municipalityId;
        console.log(body);

        ItemModel.createItem(body)
          .then((item) => {
            return res.status(200).json({
              status: true,
              data: item.toJSON(),
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
              status: false,
              error: err,
            });
      });   

    
  },

  updateItem: (req, res) => {
    const {
      params: { itemId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the item.",
        },
      });
    }

    ItemModel.updateItem({ id: itemId }, payload)
      .then(() => {
        return ItemModel.findItem({ id: itemId });
      })
      .then((item) => {
        return res.status(200).json({
          status: true,
          data: item.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteItem: (req, res) => {
    const {
      params: { itemId },
    } = req;

    ItemModel.deleteItem({id: itemId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfItemsDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};