import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from '../event/event.entity';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Location {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ type: 'float8' })
    @Field(type => Float)
    x_coordinate: number;

    @Column({ type: 'float8' })
    @Field(type => Float)
    y_coordinate: number;

    @Field(type => Event)
    @OneToMany(() => Event, (event) => event.location)
    events: Event[];
}