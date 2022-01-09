# tournaments
backend endpoints in graphql with a relational DB & typeORM for a game

typeorm 0.2.41
apollo-server-express 2.25
typescript 4.5
node v.16.13.1
ubuntu 20.04
postgres 12.9

## dependencies
$ npm init -y
$ npm i express
$ npm i apollo-server-express@2.25.3
$ npm i pg
$ npm i typeorm
$ npm i reflect-metadata
$ npm i type-graphql
$ npm i nodemon

$ npm i jest
$ npm i ts-jest
$ npm i --save-dev @types/jest

## development dependencies
$ npm i -D typescript ts-node @types/express @types/node nodemon

## create a DB in postgres
user "javier" and password: "2525_ap" in postgres
$ sudo -u postgres psql
create database apibracket;

## run app
$ run npm dev

## some endpoints - graphql
-create tournament
mutation {
  createTournament(inputTournament: {
      description: "Bracket"      
  }) {
    id
    description    
    createdAt
  }
}
-select all tournaments
{
  get_tournament_all {
    id
    description
  }
}

- get all Matches
query { get_match_all {
    id,
    rounds,
    state,
    createdAt,
    price,
    prize,    
  }  
}
- get id Match
{
  get_match_id(id: 1) {
    state,
    price
    prize
    id
    tournament {
      description
    }
  }
}
- create Match
mutation {
  createMatch(
    tournamentid:1,
    rounds: 4
    state: false,
    price: 12,
    prize: 14
  ) {
    id
    rounds
    state
    createdAt
    price
    prize    
  }
}
- create Player
mutation {
  createPlayer(fields_players: {
    name: "jj",
    surname: "map",
    avatar: "spiderman",
    email: "email@gmail.com"
    })
  {
    id
    name
    surname
  }
}
- get all players
{
  get_player_all {
    id
    name
    surname
    avatar
    email
  }
}

- get balance of players
{
  get_player_id_balance(id: 1) {
    id
    name
    balance {
      totalbalance
      lineBalance
      createdAt
    }    
  }
}
- update some players
mutation {
  updatePlayer(id:1, fields_updatePlayers: {
    name: "j1j44",
    surname: "map123",
    avatar: "spiderman",
    email: "email@gmail.com"
    })
  {   
    name
    surname
    email    
  }
}
-get player related to round, match and torunament
{
  get_player_id_tournaments(id: 1) {
    name
    surname
    email
    avatar
    round {      
      score
      createdAt
      match {
        state,
        price
        prize
        tournament {
          id
          description
        }
      }
    }
    
  }        
}

-create a round
mutation {
  createRound(
    roundplayer: 1
    round: 4
    score: 12,
    matchid:1,        
    playerid: 2,
    
  ) {
    id
    round
    score
    createdAt    
  }
}

-update round
mutation {
  updateRound(id:1, fields_updateRound: {
    score: 22,
    roundPlayer: 1    
    round: 2,    
    })
  {   
    score
    round      
  }
}

-create a Balance
mutation {
  createBalance(
    balance: 1
    totalbalance: 13
    linebalance: -2
  ) {
    id
    totalBalance
    lineBalance
    createdAt    
  }
}

