import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Medal } from './Medal';

@Entity()
export class UserPoints {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    points!: number;

    @CreateDateColumn()
    achieved_at!: Date;

    @ManyToOne(() => User, user => user.userPoints)
    user!: User;

    @ManyToOne(() => Medal, medal => medal.userPoints)
    medal!: Medal;
}