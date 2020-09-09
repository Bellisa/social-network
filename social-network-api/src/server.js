import express from "express";
import cors from "cors";
import { sequelize } from "./services/sequelize";
import { publicRoutes, privateRoutes } from "./routes";
import { config } from "dotenv";
import BasicAuthMiddleware from "./middleware/basic-auth";
import JWTAuthMiddleware from "./middleware/jwt-auth";
import authMiddleware from "./middleware/auth";

config();

const { PORT } = process.env;

export const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use("/", publicRoutes);
// authMiddleware.setStrategy(new BasicAuthMiddleware());
authMiddleware.setStrategy(new JWTAuthMiddleware());

app.use("/api", authMiddleware.check, privateRoutes);

export const start = async () => {
    await sequelize.authenticate();

    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`); // mv later todo
    });
};
