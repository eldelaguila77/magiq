import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';
import { CategoryMarker } from './CategoryMarker';

@Entity()
export class Marker {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone_number!: string;

    @Column({ type: 'float', precision: 25, scale: 15})
    lat!: number;

    @Column({ type: 'float', precision: 25, scale: 15})
    long!: number;

    @Column()
    address!: string;

    @Column()
    link!: string;

    @ManyToOne(() => CategoryMarker, categoryMarker => categoryMarker.markers)
    categoryMarker!: CategoryMarker;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, user => user.markers)
    user!: User;

    @OneToMany(() => Photo, photo => photo.marker)
    photos!: Photo[];
}