const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'seng513'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

con.query('SELECT * FROM employees', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});

const employee = { name: 'Winnie', location: 'Australia' };
con.query('INSERT INTO employees SET ?', employee, (err, res) => {
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});
con.query(
  'UPDATE employees SET location = ? Where ID = ?',
  ['South Africa', 5],
  (err, result) => {
    if (err) throw err;

    console.log(`Changed ${result.changedRows} row(s)`);
  }
);

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
