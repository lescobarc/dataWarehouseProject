const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { insertQuery, selectQuery, updateQuery, deleteQuery } = require("../database/sequelize/commons");


//1. post user login token
async function validateCredentials(req, res, next) {
  const { username, password } = req.body;
  if (username, password) {
    const registeredUser = await findUsername(username);
    if (registeredUser) {
      const { pass: dbPassword, isAdmin } = registeredUser;
      if (password === dbPassword) {
        const token = JWT.sign({ username, isAdmin }, signature, { expiresIn: "120m" });
        req.jwtToken = token;
        console.log(JWT.verify(token, signature));
        next();
      } else {
        res.status(401).json("Wrong Password");
      }
    } else {
      res.status(401).json("Invalid Username");
    }
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}

//2. post user
async function existenceUser(req, res, next) {
  const { username } = req.body;
  const dbUsers = await findUsername(username);
  if (!dbUsers) {
    next();
  } else {
    res.status(405).json("Username exist");
  }
}

async function findUsername(username) {
  const query = selectQuery("users", "name, lastname, email, username, pass, repass, isAdmin", `username = '${username}'`);
  const [dbUser] = await sequelize.query(query, { raw: true });
  const foundUser = dbUser[0];
  return foundUser;
}

async function addUser(req, res, next) {
  const { name, lastname, email, username, pass, repass } = req.body;
  if (pass === repass) {
    if (name && lastname && email && username && pass && repass) {
      const query = insertQuery("users", "name, lastname, email, username, pass, repass",
        [name, lastname, email, username, pass, repass]);
      [user_id] = await sequelize.query(query, { raw: true });
      req.createdUserId = user_id;
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }

  }else{
    res.status(406).json("Verify: Password and Corfirmation Password");
  }

}


//3. get info of user
async function infoUser(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  const payload = JWT.decode(token);
  const query = selectQuery("users", "name, lastname, email, username, pass, repass, isAdmin", `userName = '${payload.username}'`);
  const [dbUser] = await sequelize.query(query, { raw: true });
  const foundUser = dbUser[0];
  req.user = foundUser;
  next();
}

//4. get users
async function listUsers(req, res, next) {
  const query = selectQuery("users", "user_id, name, lastname, email, username, pass, repass, isAdmin");
  const [users] = await sequelize.query(query, { raw: true });
  req.usersList = [users];
  next();
}


// get info of UserUp
async function infoUserUp(req, res, next) {
  let id = req.params.value;
 const query = selectQuery("users", "name, lastname, email, username, pass, repass, isAdmin", `user_id = '${id}'`)
  const [dbUser] = await sequelize.query(query, { raw: true });
  const foundUser = dbUser[0];
  req.user = foundUser;
  next();
}


//5. Update user 
async function putUser(req, res, next) {
  const { name, lastname, email, username } = req.body;
  let id = req.params.value;
  if (id) {
    const userToUpdate = await findUserById(id);
    if ( name!== "" && lastname !== "" && email !== "") {
      const query = updateQuery("users", `name = '${name}',lastname = '${lastname}', email= '${email}', username = '${username}'`, `user_id = '${id}'`);
      const [userPut] = await sequelize.query(query, { raw: true });
      req.updatedUser = { name, lastname, email };
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
    next();
  } else {
    res.status(404).json("User Not Found");
  }
}

async function findUserById(id) {
  const query = selectQuery("users", "*", `user_id = '${id}'`);
  const [dbUser] = await sequelize.query(query, { raw: true });
  const foundUser = dbUser[0];
  return foundUser;
}


//6.delete user
async function deleteUser(req, res, next) {
  let id = req.params.value;
  const findUser = await findUserById(id);
  if (findUser) {
    const query = deleteQuery("users", `user_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("User Not Found");
  }
}


module.exports = { findUsername, addUser, infoUser, putUser, validateCredentials, existenceUser, infoUserUp, listUsers, deleteUser };



