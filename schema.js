export const typeDefs = `#graphql
    type Game {
        id:ID!
        title:String!
        platform:[String!]!
        reviews:[Review!]
    }
    type Review {
        id:ID!
        rating:Int!
        content:String!
        game:Game!
        author:Author!
    }
    type Author {
        id:ID!
        name:String!
        verified:Boolean!
        reviews:[Review!]
    }
    type Query {
        games:[Game]
        reviews:[Review]
        authors:[Author]
        review(reviewId:ID!):Review
        game(gameId:ID!):Game
        author(authorId:ID!):Author
    }
    type Mutation {
        deleteGame(gameId:ID!):[Game!]
        addGame(game:AddGame!):Game
        updateGame(id:ID!,editGame:EditGame):Game
    }
    input AddGame {
        title:String!
        platform:[String!]!
    }
    input EditGame{
        title:String!
        platform:[String!]
    }
`;
