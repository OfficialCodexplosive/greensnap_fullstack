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
      ALTGLAS : "Altglas",
      ALTPAPIER : "Altpapier",
      BIO : "Biomüll",
      PLASTIK : "Plastik",
      ELEKTROSCHROTT : "Elektroschrott",
      SPERRMUELL : "Sperrmüll",
      REIFEN : "Reifen",
      CHEMIKALIEN : "Chemikalien",
      AUTOWRACK : "Autowrack",
    }
  }