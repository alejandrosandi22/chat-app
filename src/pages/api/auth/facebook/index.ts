import { NextApiRequest, NextApiResponse } from 'next';
import passport from 'passport';
import 'pages/api/utils/passport';

export default function (req: NextApiRequest, res: NextApiResponse) {
  passport.authenticate('auth-facebook', {
    scope: ['email', 'public_profile'],
    session: false,
  })(req, res);
}
