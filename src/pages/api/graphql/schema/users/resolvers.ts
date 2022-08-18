/* eslint-disable @typescript-eslint/no-explicit-any */
import { pool } from 'pages/api/utils/database';
import bctypt from 'bcryptjs';
import { UserInputError } from 'apollo-server-micro';
import Cryptr from 'cryptr';
import jwt from 'jsonwebtoken';

const cryptr = new Cryptr(process.env.ACCESS_TOKEN_SECRET);

export const resolvers = {
  Query: {
    getUser: async (_root: any, { username }: { username: string }) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM users WHERE username = $1',
          [username]
        );
        return rows[0];
      } catch (error) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    getContacts: async (_root: any, _args: any, context: any) => {
      const userId = context.user.id;

      try {
        const contacts = await pool.query(
          `SELECT * FROM users WHERE contacts @> ARRAY[${userId}]`
        );

        const contactsWithLastMessage = await Promise.all(
          contacts.rows.map(async (contact: { id: number }) => {
            const lastMessage = await pool.query(
              `SELECT * FROM messages WHERE (sender = ${userId} AND receiver = ${contact.id}) OR (sender = ${contact.id} AND receiver = ${userId}) ORDER BY created_at DESC LIMIT 1`
            );
            return {
              ...contact,
              lastMessage: {
                ...lastMessage.rows[0],
                content: cryptr.decrypt(lastMessage.rows[0].content),
                created_at: lastMessage.rows[0].created_at,
              },
            };
          })
        );

        return contactsWithLastMessage;
      } catch (error) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    getCurrentUser: async (_root: any, _args: any, context: any) => {
      try {
        return context.user;
      } catch (error) {
        if (error instanceof Error) throw new UserInputError(error.message);
      }
    },
    getUsers: async (
      _: any,
      {
        show_profile_photo,
        contacts_request,
      }: { show_profile_photo: string; contacts_request: string }
    ) => {
      const users = await pool.query(
        `SELECT * FROM users WHERE show_profile_photo = $1 AND contacts_request = $2`,
        [show_profile_photo, contacts_request]
      );
      return users.rows;
    },
  },
  Mutation: {
    signIn: async (
      _root: any,
      { email, password }: { email: string; password: string }
    ) => {
      const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email,
      ]);
      if (!user.rows[0]) {
        throw new Error('User not found');
      }
      const isMatch = await bctypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        throw new Error('Password is incorrect');
      }

      const tokenData = {
        id: user.rows[0].id,
      };

      const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      return {
        value: token,
      };
    },
    signUp: async (_: any, args: any) => {
      const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        args.email,
      ]);
      if (user.rows.length > 0) {
        throw new UserInputError('User already exists');
      }

      const hashedPassword = await bctypt.hash(args.password, 10);

      const newUser = await pool.query(
        `INSERT INTO users (id, name, email, username, password, avatar, cover_photo, description, website, provider, show_profile_photo, contacts_request, contacts, created_at, updated_at)
        VALUES (default, '${args.name}', '${args.email}', '${args.username}', '${hashedPassword}', '/static/images/user.png', null, null, null, 'email' ,default, default, '{}', default, default) RETURNING *`
      );

      const tokenData = {
        id: newUser.rows[0].id,
      };

      const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '8d',
      });

      return {
        value: token,
      };
    },
    updateUser: async (_: any, args: any, context: any) => {
      try {
        const userId = context.user.id;

        const getUser = await pool.query(
          `SELECT * FROM users WHERE id = ${userId}`
        );
        const user = getUser.rows[0];

        const contacts = user.contacts;

        const updatedUser = await pool.query(
          `UPDATE users SET name = $1, username = $2, avatar = $3, cover_photo = $4, website = $5, description = $6, show_profile_photo = $7, contacts_request = $8, contacts = ARRAY [${
            args.contacts ? contacts.concat(args.contacts) : user.contacts
          }], updated_at = default WHERE id = ${userId} RETURNING *`,
          [
            args.name ?? user.name,
            args.username ?? user.username,
            args.avatar ?? user.avatar,
            args.cover_photo ?? user.cover_photo,
            args.website ?? user.website,
            args.description ?? user.description,
            args.show_profile_photo ?? user.show_profile_photo,
            args.contacts_request ?? user.contacts_request,
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
