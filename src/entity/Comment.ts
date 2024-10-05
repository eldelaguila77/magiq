import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Point } from './Point';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, user => user.comments)
    user!: User;

    @ManyToOne(() => Point, point => point.comments)
    point!: Point;
}