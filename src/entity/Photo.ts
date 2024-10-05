import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Point } from './Point';
import { Marker } from './Marker';

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @CreateDateColumn()
    uploaded_at!: Date;

    @ManyToOne(() => Point, point => point.photos)
    point!: Point;

    @ManyToOne(() => Marker, marker => marker.photos)
    marker!: Marker;
}