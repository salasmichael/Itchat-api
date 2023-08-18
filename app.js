const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser');
const socketConfig = require('./src/socket/socket');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.use("/api", require("./src/routes/auth.route"));
app.use("/api/rooms", require("./src/routes/room.route"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});


socketConfig(app);