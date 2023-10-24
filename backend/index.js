const express = require('express');

require("dotenv").config();

const {UserRoute}=require("./Routes/Users.Routes")
const { HistoryRoute } = require("./Routes/History.Routes");


const { connection } = require("./config/db");

const cors = require("cors");

const { Text } = require('./Routes/Text.Routes');


const app = express();
const port = process.env.PORT || 8080
app.use(express.json());
app.use(cors());


app.use("/user", UserRoute);

app.use("/history", HistoryRoute);
app.use("/text",Text)


app.get('/', (req, res) => {
	res.status(200).send("Welcome to the backend of AI-TextCraft")
});


app.listen(port, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${port}`);
	} catch (error) {
		console.error(error.message);
	}
});