import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";

import { createQueryBuilder } from "typeorm";
import { Player } from "../entity/DTOtournament";

//Definition of the object
@InputType()
class PlayerInput {
    @Field()
    name!: string;

    @Field()
    surname: string;

    @Field()
    avatar: string;

    @Field()
    email!: string;
}

@InputType()
class PlayerUpdateInput {
    @Field(() => String, { nullable: false })
    name: string;

    @Field(() => String, { nullable: false })
    surname: string;

    @Field(() => String, { nullable: false })
    avatar: string;

    @Field(() => String, { nullable: false })
    email: string;
}

@Resolver()
export class PlayerResolver {

    @Mutation(() => Player)
    async createPlayer(
        @Arg("fields_players", () => PlayerInput) fields_players: PlayerInput
    ) {
        const newPlayer = Player.create(fields_players);
        console.log(newPlayer);
        return await newPlayer.save();
    }

    @Mutation(() => Boolean)
    async deletePlayer(@Arg("id", () => Int) id: number) {
        await Player.delete(id);
        return true;
    }

    @Mutation(() => Player)
    async updatePlayer(
        @Arg("id", () => Int) id: number,
        @Arg("fields_updatePlayers", () => PlayerUpdateInput) fields_updatePlayers: PlayerUpdateInput
    ) {
        await createQueryBuilder()
            .update(Player)
            .set(fields_updatePlayers)
            .where("id = :id", { id: id })
            .execute();
        return fields_updatePlayers;
    }


    @Query(() => [Player])
    get_player_all() {
        return Player.find();
    }

    @Query(() => Player)
    async get_player_id(
        @Arg("id", () => Int) id: number,
    ) {
        const result = await createQueryBuilder()
            .select("player")
            .from(Player, "player")  //entity - alias
            .where("player.id = :id", { id: id })
            .getOne();
        //console.log(result);
        return result;
    }

    @Query(() => Player)
    async get_player_id_tournaments(
        @Arg("id", () => Int) id: number,
    ) {
        const result = await createQueryBuilder()
            .select("player")
            .from(Player, "player")
            //.relations
            .leftJoinAndSelect('player.round', 'round')
            .leftJoinAndSelect('round.match', 'match')
            .leftJoinAndSelect('match.tournament', 'torunament')
            .where("player.id = :id", { id: id })
            .getOne();
        console.log(result);
        return result;
    }

    @Query(() => [Player])
    async get_player_id_balance(
        @Arg("id", () => Int) id: number,
    ) {
        const result = await Player.find({
            cache: 1000,
            relations: ["balance"],
            where: { id: id }
        });
        //console.log(result);
        return result;
    }

}
