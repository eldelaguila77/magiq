import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { Marker } from "./Marker";
import { Point } from "./Point";
import { UserPoints } from "./UserPoints";
import { Comment } from "./Comment";
import { Notification } from "./Notification";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ default: false })
    is_verified!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @OneToMany(() => UserPoints, userPoints => userPoints.user)
    userPoints!: UserPoints[];

    @OneToMany(() => Marker, marker => marker.user)
    markers!: Marker[];

    @OneToMany(() => Point, point => point.user)
    points!: Point[];

    @OneToMany(() => Comment, comment => comment.user)
    comments!: Comment[];

    @OneToMany(() => Notification, notification => notification.user) 
    notifications!: Notification[];
}

