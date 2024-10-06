import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { Photo } from './Photo';
import { Comment } from './Comment';
import { Notification } from './Notification';
import { Category } from './Category';

@Entity()
export class Point {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @Column({ type: 'float', precision: 25, scale: 15})
    lat!: number;

    @Column({ type: 'float', precision: 25, scale: 15})
    long!: number;

    @ManyToOne(() => Category, category => category.points)
    category!: Category;

    @Column()
    status!: string;

    @Column()
    link!: string;

    @CreateDateColumn()
    created_at!: Date;

    @ManyToOne(() => User, user => user.points)
    user!: User;

    @OneToMany(() => Photo, photo => photo.point)
    photos!: Photo[];

    @OneToMany(() => Comment, comment => comment.point)
    comments!: Comment[];

    @OneToMany(() => Notification, notification => notification.point)
    notifications!: Notification[];
}