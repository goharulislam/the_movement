const express = require('express');
const app = express();
const connection = require('./secret');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000;

connection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const jwt = require('jsonwebtoken');
const JWT_ACCESS_TOKEN = 'abcdefghijklmnopqrstuvwxyz';
const JWT_REFRESH_TOKEN = 'abcdefghijklmnopqrstuvwxyz_0123456789';

/* Bcrypt for hashing passwords. */
const bcrypt = require('bcrypt');
const saltRounds = 10;
let hash = '';

/*bcrypt.genSalt(saltRounds, function(err, salt) {  
	bcrypt.hash(password, salt, function(err, hash) {
		// Store hash in database here
		return hash;
	});
});*/

// Load hash from your password DB.
/*bcrypt.compare(password, hash, (err, res) => {
	if(err){
		console.error(err)
		return;
	}
	console.log(res);	//true or false
	return res;
});
/* END-Bcrypt for hashing passwords. */

app.get(`/`, (req, res) => {
	res.status(200).send('Backend: Express server started successfully.');
});

app.post(`/create`, (req, res) => {
	const { table, first_name, email } = req.body;
	console.log(req.body);
	if (!first_name) return;
		connection.query(`INSERT INTO ${table} (first_name,email) VALUES (?,?);`, [first_name, email], err => {
		if(err){
			throw err;
		}else{
			console.log(`${first_name, email} INSERTED`);
		}
	});
});

app.post('/search', (req, res) => {
	const { table, employee_id, password } = req.body;
	connection.query(`SELECT * FROM ${table} WHERE employee_id = ?`, employee_id, (err, rows, fields) => {
		if(rows.length === 1){
			//console.log(rows);
			const token = jwt.sign(JSON.stringify(rows), JWT_ACCESS_TOKEN);
			res.json({
				token,
				rows,
			});
		}else{
			res.status(403);
			res.json({
				message: "Invalid Login.",
			});
		}
	});
});

app.post('/get_all',  (req, res) => {
	let {table} = req.body;
	//console.log('req: ', req.body);
	connection.query(`SELECT * FROM ${table};`, (err, rows, fields) => {
		if(err){
			console.log('Error:', err);
		}
		else{
			res.status(200).send(rows);
		}
	});
});

app.post('/getOneRow', (req, res) => {
	const {table} = req.body;
	connection.query(`SELECT * FROM ${table};`, (err, rows, fields) => {
		if(err){throw err;}
		else{
			res.status(200).send(rows);
		}
	});
});

app.delete('/delete_one', (req, res) => {
	const { id, table } = req.body;
	if (!id) return res.status(400).send({status: 400, message: 'Id is required'});
	connection.query(`DELETE FROM ${table} WHERE id = ?`, id, (err, rows, fields) => {
		if(err){throw err;}
		else{
			console.log(`Row/s deleted: ${rows.affectedRows}`);
			res.status(200).send({success: true});
		}
	});
});

app.put('/updateOne/:id', (req, res) => {
	const { table, first_name, email } = req.body;
	const { id } = req.params;
	console.log(req.body);
	if(!first_name) return;
		connection.query(`UPDATE ${table} SET first_name=?, email=? WHERE id = ?`, [first_name, email, id], err => {
	if(err) throw err;
		console.log(`You modify row number ${id} for ${first_name}`);
	});
	console.log(`ID: ${id} first_name: ${first_name}`);
});

app.post('/login', (req, res) => {
	const {user_id, password, table} = req.body;
	connection.query(`SELECT * FROM ${table} WHERE user_id = ?`, [user_id], (err, rows, fields) => {
		if(rows.length === 1){
			console.log("ID present.");
			hash = rows[0].password;
			console.log(`USER_ID: ${rows[0].user_id} & PW: ${rows[0].password}`);
			bcrypt.compare(password, hash, function(err, result){
				if(result){
					console.log("PW present.");
					//console.log(`Bearer ${this.token}`);
					const token = jwt.sign(JSON.stringify(rows), JWT_ACCESS_TOKEN);
					//const token = jwt.sign(JSON.stringify(rows), JWT_ACCESS_TOKEN"A SECRET KEY FROM ENVIRONMENT VARIABLE SHOULD COME HERE");
					res.json({
						token,
						rows,
					});
				}
				else{
					console.log("Invalid password.");
					res.status(403);
					res.json({
						message: "Password doesn't match.",
					});
				}
			});
		}else if(rows.length === 0){
			res.status(404);
			res.json({
				message: "ID not found.",
			});
		}else{
			res.status(403);
			res.json({
				message: "Invalid Login.",
			});
		}
	});
});

app.post(`/register`, (req, res) => {
	const { user_id, password, table } = req.body;
	console.log(req.body);
	if (!user_id && !password) return;
		/*const hash2 = this.bcrypt.genSalt(10);*/
		bcrypt.genSalt(saltRounds, function(err, salt) {  
			bcrypt.hash(password, salt, function(err, hash) {
				// Store hash in database here
				console.log(`ID & Hash: ${ user_id, hash }`);
				connection.query(`INSERT INTO ${table} (user_id,password) VALUES (?,?);`, [user_id,hash], err => {
					if(err){
						//throw err;
						res.send(false);
					}else{
						console.log(`${user_id, hash} INSERTED`);
						res.send(true);
					}
			});
		});
	});
});

app.post('hi', (req,res) => {
	const authorization = req.headers;
	const [, token] = authorization.split(" ");
	const is_valid = jwt.verify(token, JWT_ACCESS_TOKEN);
	if(is_valid){
		res.status(200).send("Good");
	} else {
		res.status(401).send("Unauthorized Login");
	}
});

app.listen(port, err => {
	if (err) throw err;
		console.log(`Server is listening on ${port}`);
});