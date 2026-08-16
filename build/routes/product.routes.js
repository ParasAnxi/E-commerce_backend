"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const product_schema_1 = require("../schemas/product.schema");
const router = express_1.default.Router();
router.route('/')
    .get(product_controller_1.getProducts)
    .post(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(product_schema_1.createProductSchema), product_controller_1.createProduct);
router.route('/:id')
    .get((0, validate_middleware_1.validate)(product_schema_1.getProductSchema), product_controller_1.getProductById)
    .put(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(product_schema_1.updateProductSchema), product_controller_1.updateProduct)
    .delete((0, validate_middleware_1.validate)(product_schema_1.getProductSchema), auth_middleware_1.authenticate, product_controller_1.deleteProduct);
exports.default = router;
