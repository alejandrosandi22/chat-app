/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

passport.use(
  'auth-github',
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async function (
      _accessToken: unknown,
      _refreshToken: unknown,
      profile: any,
      cb: any
    ) {
      try {
        const getUser = await pool.query(
          `SELECT * FROM users WHERE email = '${profile.emails[0].value}'`
        );

        const user = getUser.rows[0] || null;

        if (user) {
          if (user.provider === 'github') {
            const token = jwt.sign(
              { id: user.id },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: '8d',
              }
            );
            return cb(null, user, { message: 'Sign in successful', token });
          }
          return cb(null, false, { message: 'User signed with other method' });
        }

        const newUserData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          avatar: profile.photos[0].value,
          description: profile._json.bio ? `'${profile._json.bio}'` : null,
          provider: 'github',
          web: profile._json.blog ? `'${profile._json.blog}'` : null,
        };

        const newUser = await pool.query(
          `INSERT INTO users (id, name, email, username, password, avatar, cover_photo, description, website, provider, show_profile_photo, contacts_request, contacts, created_at, updated_at)
        VALUES (default, '${newUserData.name}', '${newUserData.email}', '${newUserData.username}', null, '${newUserData.avatar}', null, ${newUserData.description}, ${newUserData.web}, '${newUserData.provider}' ,default, default, '{}', default, default) RETURNING *`
        );

        const token = jwt.sign(
          { id: newUser.rows[0].id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '8d',
          }
        );

        return cb(null, newUser, { message: 'Sign in successful', token });
      } catch (error) {
        if (error instanceof Error)
          cb(error, false, { message: error.message });
      }
    }
  )
);
