import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";

import { Tournament } from "../entity/DTOtournament";

@InputType()
class TournamentInput {
    @Field()
    description!: string;
}

@InputType()
class TournamentUpdateInput {
    @Field(() => String)
    description!: string;
}

@Resolver()
export class TournamentResolver {

    //post
    @Mutation(() => Tournament)
    async createTournament(
        @Arg("inputTournament", () => TournamentInput) inputTournament: TournamentInput
    ) {
        const newTournament = Tournament.create(inputTournament);
        //console.log(newTournament);
        return await newTournament.save();
    }

    //delete
    @Mutation(() => Boolean)
    async deleteTournament(@Arg("id", () => Int) id: number) {
        await Tournament.delete(id);
        return true;
    }

    //put
    @Mutation(() => Boolean)
    async updateTournament(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => TournamentUpdateInput) fields: TournamentUpdateInput
    ) {
        await Tournament.update({ id }, fields);
        return true;
    }

    @Query(() => [Tournament])
    async get_tournament_id(
        @Arg("id", () => Int) id: number,
    ) {
        const result = await Tournament.find(
            {
                cache: 1000,
                relations: ["match"],
                where: { id: id },
            }
        );
        //console.log(result);
        return result;
    }

    @Query(() => [Tournament])
    async get_tournament_all(
    ) {
        const result = await Tournament.find(
            {
                cache: 1000,
                relations: ["match"],
            }
        );
        //console.log(result);
        return result;
    }

}
