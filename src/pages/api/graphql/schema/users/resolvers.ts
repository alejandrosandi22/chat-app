/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from 'pages/api/utils/database';
import bctypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-micro';

export const resolvers = {
  Query: {
    getUser: async (_root: any, _args: any, context: any) => {
      try {
        return context.user;
      } catch (error) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    getCurrentUser: async (_: any, __: any, { req }: { req: any }) => {
      const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        req.user.id,
      ]);
      return user.rows[0];
    },
    getUsers: async (
      _: any,
      {
        showProfile,
        contactRequests,
      }: { showProfile: string; contactRequests: string }
    ) => {
      const users = await pool.query(
        `SELECT * FROM users WHERE show_profile_photo = $1 AND contacts_request = $2`,
        [showProfile, contactRequests]
      );
      return users.rows;
    },
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        args.email,
      ]);
      if (user.rows.length > 0) {
        throw new UserInputError('User already exists');
      }

      const hashedPassword = await bctypt.hash(args.password, 10);

      const newUser = await pool.query(
        `INSERT INTO users (name, email, password, avatar, description, show_profile_photo, contacts_request) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          args.name,
          args.email,
          hashedPassword,
          args.avatar,
          args.description,
          args.showProfile,
          args.contactsRequests,
        ]
      );
      return newUser.rows[0];
    },
  },
};
