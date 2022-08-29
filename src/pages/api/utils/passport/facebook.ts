import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import jwt from 'jsonwebtoken';
import { pool } from '../database';

function getUsername(email?: string) {
  if (!email) return;
  return email.split('@')[0];
}

passport.use(
  'auth-facebook',
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['displayName', 'email', 'picture.type(large)'],
    },
    async function (_accessToken, _refreshToken, profile, cb) {
      try {
        const getUser = await pool.query(
          `SELECT * FROM users WHERE email = '${
            profile.emails && profile.emails[0].value
          }'`
        );

        const user = getUser.rows[0] || null;

        if (user) {
          if (user.provider === 'facebook') {
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
          provider: 'facebook',
        };

        const newUser = await pool.query(
          `INSERT INTO users (id, name, email, username, password, avatar, cover_photo, description, website, provider, show_profile_photo, contacts_request, contacts, created_at, updated_at)
        VALUES (default, '${newUserData.name}', '${newUserData.email}', '${newUserData.username}', null, '${newUserData.avatar}', null, null, null, '${newUserData.provider}' ,default, default, '{}', default, default) RETURNING *`
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
