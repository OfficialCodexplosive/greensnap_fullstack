module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 60 * 60, // 1 hour
    roles: {
      USER: 'user',
      ADMIN: 'admin',
      SERVICE: 'service'
    },
    productPriceUnits: {
      DOLLAR: 'dollar',
      EURO: 'euro',
      INR: 'inr'
    },
    itemSizeUnits: {
      MILLIMETER: 'mm',
      CENTIMETER: 'cm',
      METER: 'm',
    },
    itemTypes: {
      ALTGLAS : "ALTGLAS",
      ALTPAPIER : "ALTPAPIER",
      BIO : "BIOMÜLL",
      PLASTIK : "PLASTIK",
      ELEKTROSCHROTT : "ELEKTROSCHROTT",
      SPERRMUELL : "SPERRMÜLL",
      REIFEN : "REIFEN",
      CHEMIKALIEN : "CHEMIKALIEN",
      AUTOWRACK : "AUTOWRACK",
    }
  }