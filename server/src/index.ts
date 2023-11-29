import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import mongoose from "mongoose";
import createIndex from "./elastic/init";

const app: Application = express();
const port: string | number = process.env.PORT || 4000;

const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = async (): Promise<void> => {
  await server.start();
  server.applyMiddleware({ app: app as any });

  // Connect to MongoDB here
  const mongoUri: string =
    process.env.MONGO_URI ||
    "mongodb+srv://usmanbinnaeem:3MPQk6aIPfEiYIrp@cluster0.mz536pa.mongodb.net/?retryWrites=true&w=majority";
  try {
    await mongoose.connect(mongoUri);
    const indices = ["posts"]; // List of indices you want to create

    indices.forEach((index) => {
      createIndex(index).catch(console.error);
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
  }

  app.listen(port, () => {
    console.log(
      `Server is running on http://localhost:${port}${server.graphqlPath}`
    );
  });
};

startServer();
