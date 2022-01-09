import { createConnection } from 'typeorm'
//import path from 'path'

import { Tournament } from '../entity/DTOtournament';
import { Match } from '../entity/DTOtournament';
import { Player } from '../entity/DTOtournament';
import { Round } from '../entity/DTOtournament';
import { Balance } from '../entity/DTOtournament';
const port = 5432;

//connect ORM
export async function connect() {
    await createConnection({
        type: "postgres",
        host: "localhost",
        port: port,
        username: "javier",
        password: "2525_ap",
        database: "apibracket",
        entities: [
            //path.join(__dirname, '../entity/**/**.ts')
            Tournament, Match, Player, Round, Balance
        ],
        synchronize: true
    });
    console.log(`DB is ready with postgres in port ${port}`)
}
