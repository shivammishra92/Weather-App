const mysql = require('mysql');
const cors = require('cors');
//const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser  = require('body-parser');
app.use(cors());

const port = 3000;
const filePath = path.join(__dirname, '/index.html');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var dbConnection =  mysql.createConnection({
    host: 'localhost',
    //port:'3306',
    user: 'root',
    password: '',
    database: 'weather'
});


dbConnection.connect(function(err){
    if(err)throw err;
    console.log("Connection established successfully");
});

app.get('/',(req,res)=>{
        res.sendFile(filePath);
});

app.post('/submit-data',(req,res)=>{
    const {name,temp,humidity,wind_speed} = req.body; // Access the data sent from the frontend

    console.log(name,temp,humidity,wind_speed);

    // SQL query to insert data into a table
    const sql = 'INSERT INTO weather_data (city,temperature,humidity,wind_speed) VALUES (?,?,?,?)';
    const values = [name, temp,humidity,wind_speed]; // Example: accessing values from the request body

    // Execute the SQL query
    dbConnection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('Error inserting data into database');
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully'); // Send a success response back to the frontend
    });
});

app.listen(port,()=>{
    console.log("App listening successfully on port",port);
});