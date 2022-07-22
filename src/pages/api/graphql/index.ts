/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-micro';
import { typeDefs } from './schema';
import { resolvers } from './schema/resolvers';
import Cors from 'micro-cors';
import { NextApiRequest } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { pool } from '../utils/database';

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: async ({ req }: { req: NextApiRequest }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = auth.substring(7);
      const { id } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as JwtPayload;
      const currentUser = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
      );
      return {
        user: currentUser.rows[0],
      };
    } else {
      return {
        user: null,
      };
    }
  },
});

const startServer = server.start();

export default cors(async (req: any, res: any) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: '/api/graphql' })(req, res);
});

export const config = { api: { bodyParser: false } };
