const mongoose = require('mongoose');
//connecting mongoose with database
//I stored MONGODB_URI in my system veriable for security reason. veriable name MONGODB_URI followed by your mongo atlas link
//for local use you can write this code
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/polling-api');
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error Connecting to MongoDB'));

db.once('open', function () {
	console.log('connected to database :: MongoDB');
});
// exporting database
module.exports = db;
