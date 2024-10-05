import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Notification } from '../entity/Notification';

export class NotificationController {
    static notificationRepository = AppDataSource.getRepository(Notification);

    static getAll = async (req: Request, res: Response) => {
        const notifications = await NotificationController.notificationRepository.find({ relations: ["user", "point"] });
        res.send(notifications);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const notification = await NotificationController.notificationRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["user", "point"]
            });
            if (!notification) {
                res.status(404).send("Notification not found");
                return;
            }
            res.send(notification);
        } catch (error) {
            res.status(404).send("Notification not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { type, message, userId, pointId } = req.body;
        const notification = new Notification();
        notification.type = type;
        notification.message = message;
        notification.user = userId;
        notification.point = pointId;

        try {
            await NotificationController.notificationRepository.save(notification);
        } catch (error) {
            res.status(409).send("Notification creation failed");
            return;
        }
        res.status(201).send("Notification created");
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { type, message, userId, pointId } = req.body;
        let notification;

        try {
            notification = await NotificationController.notificationRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Notification not found");
            return;
        }

        notification.type = type || notification.type;
        notification.message = message || notification.message;
        notification.user = userId || notification.user;
        notification.point = pointId || notification.point;

        try {
            await NotificationController.notificationRepository.save(notification);
        } catch (error) {
            res.status(409).send("Notification update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await NotificationController.notificationRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Notification not found");
            return;
        }
        NotificationController.notificationRepository.delete(id);
        res.status(204).send();
    };
}