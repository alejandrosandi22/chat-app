import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import 'pages/api/utils/passport';

export default function (req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('auth-github', {
    scope: ['user:email', 'user:description'],
    session: false,
  })(req, res);
}
