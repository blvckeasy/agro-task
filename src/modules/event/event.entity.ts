import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../location/location.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity() // Make sure @Entity() is included
@ObjectType()
export class Event {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ nullable: false })
    @Field({ nullable: false })
    name: string;

    @Column({ type: 'timestamp' })
    @Field(type => Date)
    startDate: Date;

    @Column({ type: 'timestamp' })
    @Field(type => Date)
    endDate: Date;

    @JoinColumn({ name: 'locationId' })
    @ManyToOne(() => Location, (location) => location.events)
    @Field(type => Location)
    location: Location;
}