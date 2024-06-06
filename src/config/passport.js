// module imports
const passport = require('passport');
const LocalStrategy = require('passport-local');

// file imports
const UserModel = require('../models/user');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ username }).select('+password');
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Store only the user's ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user); // Retrieve the user object based on the stored ID
  } catch (err) {
    done(err);
  }
});

// Alternative way

// passport.use(new LocalStrategy(function (username, password, done) {
//     UserModel.findOne({ username }.select('+password'), function (err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.matchPasswords(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   })
// );

// OR

// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await UserModel.findOne({ username }).select('+password');
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       const isMatch = await user.matchPasswords(password);
//       if (!isMatch) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser(function (user, done) {
//   done(null, user.id); // Store only the user's ID in the session
// });

// passport.deserializeUser(function (id, done) {
//   UserModel.findById(id, function (err, user) {
//     done(err, user); // Retrieve the user object based on the stored ID
//   });
// });

// OR

// passport.serializeUser((user, done) => {
//   done(null, user.id); // Store only the user's ID in the session
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await UserModel.findById(id);
//     done(null, user); // Retrieve the user object based on the stored ID
//   } catch (err) {
//     done(err);
//   }
// });
