import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { UserPoints } from './UserPoints';

@Entity()
export class Medal {
    @PrimaryColumn()
    name!: string;

    @Column()
    description!: string;

    @Column()
    required_points!: number;

    @OneToMany(() => UserPoints, userPoints => userPoints.medal)
    userPoints!: UserPoints[];
}