import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Photo } from '../entity/Photo';

export class PhotoController {
    static photoRepository = AppDataSource.getRepository(Photo);

    static getAll = async (req: Request, res: Response) => {
        const photos = await PhotoController.photoRepository.find({ relations: ["point", "marker"] });
        res.send(photos);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const photo = await PhotoController.photoRepository.findOneOrFail({where: {id: parseInt(id)}, relations: ["point", "marker"] });
            res.send(photo);
        } catch (error) {
            res.status(404).send("Photo not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { url, pointId, markerId } = req.body;
        const photo = new Photo();
        photo.url = url;
        photo.point = pointId;
        photo.marker = markerId;

        try {
            await PhotoController.photoRepository.save(photo);
        } catch (error) {
            res.status(409).send("Photo creation failed");
            return;
        }
        res.status(201).send("Photo created");
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { url, pointId, markerId } = req.body;
        let photo;

        try {
            photo = await PhotoController.photoRepository.findOneOrFail({where: {id: parseInt(id)}});
        } catch (error) {
            res.status(404).send("Photo not found");
            return;
        }

        photo.url = url || photo.url;
        photo.point = pointId || photo.point;
        photo.marker = markerId || photo.marker;

        try {
            await PhotoController.photoRepository.save(photo);
        } catch (error) {
            res.status(409).send("Photo update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await PhotoController.photoRepository.findOneOrFail({where: {id: parseInt(id)}});
        } catch (error) {
            res.status(404).send("Photo not found");
            return;
        }
        PhotoController.photoRepository.delete(id);
        res.status(204).send();
    };
}