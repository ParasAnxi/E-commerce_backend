"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mart_controller_1 = require("../controllers/mart.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const mart_schema_1 = require("../schemas/mart.schema");
const router = express_1.default.Router();
router.route('/')
    .get(mart_controller_1.getMarts)
    .post(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(mart_schema_1.createMartSchema), mart_controller_1.createMart);
router.route('/:id')
    .get((0, validate_middleware_1.validate)(mart_schema_1.getMartSchema), mart_controller_1.getMartById)
    .put(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(mart_schema_1.updateMartSchema), mart_controller_1.updateMart)
    .delete((0, validate_middleware_1.validate)(mart_schema_1.getMartSchema), auth_middleware_1.authenticate, mart_controller_1.deleteMart);
exports.default = router;
