"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db"));
const PORT = process.env.PORT || 3000;
(0, db_1.default)().then(() => {
    server_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
