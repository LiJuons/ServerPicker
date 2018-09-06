const passport =  require("passport");
const LocalStategy =  require("passport-local");
const { Strategy, ExtractJwt} =  require("passport-jwt");
const UserModel  =  require("./database/UserSchema");

const localLogin = new LocalStategy(async (username, password, done) => {
    try{
        const User = await UserModel.findOne({username});
        if(!User || !User.comparePassword(password)) return done(null, false, {message: "Wrong username or password"});
        return done(null, User);
    }
    catch(err) {
        return done(err, false);
    }
})

const jwtOpt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: 'serv3rp1cker'
}

const authLogin = new Strategy(jwtOpt, async (payload, done) => {
    try {
        const User = await UserModel.findById(payload._id);
        if (!User) return done(null, false);
        return done(null, User);
    }
    catch(err) {
        return done(err, false);
    }
})

passport.use(localLogin);
passport.use(authLogin);

exports.authJwt = passport.authenticate('jwt', {session: false});
exports.authLocal = passport.authenticate('local', {session: false});
