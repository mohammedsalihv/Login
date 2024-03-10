const express = require('express');
const app = express();
const session = require('express-session');
const nocache = require('nocache');

app.set('view engine','hbs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


const userRouter = require('./routes/user')

app.use(nocache());
app.use(session({
    secret: 'Keyboard',
    resave: false,
    saveUninitialized: true
}))

app.use('/',userRouter)

const PORT = 2001;
app.listen( PORT , () =>  console.log(`Server running on ${PORT}`));