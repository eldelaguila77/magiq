import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Point } from '../entity/Point';
import { UserPoints } from '../entity/UserPoints';
import { UserPointsController } from './UserPointsController';
import { MedalController } from './MedalController';

export class PointController {
    static pointRepository = AppDataSource.getRepository(Point);
    static userPointsRepository = AppDataSource.getRepository(UserPoints);

    static getAll = async (req: Request, res: Response) => {
        const points = await PointController.pointRepository.find({ relations: ["photos", "user"] });
        res.send(points);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const point = await PointController.pointRepository.findOneOrFail({
                where: { id: parseInt(id) },
                relations: ["photos", "user"]
            });
            if (!point) {
                res.status(404).send("Point not found");
                return;
            }
            res.send(point);
        } catch (error) {
            res.status(404).send("Point not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { title, description, lat, long, categoryId, status, link, userId } = req.body;
        const point = new Point();
        point.title = title;
        point.description = description;
        point.lat = lat || point.lat;
        point.long = long || point.long;
        point.category = categoryId;
        point.status = status;
        point.link = link;
        point.user = userId;
        let newPoint;

        try {
            newPoint = await PointController.pointRepository.save(point);
        } catch (error) {
            res.status(409).send("Point creation failed");
            return;
        }

        // Buscar los puntos acumulados del usuario
        const userPointsList = await UserPointsController.userPointsRepository.find({ where: { user: {id: userId} } });
        console.log("userPointsList", userPointsList);
        const totalPoints = userPointsList.reduce((sum, userPoints) => sum + userPoints.points, 0) + 5;
        console.log("totalPoints", totalPoints);

        // Crear y guardar los nuevos puntos del usuario
        const userPoints = new UserPoints();
        userPoints.user = userId;
        userPoints.points = 5;
        userPoints.achieved_at = new Date();
        //await UserPointsController.userPointsRepository.save(userPoints);

        // Buscar las medallas que el usuario puede obtener
        const medals = await MedalController.medalRepository.find();
        console.log("medals", medals);
        // Ordenar las medallas por required_points en orden descendente
        const sortedMedals = medals.sort((a, b) => b.required_points - a.required_points);
        console.log("sortedMedals", sortedMedals);
        // Encontrar la primera medalla que cumpla con la condición
        const eligibleMedal = sortedMedals.find(medal => totalPoints >= medal.required_points);
        console.log("eligibleMedal", eligibleMedal);

        const highestMedal = sortedMedals[0];

        if (eligibleMedal && (totalPoints <= highestMedal.required_points)) {
            userPoints.medal = eligibleMedal;
            await UserPointsController.userPointsRepository.save(userPoints);
        }
        res.status(201).send(newPoint);
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, lat, long, categoryId, status, link, userId } = req.body;
        let point;

        try {
            point = await PointController.pointRepository.findOneOrFail({ where: { id: parseInt(id) } });
        } catch (error) {
            res.status(404).send("Point not found");
            return;
        }

        point.title = title || point.title;
        point.description = description || point.description;
        point.lat = lat || point.lat;
        point.long = long || point.long;
        point.category = categoryId || point.category;
        point.status = status || point.status;
        point.link = link || point.link;
        point.user = userId || point.user;

        try {
            await PointController.pointRepository.save(point);
        } catch (error) {
            res.status(409).send("Point update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await PointController.pointRepository.findOneOrFail({ where: { id: parseInt(id) } });
        } catch (error) {
            res.status(404).send("Point not found");
            return;
        }
        PointController.pointRepository.delete(id);
        res.status(204).send();
    };
}