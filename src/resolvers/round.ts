import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";

import { Round } from "../entity/DTOtournament";
import { createQueryBuilder } from "typeorm";

@InputType()
class RoundUpdateInput {
    @Field(() => Int, { nullable: false })
    score: number;

    @Field(() => Int, { nullable: false })
    roundPlayer: number;

    @Field(() => Int, { nullable: false })
    round: number;

}

@Resolver()
export class RoundResolver {

    @Mutation(() => Round)
    async createRound(
        @Arg("roundplayer", () => Int) roundplayer: number,
        @Arg("round", () => Int) round: number,
        @Arg("score", () => Int) score: number,
        @Arg("matchid", () => Int) matchid: number,
        @Arg("playerid", () => Int) playerid: number,
    ) {
        const t = new Round();
        t.roundPlayer = roundplayer;
        t.round = round;
        t.score = score;
        t.match = matchid;
        t.player = playerid;
        return await t.save();
    }


    @Mutation(() => Boolean)
    async deleteRound(@Arg("id", () => Int) id: number) {
        await Round.delete(id);
        return true;
    }

    @Mutation(() => Round)
    async updateRound(
        @Arg("id", () => Int) id: number,
        @Arg("fields_updateRound", () => RoundUpdateInput) fields_updateRound: RoundUpdateInput
    ) {
        await createQueryBuilder()
            .update(Round)
            .set(fields_updateRound)
            .where("id = :id", { id: id })
            .execute();
        return fields_updateRound;
    }

    @Query(() => [Round])
    get_round_all() {
        return Round.find();
    }

}
