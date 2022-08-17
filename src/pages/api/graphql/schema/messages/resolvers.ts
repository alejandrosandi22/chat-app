/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from 'pages/api/utils/database';
import Cryptr from 'cryptr';

const cryptr = new Cryptr(process.env.ACCESS_TOKEN_SECRET);

export const resolvers = {
  Query: {
    getMessage: () => {},
    getLastMessage: async (
      _: any,
      { contactId, userId }: { contactId: string; userId: string }
    ) => {
      try {
        const messages = await pool.query(
          `SELECT * FROM messages WHERE (sender = ${userId} AND receiver = ${contactId}) OR (sender = ${contactId} AND receiver = ${userId}) ORDER BY created_at DESC LIMIT 1`
        );
        return messages.rows[0];
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
    getConversationMesages: async (_root: any, args: any) => {
      const { sender, receiver } = args;

      return await pool.query(
        `SELECT * FROM messages WHERE (sender = ${sender} AND receiver = ${receiver}) OR (sender = ${receiver} AND receiver = ${sender}) ORDER BY created_at ASC`
      );
    },
  },
  Mutation: {
    createMessage: async (_: any, args: any) => {
      const content = cryptr.encrypt(args.content);
      try {
        const message = await pool.query(
          `INSERT INTO messages (id, sender, receiver, content, type, filename ,created_at)
          VALUES (default, '${args.sender}', '${args.receiver}', '${content}', '${args.type}' ,'${args.fileName}', default) RETURNING *`
        );
        return message.rows[0];
      } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
      }
    },
  },
};
