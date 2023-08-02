const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

db.mongoose
.connect( process.env.MONGO_SRV  , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Successfully connected to MongoDB.');
    // initial();
})
.catch(err => {
    console.error('Connection error', err);
    process.exit();
});



app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the JWT Authentication Server' });
} );

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});