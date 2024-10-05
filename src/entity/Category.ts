import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Point } from './Point';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Point, point => point.category)
    points!: Point[];
}