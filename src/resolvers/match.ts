import { Match } from "../entity/DTOtournament";

import {
    Resolver,
    Mutation,
    Arg,
    Int,
    ID,
    Query,
    InputType,
    Field
} from "type-graphql";


@InputType()
class MatchUpdateInput {
    @Field(() => Int, { nullable: false })
    rounds: number;

    @Field(() => Boolean, { nullable: false })
    state: boolean;

    @Field(() => Int, {
        nullable: false,
        description: 'Relation Tournament'
    })
    tournamentId: number;

    @Field(() => Int, { nullable: false })
    price: number;

    @Field(() => Int, { nullable: false })
    prize: number;
}


@Resolver()
export class MatchResolver {
    @Mutation(() => Match)
    async createMatch(
        @Arg("tournamentid", () => Int) tournamentid: number,
        @Arg("rounds", () => Int) rounds: number,
        @Arg("state", () => Boolean) state: boolean,
        @Arg("price", () => Int) price: number,
        @Arg("prize", () => Int) prize: number,
    ) {
        const t = new Match();
        t.tournament = tournamentid;
        t.state = state;
        t.rounds = rounds;
        t.price = price;
        t.prize = prize;
        return await t.save();
    }

    @Mutation(() => Boolean)
    async deleteMatch(@Arg("id", () => Int) id: number) {
        await Match.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateMatch(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => MatchUpdateInput)
        fields: MatchUpdateInput
    ) {
        await Match.update({ id }, fields);
        return true;
    }

    @Query(() => [Match])
    async get_match_all() {
        const result = await Match.find();
        return result;
    }

    @Query(() => [Match])
    async get_match_id(
        @Arg("id", () => Int) id: number,
    ) {
        const result = await Match.find({
            cache: 1000,
            relations: ["tournament"],
            where: { id: id }
        });
        console.log(result);
        return result;
    }

}
