import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Point } from '../entity/Point';

export class PointController {
    static pointRepository = AppDataSource.getRepository(Point);

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
        const { title, description, location, categoryId, status, link, userId } = req.body;
        const point = new Point();
        point.title = title;
        point.description = description;
        point.location = location;
        point.category = categoryId;
        point.status = status;
        point.link = link;
        point.user = userId;

        try {
            await PointController.pointRepository.save(point);
        } catch (error) {
            res.status(409).send("Point creation failed");
            return;
        }
        res.status(201).send("Point created");
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, location, categoryId, status, link, userId } = req.body;
        let point;

        try {
            point = await PointController.pointRepository.findOneOrFail({ where: { id: parseInt(id) } });
        } catch (error) {
            res.status(404).send("Point not found");
            return;
        }

        point.title = title || point.title;
        point.description = description || point.description;
        point.location = location || point.location;
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