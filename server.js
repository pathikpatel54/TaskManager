const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "session",
        keys: ["secret"],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
);
app.use(passport.initialize());
app.use(passport.session());

// MongoDB configuration
mongoose.connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Passport configuration
const User = require("./models/User");
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect email." });
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
            });
        });
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Routes
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");
app.use("/api/user", authRoutes);
app.use("/api/tasks", tasksRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
