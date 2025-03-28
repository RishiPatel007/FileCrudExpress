const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const routes = require("./routes/v1");
const errorHandler = require("./middleware/errorHandler");
const { notFound } = require("./utils");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(notFound);

app.use(errorHandler);

app.listen(process.env.PORT, (error) => {
	if (error) {
		console.log(error);
		return;
	}
	console.log(`Server listening on PORT ${process.env.PORT}`);
});

module.exports = app;
