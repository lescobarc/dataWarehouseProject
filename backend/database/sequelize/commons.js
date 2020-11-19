const { sequelize } = require("./config");
require('dotenv').config();
const dbName = process.env.dbName

function useQuery() {
  const query = "USE" + dbName;
  return query;
}

function insertQuery(table, properties, values) {
  const dataToInsert = values.map((value) => `'${value}'`).join(",");
  const query = `INSERT INTO ${dbName}.${table} (${properties}) VALUES (${dataToInsert})`;
  return query;
}

function selectQuery(table, columns = "*", conditions = null) {
  const query =
  `SELECT ${columns} FROM ${dbName}.${table}` +
  ` ${conditions ? `WHERE ${conditions}` : ""}`;
  return query;
}

function updateQuery(table, changes, conditions) {
  const query =
  `UPDATE ${dbName}.${table} SET ${changes}` + `WHERE ${conditions}`;
  return query;
}

function deleteQuery(table, conditions) {
  const query = `DELETE FROM ${dbName}.${table} WHERE ${conditions}`;
  return query;
}

function joinQuery(dbName1, column1, dbName2, column2, id, column3  ){
  const query = `SELECT ${dbName1}.${column1}, ${dbName1}.${column3} FROM ${dbName1} JOIN ${dbName2} ON ${dbName1}.${column2} = ${dbName2}.${column2} WHERE ${dbName2}.${column2} = ${id} ` 
 return query;
}




module.exports = {deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery};