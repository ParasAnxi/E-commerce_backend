"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const mart_routes_1 = __importDefault(require("./routes/mart.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const rateLimiter_1 = require("./middleware/rateLimiter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/products', rateLimiter_1.apiRateLimiter, product_routes_1.default);
app.use('/api/marts', rateLimiter_1.apiRateLimiter, mart_routes_1.default);
app.use('/api/categories', rateLimiter_1.apiRateLimiter, category_routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World! Server is running.");
});
exports.default = app;
