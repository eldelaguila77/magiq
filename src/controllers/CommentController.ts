import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Comment } from '../entity/Comment';

export class CommentController {
    static commentRepository = AppDataSource.getRepository(Comment);

    static getAll = async (req: Request, res: Response) => {
        const comments = await CommentController.commentRepository.find({ relations: ["user", "point"] });
        res.send(comments);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const comment = await CommentController.commentRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["user", "point"]
            });
            if (!comment) {
                res.status(404).send("Comment not found");
                return;
            }
            res.send(comment);
        } catch (error) {
            res.status(404).send("Comment not found");
        }
    };

    static getByPointId = async (req: Request, res: Response) => {
        const { pointId } = req.params;
        try {
            const comments = await CommentController.commentRepository.find({
                where: { point: {id: parseInt(pointId)} },
                relations: ["user", "point"]
            });
            res.send(comments);
        } catch (error) {
            res.status(404).send("Comments not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { content, userId, pointId } = req.body;
        const comment = new Comment();
        comment.content = content;
        comment.user = userId;
        comment.point = pointId;
        let newComment;

        try {
            newComment = await CommentController.commentRepository.save(comment);
        } catch (error) {
            res.status(409).send("Comment creation failed");
            return;
        }
        res.status(201).send(newComment);
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { content, userId, pointId } = req.body;
        let comment;

        try {
            comment = await CommentController.commentRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }

        comment.content = content || comment.content;
        comment.user = userId || comment.user;
        comment.point = pointId || comment.point;

        try {
            await CommentController.commentRepository.save(comment);
        } catch (error) {
            res.status(409).send("Comment update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await CommentController.commentRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Comment not found");
            return;
        }
        CommentController.commentRepository.delete(id);
        res.status(204).send();
    };
}