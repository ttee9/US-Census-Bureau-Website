const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors());
// Temporary token

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/login', (req, res) => {
	res.send({
	  token: 'test123'
	});
  });

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */

// Property Page
app.get('/states', routes.getStates);
app.get('/state/:city', routes.getcity);


// Rent Page
app.get('/occupations', routes.getOccupations);
app.get('/locations/:decade?/:state?', routes.getOccupationLocations);


// Income Page
app.get('/zipinfo/:zip', routes.getZipInfo);
app.get('/relatedzipinfo/:zip', routes.getRelatedZipInfo);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
