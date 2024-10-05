import { Request, Response } from 'express';
import { AppDataSource } from '../config/typeorm';
import { Category } from '../entity/Category';

export class CategoryController {
    static categoryRepository = AppDataSource.getRepository(Category);

    static getAll = async (req: Request, res: Response) => {
        const categories = await CategoryController.categoryRepository.find();
        res.send(categories);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const category = await CategoryController.categoryRepository.findOneByOrFail({ id: parseInt(id) });
            res.send(category);
        } catch (error) {
            res.status(404).send("Category not found");
        }
    };

    static create = async (req: Request, res: Response) => {
        const { name } = req.body;
        const category = new Category();
        category.name = name;

        try {
            await CategoryController.categoryRepository.save(category);
        } catch (error) {
            res.status(409).send("Category creation failed");
            return;
        }
        res.status(201).send("Category created");
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;
        let category;

        try {
            category = await CategoryController.categoryRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Category not found");
            return;
        }

        category.name = name || category.name;

        try {
            await CategoryController.categoryRepository.save(category);
        } catch (error) {
            res.status(409).send("Category update failed");
            return;
        }
        res.status(204).send();
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await CategoryController.categoryRepository.findOneByOrFail({ id: parseInt(id) });
        } catch (error) {
            res.status(404).send("Category not found");
            return;
        }
        CategoryController.categoryRepository.delete(id);
        res.status(204).send();
    };
}