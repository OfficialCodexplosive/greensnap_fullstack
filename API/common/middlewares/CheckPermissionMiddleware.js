const UserModel = require("../models/User");
const { roles } = require("../../config");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;

      UserModel.findUser({ id: userId }).then((user) => {
        // IF user does not exist in our database, means something is fishy
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user.role;

        // IF user does not possess the required role
        // THEN return forbidden error
        if (Array.isArray(role))
        {
          if (!role.includes(userRole)) {
            return res.status(403).json({
              status: false,
              error: `You need to be one of ${role} to access this endpoint.`,
            });
          }
        }
        else
        {
          if (userRole !== role) {
            return res.status(403).json({
              status: false,
              error: `You need to be a ${role} to access this endpoint.`,
            });
          }
        }

        next();
      });
    };
  },
  associates: (jurisdiction) => 
  {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;

      UserModel.findUser({ id: userId }).then((user) => {
        // IF user does not exist in our database, means something is fishy
        // THEN we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userJurisdiction = user.jurisdiction;

        if( (!userJurisdiction) || (userJurisdiction !== jurisdiction) )
        {
          if(user.role !== roles.ADMIN)
          {
            return res.status(403).json({
              status: false,
              error: `You need to be associated with jurisdiction ${jurisdiction} to access this endpoint.`,
            });
          }
        }
        next();
      });
    };
  },
};