const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");


//Get companies
async function listCompanies(req, res, next) {
  const company_id = req.params.company_id;
  const query = `SELECT companies.company_id, companies.nameCompany, companies.address, companies.email, companies.tel, regions.nameRegion, countries.nameCountry, cities.nameCity FROM companies INNER JOIN regions ON companies.region_id = regions.region_id INNER JOIN countries ON companies.country_id= countries.country_id INNER JOIN cities ON companies.city_id = cities.city_id`
  const [companies] = await sequelize.query(query, { raw: true });
  req.companiesList = companies;
  next();
}

//Post company
async function existenceCompany(req, res, next) {
  const { nameCompany } = req.body;
  const dbCompanies = await findCompanyName(nameCompany);
  if (!dbCompanies) {
    next();
  } else {
    res.status(405).json("Company exist");
  }
}

async function findCompanyName(nameCompany) {
  const query = selectQuery("companies", "nameCompany, address, email, tel, region_id, country_id, city_id", `nameCompany = '${nameCompany}'`);
  const [dbCompanies] = await sequelize.query(query, { raw: true });
  const foundCompany = dbCompanies[0];
  return foundCompany;
}

async function addCompany(req, res, next) {
  const { nameCompany, address, email, tel, region_id, country_id, city_id } = req.body;
  region = region_id.split(" ");
  const regionId = parseInt(region[0]);
  country = country_id.split(" ");
  const countryId = parseInt(country[0]);
  city = city_id.split(" ");
  const cityId = parseInt(city[0]);

  if (nameCompany && address && email && tel && region_id && country_id && city_id) {
    const query = insertQuery("companies", "nameCompany, address, email, tel, region_id, country_id, city_id ",
      [nameCompany, address, email, tel, regionId, countryId, cityId]);
    [companyId] = await sequelize.query(query, { raw: true });
    req.createdCompanyId = companyId;
    next();
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }
}

//Get info of company
async function infoCompany(req, res, next) {
  let id = req.params.value;
 const query = `SELECT companies.company_id, companies.nameCompany, companies.address, companies.email, companies.tel, companies.region_id, companies.country_id, companies.city_id, regions.nameRegion, countries.nameCountry, cities.nameCity FROM companies INNER JOIN regions ON companies.region_id = regions.region_id INNER JOIN countries ON companies.country_id= countries.country_id INNER JOIN cities ON companies.city_id = cities.city_id where companies.company_id =${id}`
  const [dbCompany] = await sequelize.query(query, { raw: true });
  const foundCompany = dbCompany[0];
  req.company = foundCompany;
  next();
}

//Update company
async function putCompany(req, res, next) {
  const { nameCompany, address, email, tel, region_id, country_id, city_id } = req.body;
  let id = req.params.company_id;
  if (id) {
    const companyToUpdate = await findCompanyById(id);
    if (nameCompany !== "" && address !== "" && email !== "" && tel !== "" && region_id !== "" && country_id !== "" && city_id !== "") {
      const query = updateQuery("companies", `nameCompany = '${nameCompany}', address = '${address}',  email= '${email}', tel = '${tel}', region_id = '${region_id}', country_id = '${country_id}', city_id = '${city_id}'`, `company_id = '${id}'`);
      const [companyPut] = await sequelize.query(query, { raw: true });
      req.updatedCompany = { nameCompany, address, email, tel, region_id, country_id, city_id };
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
    next();
  } else {
    res.status(404).json("Company Not Found");
  }
}

async function findCompanyById(id) {
  const query = selectQuery("companies", "*", `company_id = '${id}'`);
  const [dbCompanies] = await sequelize.query(query, { raw: true });
  const foundCompany = dbCompanies[0];
  return foundCompany;
}

//Delete company
async function deleteCompany(req, res, next) {
  let id = req.params.company_id;
  const findCompany = await findCompanyById(id);
  if (findCompany) {
    const query = deleteQuery("companies", `company_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("Company Not Found");
  }
}

module.exports = { findCompanyName, addCompany, existenceCompany, listCompanies, infoCompany, putCompany,  deleteCompany };