import { Request, Response } from 'express';
import { AppDataSource } from "../config/typeorm";
import { Marker } from '../entity/Marker';

export class MarkerController {
    static markerRepository = AppDataSource.getRepository(Marker);

    static getAll = async (req: Request, res: Response) => {
        const markers = await MarkerController.markerRepository.find({ relations: ["photos"] });
        res.send(markers);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const marker = await MarkerController.markerRepository.findOneOrFail({ where: {id: parseInt(id)}, relations: ["photos"] });
            res.send(marker);
        } catch (error) {
            res.status(404).send("Marker not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { phone_number, location, address, link, userId } = req.body;
        const marker = new Marker();
        marker.phone_number = phone_number;
        marker.location = location;
        marker.address = address;
        marker.link = link;
        marker.user = userId;

        try {
            await MarkerController.markerRepository.save(marker);
        } catch (error) {
            res.status(409).send("Marker creation failed");
            return;
        }
        res.status(201).send("Marker created");
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { phone_number, location, address, link, userId } = req.body;
        let marker;

        try {
            marker = await MarkerController.markerRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Marker not found");
            return;
        }

        marker.phone_number = phone_number || marker.phone_number;
        marker.location = location || marker.location;
        marker.address = address || marker.address;
        marker.link = link || marker.link;
        marker.user = userId || marker.user;

        try {
            await MarkerController.markerRepository.save(marker);
        } catch (error) {
            res.status(409).send("Marker update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await MarkerController.markerRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Marker not found");
            return;
        }
        MarkerController.markerRepository.delete(id);
        res.status(204).send();
    };
}