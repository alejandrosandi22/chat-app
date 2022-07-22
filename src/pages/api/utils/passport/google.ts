/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

function getUsername(email: string) {
  return email.split('@')[0];
}

passport.use(
  'auth-google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (_accessToken, _refreshToken, profile: any, cb) {
      try {
        const getUser = await pool.query(
          `SELECT * FROM users WHERE email = '${profile.emails[0].value}'`
        );

        const user = getUser.rows[0] || null;

        console.log({ user });

        if (user) {
          if (user.provider === 'google') {
            const token = jwt.sign(
              { id: user.id },
              process.env.ACCESS_TOKEN_SECRET
            );
            return cb(null, user, { message: 'Sign in successful', token });
          }
          return cb(null, false, { message: 'User already exists' });
        }

        const newUserData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: getUsername(profile.emails[0].value),
          password: '',
          avatar: profile.photos[0].value,
          description: '',
          showProfile: 'public',
          contactsRequests: '',
          provider: 'google',
        };

        const newUser = await pool.query(
          `INSERT INTO users VALUES (default, '${newUserData.name}', '${newUserData.email}', '${newUserData.username}', null, '', null, '', default, default, 'google', default, default) RETURNING *;`
        );

        const token = jwt.sign(
          { id: newUser.rows[0].id },
          process.env.ACCESS_TOKEN_SECRET
        );
        return cb(null, newUser, { message: 'Sign in successful', token });
      } catch (error) {
        if (error instanceof Error)
          cb(error, false, { message: error.message });
      }
    }
  )
);
