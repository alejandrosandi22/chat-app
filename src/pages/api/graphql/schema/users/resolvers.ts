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
      const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        args.email,
      ]);
      if (user.rows.length > 0) {
        throw new UserInputError('User already exists');
      }

      const hashedPassword = await bctypt.hash(args.password, 10);

      const newUser = await pool.query(
        `INSERT INTO users (id, name, email, username, password, avatar, cover_photo, description, website, provider, show_profile_photo, contacts_request, contacts, created_at, updated_at)
        VALUES (default, '${args.name}', '${args.email}', '${args.username}', '${hashedPassword}', '${args.avatar}', '${args.coverPhoto}', '${args.description}', '${args.website}', '${args.provider}' ,default, default, '{}', default, default) RETURNING *`
      );
      return newUser.rows[0];
    },
    updateUser: async (_: any, args: any) => {
      try {
        const updatedUser = await pool.query(
          `UPDATE users SET name = $1, username = $2, avatar = $3, cover_photo = $4, website = $5, description = $6, show_profile_photo = $7, contacts_request = $8, contacts = $9, updated_at = default WHERE id = $10 RETURNING *`,
          [
            args.name,
            args.username,
            args.avatar,
            args.coverPhoto,
            args.website,
            args.description,
            args.showProfile,
            args.contactRequests,
            args.contacts,
            args.id,
          ]
        );
        return updatedUser.rows[0];
      } catch (error: unknown) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    changePassword: async (_: any, args: any) => {
      try {
        const hashedPassword = await bctypt.hash(args.password, 10);
        const updatedUser = await pool.query(
          `UPDATE users SET password = $1, updated_at = default WHERE id = $2 RETURNING *`,
          [hashedPassword, args.id]
        );
        return updatedUser.rows[0];
      } catch (error: unknown) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    deleteUser: async (_: any, args: any) => {
      try {
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
          args.email,
        ]);
        if (user.rows.length === 0) {
          throw new UserInputError('User not found');
        }
        const deletedUser = await pool.query(
          `DELETE FROM users WHERE email = $1 RETURNING *`,
          [args.email]
        );
        return deletedUser.rows[0];
      } catch (error: unknown) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
  },
};
