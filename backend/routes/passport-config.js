// const LocalStrategy = require('passport-local').Strategy


// function initiailize(passport, getUserByEmail){

//     const authenticateUser = (email_id, password, done) =>{

//             const user = getUserByEmail(email_id)
//             if(user == null){
//                 return done(null, false, {message: `No user found with ${email_id}`})
//             }

//             if(password == user.password){

//                 return done(null, user, {message : `User authenticated successfully`});

//             }else{
//                 return done (null, false, { message: `Incorrect password`});
//             }
//     }

//     passport.use(new LocalStrategy({usernameField : email_id, passwordField: password}, authenticateUser))
//     passport.serializeUser((user, done) =>{})
//     passport.deSerializeUser((user, done) =>{})


// }

// module.exports = initiailize