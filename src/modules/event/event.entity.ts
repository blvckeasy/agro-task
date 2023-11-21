import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Location } from '../location/location.entity';
import { User } from '../user/user.entity';
import { UserResponse } from '../user/dto/user-response.dto';

@Entity({ name: "events" })
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
    
    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    @Field(type => Date, { nullable: false })
    startDate: Date;
    
    @CreateDateColumn({ type: 'timestamp', nullable: false })
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