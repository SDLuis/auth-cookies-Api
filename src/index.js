const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./models/index')
const app = express();

const PORT = process.env.PORT || 3050;

//Middlerwares
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./routes/index.routes'))
app.use(require('./routes/role.routes'))

//Starts connection

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop database and resync");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

});

