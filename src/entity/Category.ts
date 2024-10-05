import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Point } from './Point';

@Entity()
export class Category {
    @PrimaryColumn()
    name!: string;

    @OneToMany(() => Point, point => point.category)
    points!: Point[];
}