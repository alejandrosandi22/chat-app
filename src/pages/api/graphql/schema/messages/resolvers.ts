/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from 'pages/api/utils/database';
import Cryptr from 'cryptr';
import { MessageType } from 'types';

const cryptr = new Cryptr(process.env.ACCESS_TOKEN_SECRET);

export const resolvers = {
  Query: {
    getMessages: async (
      _: any,
      { contactId }: { contactId: number },
      context: any
    ) => {
      const userId = context.user.id;
      const messages = await pool.query(
        `SELECT * FROM messages WHERE (sender = ${userId} AND receiver = ${contactId}) OR (sender = ${contactId} AND receiver = ${userId}) ORDER BY created_at LIMIT 10`
      );

      const decryptMessages: MessageType[] = messages.rows.reduce(function (
        accumulator,
        currentValue
      ) {
        accumulator.push({
          ...currentValue,
          content: cryptr.decrypt(currentValue.content),
        });
        return accumulator;
      },
      []);

      let date = '';

      const getDate = (date: string) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1 < 10 ? 0 : ''}${
          dateObj.getMonth() + 1
        }/${dateObj.getFullYear()}`;
      };

      return decryptMessages.map((message) => {
        if (date !== getDate(message.created_at)) {
          date = getDate(message.created_at);
          return {
            date: message.created_at,
            ...message,
          };
        }
        return message;
      });
    },
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
