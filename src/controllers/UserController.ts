import { Request, Response } from "express";
import { AppDataSource } from "../config/typeorm";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserController {
    static userRepository = AppDataSource.getRepository(User);

    static getAll = async (req: Request, res: Response) => {
        const users = await UserController.userRepository.find();
        res.json(users);
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserController.userRepository.findOneBy({id: parseInt(id)});
        if (user) {
        res.json(user);
        } else {
        res.status(404).json({ message: "User not found" });
        }
    };

    static create = async (req: Request, res: Response) => {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = UserController.userRepository.create({ username, email, password: hashedPassword });
        await UserController.userRepository.save(user);
        res.status(201).json(user);
    };

    static update = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const user = await UserController.userRepository.findOneBy({id: parseInt(id)});
        if (user) {
        user.username = username;
        user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await UserController.userRepository.save(user);
        res.json(user);
        } else {
        res.status(404).json({ message: "User not found" });
        }
    };

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UserController.userRepository.findOneBy({id: parseInt(id)});
        if (user) {
        await UserController.userRepository.remove(user);
        res.status(204).send();
        } else {
        res.status(404).json({ message: "User not found" });
        }
    };

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await UserController.userRepository.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ token, id: user.id });
        } else {
        res.status(401).json({ message: "Invalid credentials" });
        }
    };
}