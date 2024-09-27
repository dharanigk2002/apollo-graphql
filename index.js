import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./db.js";

let { games, reviews, authors } = db;
const PORT = 4000;
const resolvers = {
  Query: {
    games() {
      return games.filter((game) => !game.isDeleted);
    },
    reviews() {
      return reviews;
    },
    authors() {
      return authors;
    },
    review(_, args) {
      return reviews.find((rev) => rev.id === args.reviewId);
    },
    author(_, args) {
      return authors.find((rev) => rev.id === args.authorId);
    },
    game(_, args) {
      return games.find((rev) => rev.id === args.gameId);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return authors.find((auth) => auth.id === parent.author_id);
    },
    game(parent) {
      return games.find((auth) => auth.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, { gameId }) {
      games.find((game) => game.id === gameId).isDeleted = true;
      return games.filter((game) => !game.isDeleted);
    },
    updateGame(_, { id, editGame }) {
      games = games.map((game) => {
        if (game.id === id) return { ...game, ...editGame };
        return game;
      });
      return games.find((game) => game.id === id);
    },
    addGame(_, { game }) {
      const newGame = {
        id: games.length + 1,
        ...game,
      };
      games.push(newGame);
      return newGame;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await startStandaloneServer(server, {
  listen: { port: PORT },
});

console.log("Listening on port", PORT);
