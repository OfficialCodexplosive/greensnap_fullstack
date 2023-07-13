const router = require("express").Router();

// Controller Imports
const ItemController = require("./controllers/ItemController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createItemPayload = require("./schemas/createItemPayload");
const updateItemPayload = require("./schemas/updateItemPayload");
const { roles } = require("../config");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  ItemController.getAllItems
);

router.get(
  "/:itemId",
  [isAuthenticatedMiddleware.check],
  ItemController.getItemById
);


router.get(
  "/municipality/:municipalityId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has([roles.ADMIN, roles.SERVICE]),
    (req, res, next) => {
      const municipalityId = req.params.municipalityId;
      CheckPermissionMiddleware.associates(municipalityId)(req, res, next);
    }
  ],
  ItemController.getItemsByMunicipality
)

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.USER),
    SchemaValidationMiddleware.verify(createItemPayload),
  ],
  ItemController.createItem
);

router.patch(
  "/:itemId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateItemPayload),
  ],
  ItemController.updateItem
);

router.delete(
  "/:itemId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  ItemController.deleteItem
);

module.exports = router;