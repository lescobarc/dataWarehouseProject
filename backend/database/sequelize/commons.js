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

function joinQuery(mainTable, columns, joiners, conditions) {
  const fullJoiners = joiners
    .map((element) => `JOIN ${dbName}.${element} `)
    .toString()
    .replace(/,/g, "");
  const query =
    `SELECT ${columns} FROM ${dbName}.${mainTable}` +
    ` ${fullJoiners}` +
    `${conditions ? `WHERE ${conditions}` : ""}`;
  return query;
}


module.exports = {deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery};
