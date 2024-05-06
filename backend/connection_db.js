const { query } = require('express');
const mysql = require('mysql2/promise');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "police_administration"
    });

    console.log("Connected to MySQL");

    return connection; // Return the connection object
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error; // Propagate the error
  }
}



  module.exports = connectToDatabase;