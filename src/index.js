const express = require('express');
const morgan = require('morgan')
const db = require('./models/index')
const app = express();

const PORT = process.env.PORT || 3050;
app.use(morgan('dev'))
app.use(require('./routes/index.routes'))

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop database and resync");
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })

});

