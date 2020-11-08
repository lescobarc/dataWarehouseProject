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
  const { nameRegion } = req.body;
  console.log(req.body)
  console.log(req.body.nameRegion)
  const dbRegions = await findRegion(nameRegion);
  if (!dbRegions) {
    next();
  } else {
    res.status(405).json("Region exist");
  }
}


async function findRegion(nameRegion) {
  console.log(nameRegion)
  const query = selectQuery("regions", "nameRegion", `nameRegion = '${nameRegion}'`);
  const [dbRegions] = await sequelize.query(query, { raw: true });
  const foundRegion = dbRegions[0];
  return foundRegion;
}

async function addRegion(req, res, next) {
  const { nameRegion } = req.body;
  console.log(req.body)
  if (nameRegion) {
    const query = insertQuery("regions", "nameRegion", [nameRegion]);
    [region_id] = await sequelize.query(query, { raw: true });
    console.log(region_id)
    req.createdRegionId = region_id;
    console.log(region_id)
    next();
  } else {
    res.status(400).json("Bad Request: Missing Arguments");
  }

}
//3. Update Region
async function putRegion(req, res, next) {
  const { nameRegion } = req.body;
  console.log(nameRegion)
  let id = req.params.region_id;
  console.log(id)

  if (id) {
    const regionToUpdate = await findRegionById(id);
    console.log(regionToUpdate)
    if (nameRegion !== "") {
      const query = updateQuery("regions", `nameRegion = '${nameRegion}'`, `region_id = '${id}'`);
      console.log(nameRegion)
      const [regionPut] = await sequelize.query(query, { raw: true });
      console.log(regionPut)
      req.updatedRegion = { nameRegion };
    } else {
      res.status(400).json("Bad Request: Missing Arguments");
    }
    next();
  } else {
    res.status(404).json("User Not Found");
  }
}

async function findRegionById(id) {
  const query = selectQuery("regions", "*", `region_id = '${id}'`);
  const [dbRegion] = await sequelize.query(query, { raw: true });
  const foundRegion = dbRegion[0];
  console.log(foundRegion)
  return foundRegion;
}
//4.delete region
async function deleteRegion(req, res, next) {
  let id = req.params.region_id;
  console.log(id)
  const findRegion = await findRegionById(id);
  if (findRegion) {
    const query = deleteQuery("regions", `region_id = ${id}`);
    await sequelize.query(query, { raw: true });
    req.isDeleted = true;
    next();
  } else {
    res.status(404).json("Region Not Found");
  }
}

//COUNTRIES

//1. get countries
async function listCountriesByRegion(req, res, next) {
  let id = req.params.region_id;
  const query = joinQuery("countries", "nameCountry", "regions", "region_id", `${id}`, "country_id")
  const [countries] = await sequelize.query(query, { raw: true });
  req.countriesList = countries;
  next();
}

//2. post country
async function existenceCountry(req, res, next) {
  const { nameCountry } = req.body;
  const region_id = req.params.region_id;
  console.log(req.body)
  const dbCountries = await findCountry(nameCountry);
  if (!dbCountries) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}

async function findCountry(nameCountry) {
  console.log(nameCountry)
  const query = selectQuery("countries", "nameCountry, region_id", `nameCountry = '${nameCountry}'`);
  const [dbCountries] = await sequelize.query(query, { raw: true });
  const foundCountry = dbCountries[0];
  return foundCountry;
}

async function addCountry(req, res, next) {
  const { nameCountry } = req.body;
  const region_id = req.params.region_id;
  if (nameCountry !== "" && region_id !== "") {
    const query = insertQuery("countries", "nameCountry, region_id",
      [nameCountry, region_id]);
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
  const { nameCountry } = req.body;
  console.log(nameCountry)
  let id = req.params.country_id;
  console.log(id)

  if (id) {
    const countryToUpdate = await findCountryById(id);
    console.log(countryToUpdate)
    if (nameCountry !== "") {
      const query = updateQuery("countries", `nameCountry = '${nameCountry}'`, `country_id = '${id}'`);
      console.log(nameCountry)
      const [countryPut] = await sequelize.query(query, { raw: true });
      console.log(countryPut)
      req.updatedCountry = { nameCountry };
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
  const query = joinQuery("cities", "nameCity", "countries", "country_id", `${id}`, "city_id")
  const [cities] = await sequelize.query(query, { raw: true });
  req.citiesList = cities;
  next();
}

//2. post city
async function existenceCity(req, res, next) {
  const { nameCity } = req.body;
  const country_id = req.params.country_id;
  console.log(nameCity);
  console.log(country_id)

  console.log(req.body)
  const dbCities = await findCity(nameCity);
  if (!dbCities) {
    next();
  } else {
    res.status(405).json("Country exist");
  }
}


async function findCity(nameCity) {
  console.log(nameCity)
  const query = selectQuery("cities", "nameCity, country_id", `nameCity = '${nameCity}'`);
  const [dbCities] = await sequelize.query(query, { raw: true });
  const foundCity = dbCities[0];
  console.log(foundCity)
  return foundCity;
}

async function addCity(req, res, next) {
  const { nameCity } = req.body;
  const country_id = req.params.country_id;
  console.log(nameCity);
  console.log(country_id)
  if (nameCity !== "" && country_id !== "") {
    const query = insertQuery("cities", "nameCity, country_id",
      [nameCity, country_id]);
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
  const { nameCity } = req.body;
  console.log(nameCity)
  let id = req.params.city_id;
  console.log(id)

  if (id) {
    const cityToUpdate = await findCityById(id);
    console.log(cityToUpdate)
    if (nameCity !== "") {
      const query = updateQuery("cities", `nameCity = '${nameCity}'`, `city_id = '${id}'`);
      console.log(nameCity)
      const [cityPut] = await sequelize.query(query, { raw: true });
      console.log(cityPut)
      req.updatedCity = { nameCity };
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


module.exports = { listRegions, existenceRegion, addRegion, putRegion, deleteRegion, listCountriesByRegion, existenceCountry, addCountry, putCountry, listCitiesByCountry, deleteCountry, existenceCity, addCity, putCity, deleteCity };




