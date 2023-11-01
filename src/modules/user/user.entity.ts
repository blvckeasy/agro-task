import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../event/event.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ nullable: false, unique: true })
    @Field({ nullable: false })
    username: string;

    @Column({ nullable: false })
    @Field({ nullable: false })
    password: string;

    @Field(type => Event)
    @OneToMany(() => Event, (event) => event.user)
    events: Event[];
}