var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({
          'facebook.id': profile.id
        },
        function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            User.findOne({email: profile.emails[0].value}, function (err, user) {
              if (err) {
                done(err);
              }
              if (!user) {
                user = new User({
                  name: profile.displayName,
                  picture: 'http://graph.facebook.com/' + profile.id + '/picture?width=300',
                  email: profile.emails[0].value,
                  role: 'user',
                  provider: 'facebook',
                  facebook: profile._json,
                  socialLink: profile._json.link,
                });
              } else {
                user.google = {};
                user.facebook = profile._json;
                user.picture = 'http://graph.facebook.com/' + profile.id + '/picture?width=300';
                user.provider = 'facebook';
                user.socialLink = profile._json.link;
              }

              user.save(function (err) {
                if (err) {
                  return done(err);
                }
                return done(err, user);
              });
            });
          } else {
            user.facebook = profile._json;
            user.picture = 'http://graph.facebook.com/' + profile.id + '/picture?width=300';
            user.socialLink = profile._json.link;
            user.save(function (err) {
              if (err) {
                return done(err);
              }
              return done(err, user);
            });
          }
        });
    }
  ));
};
