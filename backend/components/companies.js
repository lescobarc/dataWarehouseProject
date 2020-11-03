const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");

//1. post company
async function existenceCompany(req, res, next) {
    const { name } = req.body;
    console.log(req.body)
    const dbCompanies = await findCompanyName(name);
    if (!dbCompanies) {
      next();
    } else {
      res.status(405).json("Company exist");
    }
  }
  
  async function findCompanyName(name) {
    const query = selectQuery("companies", "name, address, email, tel, region_id, country_id, city_id", `name = '${name}'`);
    const [dbCompanies] = await sequelize.query(query, { raw: true });
    const foundCompany = dbCompanies[0];
    return foundCompany;
  }
  
  async function addCompany(req, res, next) {
    const { name, address, email, tel, region_id, country_id, city_id } = req.body;
    if (name && address && email && tel && region_id && email && region_id && country_id && city_id) {
      const query = insertQuery("companies", "name, address, email, tel, region_id, country_id, city_id",
        [name, address, email, tel, region_id, country_id, city_id]);
      [companyId] = await sequelize.query(query, { raw: true });
      req.createdCompanyId = companyId;
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
  }

  
module.exports = { findCompanyName, addCompany, existenceCompany/*  putUser, validateCredentials, existenceUser,  infoUser, listUsers  */};