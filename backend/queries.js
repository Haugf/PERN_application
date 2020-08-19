const pg = require("pg");

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
};

const pool = new pg.Pool(config);

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.log(pool);
      throw error;
    }
    response.status(200).json(JSON.stringify(results.rows));
  });
};

const setUser = (request, response) => {
  const { username, info } = request.body;
  pool.query(
    `INSERT INTO users (username, info) VALUES ('${username}', '${info}')`,
    error => {
      if (error) {
        if (error.code === "23505") {
          response.status(409).json({ error: "Username already exists." });
        } else {
          console.log(error);
          response.status(500).json("Internal server error");
        }
      } else {
        response.status(201).json();
      }
    }
  );
};

const updateUser = (request, response) => {
  const { username, info } = request.body;
  pool.query(
    `UPDATE users SET info = '${info}' WHERE username = '${username}'`,
    error => {
      if (error) {
        console.log(error);
        response.status(500).json("Internal server error");
      } else {
        response.status(201).json();
      }
    }
  );
};

const deleteUser = (request, response) => {
  const { username } = request.body;
  pool.query(`DELETE FROM users WHERE username = '${username}'`, error => {
    if (error) {
      if (error.code === "23505") {
        response.status(409).json({ error: "Username doesn't exist." });
      } else {
        console.log(error);
        response.status(500).json("Internal server error");
      }
    } else {
      response.status(201).json();
    }
  });
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser
};
