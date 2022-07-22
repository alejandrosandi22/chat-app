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
      _accessToken: any,
      _refreshToken: any,
      profile: any,
      cb: any
    ) {
      try {
        const getUser = await pool.query(
          `SELECT * FROM users WHERE email = '${profile.emails[0].value}'`
        );

        const user = getUser.rows[0] || null;

        console.log(profile);

        if (user) {
          console.log('user exists');
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
        console.log('user not exists');

        const newUserData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username,
          avatar: profile.profileUrl,
          description: profile._json.bio ?? '',
          web: profile._json.blog ?? '',
        };

        console.log(newUserData);

        const newUser = await pool.query(
          `INSERT INTO users VALUES (default, '${newUserData.name}', '${newUserData.email}', '${newUserData.username}', null, '', null, '${newUserData.description}', '${newUserData.web}', default, default, 'github', default, default) RETURNING *;`
        );

        console.log(newUser);

        const token = jwt.sign(
          { id: newUser.rows[0].id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '8d',
          }
        );

        console.log({ token });

        return cb(null, newUser, { message: 'Sign in successful', token });
      } catch (error) {
        if (error instanceof Error)
          cb(error, false, { message: error.message });
      }
    }
  )
);
