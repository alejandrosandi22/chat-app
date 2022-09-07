/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

function getUsername(email?: string) {
  if (!email) return;
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
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
        const getUser: any = await pool.query(
          `SELECT * FROM users WHERE email = '${
            profile.emails && profile.emails[0].value
          }'`
        );

        const user = getUser[0][0] || null;

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
          email: profile.emails && profile.emails[0].value,
          username: getUsername(profile.emails && profile.emails[0].value),
          avatar: profile.photos && profile.photos[0].value,
          provider: 'google',
        };

        const newUser: any = await pool.query(
          `INSERT INTO users (id, name, email, username, password, avatar, cover_photo, description, website, provider, show_profile_photo, contacts_request, contacts, created_at, updated_at)
        VALUES (default, '${newUserData.name}', '${newUserData.email}', '${newUserData.username}', null, '${newUserData.avatar}', null, null, null, '${newUserData.provider}' ,default, default, '{}', default, default);`
        );

        const token = jwt.sign(
          { id: newUser[0].insertId },
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
