import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Medal } from '../entity/Medal';

export class MedalController {
    static medalRepository = AppDataSource.getRepository(Medal);

    static getAll = async (req: Request, res: Response) => {
        const medals = await MedalController.medalRepository.find({ relations: ["userPoints"] });
        res.send(medals);
    };

    static getById = async (req: Request, res: Response) => {
        const { name } = req.params;
        try {
            const medal = await MedalController.medalRepository.findOne({
                where: { name },
                relations: ["userPoints"]
            });
            if (!medal) {
                res.status(404).send("Medal not found");
                return;
            }
            res.send(medal);
        } catch (error) {
            res.status(404).send("Medal not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { name, description, required_points } = req.body;
        const medal = new Medal();
        medal.name = name;
        medal.description = description;
        medal.required_points = required_points;

        try {
            await MedalController.medalRepository.save(medal);
        } catch (error) {
            res.status(409).send("Medal creation failed");
            return;
        }
        res.status(201).send("Medal created");
    };

    static update = async (req: Request, res: Response) => {
        const { name } = req.params;
        const { description, required_points } = req.body;
        let medal;

        try {
            medal = await MedalController.medalRepository.findOneByOrFail({ name });
        } catch (error) {
            res.status(404).send("Medal not found");
            return;
        }

        medal.description = description || medal.description;
        medal.required_points = required_points || medal.required_points;

        try {
            await MedalController.medalRepository.save(medal);
        } catch (error) {
            res.status(409).send("Medal update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { name } = req.params;
        try {
            await MedalController.medalRepository.findOneByOrFail({ name });
        } catch (error) {
            res.status(404).send("Medal not found");
            return;
        }
        MedalController.medalRepository.delete(name);
        res.status(204).send();
    };
}