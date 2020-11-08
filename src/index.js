//Require the dependencies
const express = require('express')
const morgan = require('morgan');
const database = require('./database');
const passport = require('passport');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');
const app = express()

//Setting
app.set("port", process.env.PORT || 8080)

//Database Connection
database()

//Middlerwares
app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(methodOverride('_method'));

require('./controllers/validations/passport')(passport);

//Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/solicitudes', require('./routes/solicitud.routes'));

app.use(express.static(path.join(__dirname, 'resources')));

// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './resources/index.html'));
});

//Starting Server
const server = require('http').Server(app)
server.listen(app.get('port'), () => {
    console.log(`Server Started on http://localhost:${app.get('port')}/`)
})

