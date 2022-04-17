const express = require('express');
const app = express();

const PORT = process.env.PORT || 3050;

app.use(require('./routes/index.routes'))

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})