/**
 * @author : Manjeet Kumar
 * @description : authentication API for hrg assignemt application
*/

const   express         = require("express"),
        bodyParser      = require("body-parser"),
        mongoose        = require("mongoose"),
        passport        = require("passport"),
        localStrategy   = require("passport-local"),
        session         = require("express-session"),
        config          = require("./config/index.js"),
        User            = require("./models/user");

var app = express();
var authRoutes = require("./routes/index");

//connect to local mongo database
mongoose.connect(config.dbURL, {useNewUrlParser: true})
.then(()=> {
    console.log('db is connected');
})
.catch((err)=> {
    console.log('Something went wrong while connecting to db: ', err);
});


require("./config/passport")(passport);

//use body parser to handle data(json/multipart)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// required for passport
app.use(session({
    secret: config.secret, // session secret
    resave: true,
    saveUninitialized: false
}));

//initialize passport for authentication 
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use(authRoutes);


//start the server on PORT
app.listen(process.env.PORT, process.env.IP, ()=> {
    console.log('Your app is up and running...!');
});