const { sequelize } = require("../database/sequelize/config");
const { JWT, signature } = require("./auth");
const { insertQuery, selectQuery, updateQuery, deleteQuery, joinQuery } = require("../database/sequelize/commons");


//REGIONS

//1. get regions
async function listRegions(req, res, next) {
  const query = selectQuery("regions", "*");
  const [regions] = await sequelize.query(query, { raw: true });
  req.regionsList = regions;
  next();
}

//2. post region
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
  const { name } = req.body;
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

//COUNTRIES

//1. get countries
async function listCountriesByRegion(req, res, next) {
  let id = req.params.region_id;
  const query = joinQuery("countries", "name", "regions", "region_id", `${id}`, "country_id")
  const [countries] = await sequelize.query(query, { raw: true });
  req.countriesList = countries;
  next();
}



//2. post country
async function existenceCountry(req, res, next) {
  const { name } = req.body;
  const region_id = req.params.region_id;
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
  const { name } = req.body;
  const region_id = req.params.region_id;
  if (name !== "" && region_id !== "") {
    const query = insertQuery("countries", "name, region_id",
      [name, region_id]);
    [country_id] = await sequelize.query(query, { raw: true });
    console.log(country_id)
    req.createdCountryId = country_id;
    console.log(country_id)
    next();
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }

}

//3. Update country
async function putCountry(req, res, next) {
  const { name } = req.body;
  console.log(name)
  let id = req.params.country_id;
  console.log(id)

  if (id) {
    const countryToUpdate = await findCountryById(id);
    console.log(countryToUpdate)
    if (name !== "") {
      const query = updateQuery("countries", `name = '${name}'`, `country_id = '${id}'`);
      console.log(name)
      const [countryPut] = await sequelize.query(query, { raw: true });
      console.log(countryPut)
      req.updatedCountry = { name };
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
    next();
  } else {
    res.status(404).json("User Not Found");
  }
}

async function findCountryById(id) {
  const query = selectQuery("countries", "*", `country_id = '${id}'`);
  const [dbCountry] = await sequelize.query(query, { raw: true });
  const foundCountry = dbCountry[0];
  console.log(foundCountry)
  return foundCountry;
}

//4.delete country
async function deleteCountry(req, res, next) {
  let id = req.params.country_id;
  console.log(id)
  const findCountry = await findCountryById(id);
  if (findCountry) {
    const query = deleteQuery("countries", `country_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("Country Not Found");
  }
}



//CITIES

//1. get cities
async function listCitiesByCountry(req, res, next) {
  let id = req.params.country_id;
  const query = joinQuery("cities", "name", "countries", "country_id", `${id}`, "city_id")
  const [cities] = await sequelize.query(query, { raw: true });
  req.citiesList = cities;
  next();
}

//2. post city
async function existenceCity(req, res, next) {
  const { name } = req.body;
  const country_id = req.params.country_id;
  console.log(name);
  console.log(country_id)

  console.log(req.body)
  const dbCities = await findCity(name);
  if (!dbCities) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}


async function findCity(name) {
  console.log(name)
  const query = selectQuery("cities", "name, country_id", `name = '${name}'`);
  const [dbCities] = await sequelize.query(query, { raw: true });
  const foundCity = dbCities[0];
  console.log(foundCity)
  return foundCity;
}

async function addCity(req, res, next) {
  const { name } = req.body;
  const country_id = req.params.country_id;
  console.log(name);
  console.log(country_id)
  if (name !== "" && country_id !== "") {
    const query = insertQuery("cities", "name, country_id",
      [name, country_id]);
    [city_id] = await sequelize.query(query, { raw: true });
    console.log(city_id)
    req.createdCityId = city_id;
    console.log(city_id)
    next();
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }

}

//3. Update city
async function putCity(req, res, next) {
  const { name } = req.body;
  console.log(name)
  let id = req.params.city_id;
  console.log(id)

  if (id) {
    const cityToUpdate = await findCityById(id);
    console.log(cityToUpdate)
    if (name !== "") {
      const query = updateQuery("cities", `name = '${name}'`, `city_id = '${id}'`);
      console.log(name)
      const [cityPut] = await sequelize.query(query, { raw: true });
      console.log(cityPut)
      req.updatedCity = { name };
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
    next();
  } else {
    res.status(404).json("User Not Found");
  }
}

async function findCityById(id) {
  const query = selectQuery("cities", "*", `city_id = '${id}'`);
  const [dbCity] = await sequelize.query(query, { raw: true });
  const foundCity = dbCity[0];
  console.log(foundCity)
  return foundCity;
}

//4.delete city
async function deleteCity(req, res, next) {
  let id = req.params.city_id;
  console.log(id)
  const findCity = await findCityById(id);
  if (findCity) {
    const query = deleteQuery("cities", `city_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("City Not Found");
  }
}


module.exports = { listRegions, existenceRegion, addRegion, listCountriesByRegion, existenceCountry, addCountry, putCountry, listCitiesByCountry, deleteCountry, existenceCity, addCity, putCity, deleteCity };




