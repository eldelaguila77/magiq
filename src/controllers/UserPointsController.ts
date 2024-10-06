import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { UserPoints } from '../entity/UserPoints';

export class UserPointsController {
    static userPointsRepository = AppDataSource.getRepository(UserPoints);

    static getAll = async (req: Request, res: Response) => {
        const userPoints = await UserPointsController.userPointsRepository.find({ relations: ["user", "medal"] });
        res.send(userPoints);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const userPoints = await UserPointsController.userPointsRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["user", "medal"]
            });
            if (!userPoints) {
                res.status(404).send("UserPoints not found");
                return;
            }
            res.send(userPoints);
        } catch (error) {
            res.status(404).send("UserPoints not found");
        }
    };

    static getByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const userPoints = await UserPointsController.userPointsRepository.find({
                where: { user: {id: parseInt(userId)} },
                relations: ["user", "medal"]
            });
            res.send(userPoints);
        } catch (error) {
            res.status(404).send("UserPoints not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { points, userId, medalName } = req.body;
        const userPoints = new UserPoints();
        userPoints.points = points;
        userPoints.user = userId;
        userPoints.medal = medalName;
        let newUserPoints;

        try {
            newUserPoints = await UserPointsController.userPointsRepository.save(userPoints);
        } catch (error) {
            res.status(409).send("UserPoints creation failed");
            return;
        }
        res.status(201).send(newUserPoints);
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { points, userId, medalName } = req.body;
        let userPoints;

        try {
            userPoints = await UserPointsController.userPointsRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("UserPoints not found");
            return;
        }

        userPoints.points = points || userPoints.points;
        userPoints.user = userId || userPoints.user;
        userPoints.medal = medalName || userPoints.medal;

        try {
            await UserPointsController.userPointsRepository.save(userPoints);
        } catch (error) {
            res.status(409).send("UserPoints update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await UserPointsController.userPointsRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("UserPoints not found");
            return;
        }
        UserPointsController.userPointsRepository.delete(id);
        res.status(204).send();
    };
}