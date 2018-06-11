var faker = require("faker");

var appRouter = function (app) {

	app.get("/user", function (req,res){
		var data =({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			username: faker.internet.userName(),
			email: faker.internet.email()
		});
		res.status(200).send(data);
	});

	app.get("/users/:num", function (req,res){
		var users = [];
		var num = req.params.num;

		if (isFinite(num) && num > 0) {
			for (i =0; i<= num-1; i++) {
				users.push({
					firstName: faker.name.firstName(),
					lastName: faker.name.lastName(),
					username: faker.internet.userName(),
					email: faker.internet.email()
				});
			}
			res.status(200).send(users);
		} else {
			res.status(400).send({ message: 'invalid number supplied'});
		}
	});

	app.get("/students", function(req, res){
		var students = [];
		var mysql = require('mysql');
		var con = mysql.createConnection({
			host: "localhost",
			user: "test",
			password: "test",
			database: "Hogwarts"
		});

		con.connect(function(err) {
			if (err) throw err;
			console.log("Connected!");
			con.query('SELECT * FROM Students', function (err, result){
				if (err) throw err;
				for (i =0; i < result.length; i++)
				{
					console.log(result[i]);
				}

			})
		})
	})
}

module.exports = appRouter;