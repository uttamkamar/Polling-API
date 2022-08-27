const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongoose');
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));
app.listen(port, function (err) {
	if (err) {
		console.log(`Error in running the server: ${err}`);
	}
	console.log(`Server is running on port: ${port}`);
});
