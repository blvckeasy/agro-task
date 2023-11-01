import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';

@Entity()
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
    
    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User, (user) => user.events)
    @Field(type => User)
    user: User;

    @JoinColumn({ name: 'locationId' })
    @ManyToOne(() => Location, (location) => location.events)
    @Field(type => Location)
    location: Location;
}