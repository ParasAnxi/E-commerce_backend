"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const category_schema_1 = require("../schemas/category.schema");
const router = express_1.default.Router();
router.route('/')
    .get(category_controller_1.getCategories)
    .post(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(category_schema_1.createCategorySchema), category_controller_1.createCategory);
router.route('/:id')
    .get((0, validate_middleware_1.validate)(category_schema_1.getCategorySchema), category_controller_1.getCategoryById)
    .put(auth_middleware_1.authenticate, (0, validate_middleware_1.validate)(category_schema_1.updateCategorySchema), category_controller_1.updateCategory)
    .delete((0, validate_middleware_1.validate)(category_schema_1.getCategorySchema), auth_middleware_1.authenticate, category_controller_1.deleteCategory);
exports.default = router;
