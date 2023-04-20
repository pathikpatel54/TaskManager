const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const app = express();
const path = require("path");

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
mongoose.connect(keys.DATABASE_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Passport configuration
const User = require("./models/User");
passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: "Incorrect email." });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: "Incorrect password.",
                    });
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const userFound = await User.findById(id);
    done(null, userFound);
});

// Routes
const authRoutes = require("./routes/auth");
const tasksRoutes = require("./routes/tasks");

app.use("/api/user", authRoutes);
app.use("/api/tasks", tasksRoutes);
app.use(express.static("tasks-client/build"));

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "tasks-client", "build", "index.html")
    );
});

// Start the server
app.listen(keys.PORT, () => {
    console.log(`Server listening on port ${keys.PORT}`);
});
