const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { insertQuery, selectQuery, updateQuery, deleteQuery } = require("../database/sequelize/commons");


//REGION
//1. post region

async function existenceRegion(req, res, next) {
    const { name } = req.body;
    console.log(req.body)
    console.log(req.body.name)
    const dbRegions = await findRegion(name);
    if (!dbRegions) {
      next();
    } else {
      res.status(405).json("Region exist");
    }
  }

  
async function findRegion(name) {
  console.log(name)
    const query = selectQuery("regions", "name", `name = '${name}'`);
    const [dbRegions] = await sequelize.query(query, { raw: true });
    const foundRegion = dbRegions[0];
    return foundRegion;
  }
  
  async function addRegion(req, res, next) {
    const {name} = req.body;
      console.log(req.body)
      if (name) {
        const query = insertQuery("regions", "name", [name]);
        [region_id] = await sequelize.query(query, { raw: true });
        console.log(region_id)
        req.createdRegionId = region_id;
        console.log(region_id)
        next();
      } else {
        res.status(400).json("Bad Request: Missing Arguments");
      }

  }

  //COUNTRY 
  
  //1. post country

async function existenceCountry(req, res, next) {
  const { name, region_id } = req.body;
  console.log(req.body)
  const dbCountries = await findCountry(name);
  if (!dbCountries) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}


async function findCountry(name) {
console.log(name)
  const query = selectQuery("countries", "name, region_id", `name = '${name}'`);
  const [dbCountries] = await sequelize.query(query, { raw: true });
  const foundCountry = dbCountries[0];
  return foundCountry;
}

async function addCountry(req, res, next) {
  const {name, region_id} = req.body;
    console.log(req.body)
    if (name) {
      const query = insertQuery("countries", "name, region_id", [name, region_id]);
      [country_id] = await sequelize.query(query, { raw: true });
      console.log(country_id)
      req.createdCountryId = country_id;
      console.log(country_id)
      next();
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }

}


  module.exports = { existenceRegion,  addRegion, existenceCountry,  addCountry };