import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from './models';
import { getUserInfoFromFacebook, getUserInfoFromGoogle, SocialProfile } from './utils';
import { updateUser } from './db';

export enum SocialProvider {
  Facebook = 'facebook',
  Google  = 'google',
}

const createOrUpdateUser = async (profile: SocialProfile, provider: SocialProvider) => {
  if (profile.email) {
    const user = await User.findOne({ email: profile.email });
    if (user) {
      const fields = {
        [`${provider}Id`]: profile[`${provider}Id`],
          isOnline: true,
          fullName: profile.fullName,
          emailVerified: true,
        };

      const updatedUser = await updateUser(user._id, fields);
      return updatedUser;
    }
  }

  const user = new User({ ...profile, emailVerified: true, isOnline: true });
  await user.save();
  return user;
};

export const initPassport = (): void => {
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: `${process.env.API_URL}/facebook/callback`,
          profileFields: [
            'id',
            'displayName',
            'email',
            'first_name',
            'last_name',
          ],
        },
        async (accessToken, refreshToken, profile, done) => {
          const user = await User.findOne({ facebookId: profile.id});
          if (user) {
            return done(null, user);
          }

          try {
            const userProfile = getUserInfoFromFacebook(profile);
            const user = await createOrUpdateUser(userProfile, SocialProvider.Facebook);
            done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.API_URL}/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
          const user = await User.findOne({ googleId: profile.id});
          if (user) {
            return done(null, user);
          }

          try {
            const userProfile = getUserInfoFromGoogle(profile);
            const user = await createOrUpdateUser(userProfile, SocialProvider.Google);
            done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }

  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { fullName } = req.body;
        try {
          const user = new User({
          fullName,
            email,
            password,
          });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'A user with a given email has not been found.' });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Your email and password combination does not match an account.' });
          }

          return done(null, user, { message: 'Logged in Successfully.' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    'jwt',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
      },
      async (token, done) => {
        try {
          const authUser = await User.findOne({ email: token.user.email });
          return done(null, authUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

