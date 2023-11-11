import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { UserResponse } from '../user/dto/user-response.dto';

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
    @Field(type => UserResponse, { nullable: false })
    user: UserResponse;

    @JoinColumn({ name: 'locationId' })
    @ManyToOne(() => Location, (location) => location.events)
    @Field(type => Location, { nullable: false })
    location: Location;
}