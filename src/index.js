const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models/index');
const app = express();

const PORT = process.env.PORT || 3050;

//Middlerwares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5000', 'http://localhost:8080',  'http://localhost:8081','http://localhost:4200'],

}))

app.use(require('./routes/index.routes'));
app.use(require('./routes/role.routes'));
app.use(require('./routes/auth.routes'));

//Starts connection

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop database and resync");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });

});

