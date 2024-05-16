import express from "express";
import dotenv from 'dotenv'
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { connectDb } from "./db/Db.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors());
app.use(express.json());
app.use(
  "/",
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  }),
);

const PORT = process.env.PORT || 8000

httpServer.listen({ port: PORT }, () => {
  console.log(`server is running on ${PORT}`);
});
await connectDb();
