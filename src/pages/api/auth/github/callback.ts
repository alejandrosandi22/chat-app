import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import { setCookies } from 'cookies-next';

export default function (req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate(
    'auth-github',
    {
      session: false,
    },
    (error, _user, info) => {
      console.log({ info });
      if (error) {
        return res
          .status(500)
          .redirect('/signin?error=github+authentication+failed')
          .json({ message: error.message });
      }
      if (info.token) {
        setCookies('chat-app-user-session', info.token, { req, res });
      }
      return res.status(200).redirect('/signin');
    }
  )(req, res);
}