import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field,
} from "type-graphql";

import { Balance } from "../entity/DTOtournament";

@InputType()
class BalanceUpdateInput {
    @Field(() => Int, { nullable: false })
    totalbalance: number;

    @Field(() => Int, { nullable: false })
    lineBalance: number;
}

@Resolver()
export class BalanceResolver {

    @Mutation(() => Balance)
    async createBalance(
        @Arg("balance", () => Int) balanceid: number,
        @Arg("totalbalance", () => Int) totalbalance: number,
        @Arg("linebalance", () => Int) linebalance: number,
    ) {
        const t = new Balance();
        t.balance = balanceid;
        t.totalBalance = totalbalance;
        t.lineBalance = linebalance;
        return await t.save();
    }


    @Mutation(() => Boolean)
    async deleteBalance(@Arg("id", () => Int) id: number) {
        await Balance.delete(id);
        return true;
    }

    @Mutation(() => Boolean)
    async updateBalance(
        @Arg("id", () => Int) id: number,
        @Arg("fields", () => BalanceUpdateInput) fields: BalanceUpdateInput
    ) {
        await Balance.update({ id }, fields);
        return true;
    }

    @Query(() => [Balance])
    get_balance_all() {
        return Balance.find();
    }

}
