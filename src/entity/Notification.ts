import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Point } from './Point';

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    type!: string;

    @Column()
    message!: string;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, user => user.notifications)
    user!: User;

    @ManyToOne(() => Point, point => point.notifications)
    point!: Point;
}