import { Field, Int, ObjectType } from "type-graphql";

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    ManyToOne,
} from "typeorm";


@ObjectType()
@Entity()
export class Tournament extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    //@Column({ length: "55", unique: true })
    @Column({ unique: true })
    description!: string;

    @Field(() => [Match])
    @OneToMany(() => Match, match => match.tournament,
        {
            cascade: true
        })
    match: Match[];

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;
}

@ObjectType()
@Entity()
export class Match extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [Round])
    @OneToMany(() => Round, round => round.match,
        {
            cascade: true
        })
    round: Round[];

    @Field(() => Tournament)
    @ManyToOne(() => Tournament, tournament => tournament.match,
        {
            onDelete: 'CASCADE',
        })
    tournament: number;

    @Field()
    @Column("boolean", { default: false })
    state: boolean;

    @Field(() => Int)
    @Column("int", { default: 0 })
    rounds: number;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;

    @Field(() => Int)
    @Column("int", { default: 0.0 })
    price: number;

    @Field(() => Int)
    @Column("int", { default: 0 })
    prize: number;
}

@ObjectType()
@Entity()
export class Round extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    public id: number;

    @Field(() => Int)
    @Column("int", { default: 0 })
    public roundPlayer: number;

    @Field(() => Int)
    @Column("int", { default: 0 })
    public score: number;

    @Field(() => Int)
    @Column("int", { default: 0 })
    public round: number;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    public createdAt!: string;

    @Field(() => Match)
    @ManyToOne(() => Match, match => match.round,
        {
            onDelete: 'CASCADE',
        })
    match: number;

    @Field(() => Player)
    @ManyToOne(() => Player, player => player.round,
        {
            onDelete: 'CASCADE',
        })
    player: number;
}

@ObjectType()
@Entity()
export class Player extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => [Round])
    @OneToMany(() => Round, round => round.player,
        {
            cascade: true
        })
    round: Round[];

    @Field(() => [Balance])
    @OneToMany(() => Balance, balance => balance.balance,
        {
            cascade: true
        })
    balance: Balance[];

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    surname: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column({ unique: true })
    avatar!: string;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt!: string;
}

@ObjectType()
@Entity()
export class Balance extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, balance => balance.balance,
        {
            onDelete: 'CASCADE',
        })
    balance: number;

    @Field(() => Int)
    @Column("decimal", { default: 0.0 })
    totalBalance: number;

    @Field(() => Int)
    @Column("decimal", { default: 0.0 })
    lineBalance: number;

    @Field(() => String)
    @CreateDateColumn({ type: "timestamp" })
    createdAt: string;
}
