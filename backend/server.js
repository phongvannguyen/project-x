const express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./config/DB');

const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Define API endpoints
app.use('/product-list', productRoute);
app.use('/user', userRoute);

const port = process.env.PORT || 4000;
const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});