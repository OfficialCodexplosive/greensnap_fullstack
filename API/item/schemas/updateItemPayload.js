const { itemSizeUnits, itemTypes } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: Object.values(itemTypes)
    },
    size: {
      type: "number",
    },
    sizeUnit: {
      type: "string",
      enum: Object.values(itemSizeUnits),
    },
    latitude: {
      type: "number"
    },
    longitude: {
      type: "number"
    },
    municipality: { 
      type: "string" 
    },
  },
  additionalProperties: false,
};