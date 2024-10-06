import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Marker } from './Marker';

@Entity()
export class CategoryMarker {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Marker, marker => marker.categoryMarker)
    markers!: Marker[];
}