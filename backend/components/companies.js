const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { deleteQuery, insertQuery, joinQuery, selectQuery, updateQuery, useQuery } = require("../database/sequelize/commons");


//1. get companies
async function listCompanies(req, res, next) {
  const query = selectQuery("companies", "*");
  const [companies] = await sequelize.query(query, { raw: true });
  req.companiesList = [companies];
  next();
}

//2. post company
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
    if (name && address  && email && tel  && region_id && country_id && city_id ) {
      const query = insertQuery("companies", "name, address, email, tel, region_id, country_id, city_id ",
        [name, address, email, tel, region_id, country_id, city_id]);
      [companyId] = await sequelize.query(query, { raw: true });
      req.createdCompanyId = companyId;
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
  }

  
//3. Update company
async function putCompany(req, res, next) {
  const {name, address, email, tel, region_id, country_id, city_id} = req.body;

  let id = req.params.value;
  console.log(id)
 
  if (id) {
      const companyToUpdate = await findCompanyById(id);
      console.log(companyToUpdate)
      if( name !== "" && address !== "" && email !== "" && tel !== "" && region_id !== "" && country_id !== "" && city_id !== "" ) {
        const query = updateQuery("companies", `name = '${name}', address = '${address}',  email= '${email}', tel = '${tel}', region_id = '${region_id}', country_id = '${country_id}', city_id = '${city_id}'`, `company_id = '${id}'`);
        console.log(name)
        const [companyPut] = await sequelize.query(query, { raw: true });
        console.log(companyPut)
        req.updatedCompany = { name, address, email, tel, region_id, country_id, city_id };
      } else {
        res.status(400).json("Bad Request: Missing Arguments");
      }
      next();
    } else {
      res.status(404).json("User Not Found");
    }
  } 

  async function findCompanyById(id) {
    const query = selectQuery("companies", "*", `company_id = '${id}'`);
    const [dbCompanies] = await sequelize.query(query, { raw: true });
    const foundCompany = dbCompanies[0];
    console.log(foundCompany)
    return foundCompany;
  }

  //6.delete company
  async function deleteCompany(req, res, next) {
    let id = req.params.value;
    console.log(id)
    const findCompany = await findCompanyById(id);
    if (findCompany) {
      const query = deleteQuery("companies", `company_id = ${id}`);
      await sequelize.query(query, { raw: true });
      req.isDeleted = true;
      next();
    } else {
      res.status(404).json("User Not Found");
    }
  }

module.exports = { findCompanyName, addCompany, existenceCompany, listCompanies, putCompany, deleteCompany};