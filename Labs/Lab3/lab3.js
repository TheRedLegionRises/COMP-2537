const express = require('express')
const app = express()

var session = require('express-session');
const { use } = require('express/lib/application');

// Use the session middleware
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

function auth(req, res, next) {
    if (req.session.authenticated)
        // res.send(`Hi ${req.session.user} !`)
        next();
    else {
        res.redirect('/login')
    }
    next();
}

function logger1(req, res, next) {
    console.log("logger1 got executed");
    next();
}

function logger2(req, res, next) {
    console.log("logger2 got executed");
    next();
}

app.use(logger1)
app.use(logger2)


// how to declare a global middleware
// app.use(auth)

users = [
    {
        username: "user1",
        password: "pass1",
        shoppingCart:[
            {
                pokeID: 25,
                price: 12,
                quantity: 2
            },{
                pokeID: 4,
                price: 25,
                quantity: 4
            }
        ]
    }, {
        username: "user2",
        password: "pass2"
    }
]


app.listen(5000, function (err) {
    if (err) console.log(err);
})

app.get('/', auth, function (req, res) {
    res.send("Welcome to the Home Page")
})

app.get("/userProfile/:name", auth, function (req, res) {
    res.write(`Welcome ${req.params.name}\n`);
    res.write(JSON.stringify(users.filter( x => x.username == req.params.name)[0].shoppingCart));
    res.send()
})


app.get('/login/', function (req, res, next) {
    res.send("Please provide the credentials through the URL")
})

app.get('/login/:user/:pass', function (req, res, next) {
    if (
        users.filter(
        user => {return user.username == req.params.user})
    [0].password
        ==
        req.params.pass) {
        // if (users[req.params.user] == req.params.pass) {
        req.session.authenticated = true
        req.session.user = req.params.user
        //res.send("Successful Login!")
        res.redirect(`/userProfile/${req.session.user}`)
    } else {
        req.session.authenticated = false
        res.send("Failed Login!")
    }

})