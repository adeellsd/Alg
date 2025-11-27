"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const particulierRoutes_1 = __importDefault(require("./routes/particulierRoutes"));
const proRoutes_1 = __importDefault(require("./routes/proRoutes"));
const propertyRoutes_1 = __importDefault(require("./routes/propertyRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Ca marche yakho....");
});
app.use("/particulier", (0, authMiddleware_1.AuthMiddleware)(["FREE"]), particulierRoutes_1.default);
app.use("/pro", (0, authMiddleware_1.AuthMiddleware)(["STARTER", "PRO", "ELITE"]), proRoutes_1.default);
app.use("/api/properties", propertyRoutes_1.default);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`aw yemchi sur le port ${PORT}`);
});
//# sourceMappingURL=index.js.map