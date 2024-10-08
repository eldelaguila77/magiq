import "reflect-metadata";
import { AppDataSource } from "./config/typeorm";
import express from "express";
import userRoutes from "./routes/userRoutes";
import markerRoutes from "./routes/markerRoutes";
import pointRoutes from "./routes/pointRoutes";
import photoRoutes from "./routes/photoRoutes";
import dotenv from "dotenv";
import userPointsRoutes from "./routes/userPointsRoutes";
import medalRoutes from "./routes/medalRoutes";
import commentRoutes from "./routes/commentRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import categoryMarkerRoutes from "./routes/categoryMarkerRoutes";
import { authMiddleware } from "./middleware/auth";
import cors from "cors";

dotenv.config();

async function main() {
    const app = express();
    app.use(cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    await AppDataSource.initialize()
    app.use(express.json());
    app.use((req, res, next) => {
        if (req.path === "/users/login" || (req.path === "/users" && req.method === "POST")) {
            return next();
        }
        authMiddleware(req, res, next);
    });
    app.use("/users", userRoutes);
    app.use("/userPoints", userPointsRoutes);
    app.use("/markers", markerRoutes);
    app.use("/points", pointRoutes);
    app.use("/photos", photoRoutes);
    app.use("/medals", medalRoutes);
    app.use("/comments", commentRoutes);
    app.use("/notifications", notificationRoutes);
    app.use("/categories", categoryRoutes);
    app.use("/categoryMarkers", categoryMarkerRoutes);

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
}

main().catch((err) => {
    console.error(err);
});