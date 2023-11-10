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
    title: string;

    @Column()
    @Field()
    description: string;
    
    @Column({ type: 'timestamp', nullable: false })
    @Field(type => Date, { nullable: false })
    startDate: Date;
    
    @Column({ type: 'timestamp', nullable: false })
    @Field(type => Date, { nullable: false })
    endDate: Date;
    
    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => User, (user) => user.events)
    @Field(type => User, { nullable: false })
    user: User;

    @JoinColumn({ name: 'locationId' })
    @ManyToOne(() => Location, (location) => location.events)
    @Field(type => Location, { nullable: false })
    location: Location;
}