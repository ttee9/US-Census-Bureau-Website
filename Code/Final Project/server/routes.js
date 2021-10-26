var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


// Property Page
function getStates(req, res) {

  var query = `

  Select distinct state_name
  from USzips U
  WHERE state_name != '0'
  Order By state_name ASC

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

};

function getcity(req, res) {
	var inputcity = req.params.city;
	var query = `
	  SELECT p.zipcode, usz.city, p.yearmonth, p.price, usz.state_id
	  FROM Property p
	  Join USzips usz on p.zipcode=usz.zipcode
	  WHERE state_name='${inputcity}'
	  ORDER BY zipcode
	`;
	connection.query(query, function (err, rows, fields) {
	  if (err) console.log(err);
	  else {
		res.json(rows);
	  }
	});
  };


// Rent Page
function getOccupations(req, res) {
	var query = `

    select
    OccupationList,
    Abbreviation

    from
    OccupationList O

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

}

function getOccupationLocations(req, res) {

  var inputOccupation = req.params.decade;
  var inputState = req.params.state;

  var query = `

  SELECT
  U.city as city,
  U.zipcode as zipCode,
  O.${inputOccupation} as Occupation_Pop,
  R.rent as Median_Rent

  FROM
  Occupation O
  JOIN USzips U ON O.zipcode = U.zipcode
  JOIN Commute C ON O.zipcode = C.zipcode
  JOIN Rent R ON O.zipcode = R.zipcode
  JOIN Income I on O.zipcode = I.zipcode

  WHERE
  U.state_name = '${inputState}'

  ORDER BY
  O.${inputOccupation} desc

  LIMIT 5;

  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}


// Income page
function getZipInfo (req, res) {

  var inputZip = req.params.zip;
  var query = `
    SELECT city, income, z.zipcode as zip,
	(less5+5to9+10to14+15to19+20to24+25to29)/total AS w_30,
	(30to34+35to39+40to44+45to59)/total AS w_60
    FROM USzips z JOIN Income i JOIN Commute c ON z.zipcode = i.zipcode AND z.zipcode = c.zipcode
    WHERE z.zipcode = ${inputZip};
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getRelatedZipInfo (req, res) {

	var inputZip = req.params.zip;

	var query = `
		SELECT
			city,
			income,
			z.zipcode                                                             AS zip,
			( less5 + 5to9 + 10to14 + 15to19 + 20to24 + 25to29 ) / total          AS w_30,
			( 30to34 + 35to39 + 40to44 + 45to59 ) / total                         AS w_60
		FROM
			USzips z JOIN Income i JOIN Commute c
				ON z.zipcode = i.zipcode
					AND z.zipcode = c.zipcode
			WHERE z.zipcode != ${inputZip} AND income > 0
			AND z.city = (
				SELECT
					city
				FROM
					USzips
				WHERE
					zipcode = ${inputZip}
				)
		ORDER BY income DESC
		LIMIT 10;
	`;

	connection.query(query, function(err, rows, fields) {
	  if (err) console.log(err);
	  else {
		res.json(rows);
	  }
	});

  };


// The exported functions, which can be accessed in index.js.
module.exports = {

	getOccupations: getOccupations,
	getStates: getStates,
	getOccupationLocations: getOccupationLocations,
	getcity:getcity,
	getZipInfo: getZipInfo,
	getRelatedZipInfo: getRelatedZipInfo
}
