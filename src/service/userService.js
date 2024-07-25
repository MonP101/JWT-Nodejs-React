import bcrypt, { hash } from "bcryptjs";
import mysql from "mysql2";

const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewuser = (email, password, username) => {
  let hashPass = hashUserPassword(password);

  connection.query(
    `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`,
    [email, hashPass, username],
    function (err, result, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query(`SELECT * from users`, function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    console.log(">>> Check result", result);
  });
};

module.exports = {
  createNewuser: createNewuser,
  getUserList: getUserList,
};
