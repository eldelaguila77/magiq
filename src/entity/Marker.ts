import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';

@Entity()
export class Marker {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone_number!: string;

    @Column()
    location!: string;

    @Column()
    address!: string;

    @Column()
    link!: string;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, user => user.markers)
    user!: User;

    @OneToMany(() => Photo, photo => photo.marker)
    photos!: Photo[];
}