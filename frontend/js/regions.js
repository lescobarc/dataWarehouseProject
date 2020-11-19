let token = localStorage.token;

//Table
let table = document.querySelector('#regionsTable tbody')
let regionsSection = document.getElementById('citySection');
let tableContacts = document.getElementById('tableContacts');
let bodyTableContacts = document.getElementById('bodyTableContacts')

//REGIONS
//create
let createButtonRegion = document.getElementById('createButtonRegion');
let cancelButtonRegion = document.getElementById('cancelButtonRegion');
let addButtonRegion = document.getElementById('addButtonRegion');
let createRegionSection = document.getElementById('createRegion');
let nameRegion = document.getElementById('nameRegion')
//update
let nameRegionUp = document.getElementById('nameRegionUp');
let updateRegionSection = document.getElementById('updateRegionSection');
let cancelButtonUpRegion = document.getElementById('cancelButtonUpRegion');
let createButtonUpRegion = document.getElementById('createButtonUpRegion');
//delete
let deleteRegionsSection = document.getElementById('deleteRegionsSection');
let cancelButtonDeleteRegion = document.getElementById('cancelButtonDeleteRegion');
let deleteButtonDeleteRegion = document.getElementById('deleteButtonDeleteRegion')


//COUNTRIES
//create
let sectionCountries = document.getElementById('countries');
let createButtonCountry = document.getElementById('createButtonCountry');
let cancelButtonCountry = document.getElementById('cancelButtonCountry');
let addButtonCountry = document.getElementById('addButtonCountry');
let createCountrySection = document.getElementById('createCountry');
let nameCountry = document.getElementById('nameCountry');
//update
let nameCountryUp = document.getElementById('nameCountryUp');
let updateCountrySection = document.getElementById('updateCountrySection');
let cancelButtonUpCountry = document.getElementById('cancelButtonUpCountry');
let createButtonUpCountry = document.getElementById('createButtonUpCountry');
//delete
let deleteCountriesSection = document.getElementById('deleteCountriesSection');
let cancelButtonDeleteCountry = document.getElementById('cancelButtonDeleteCountry');
let deleteButtonDeleteCountry = document.getElementById('deleteButtonDeleteCountry')

//CITIES
//create
let sectionCities = document.getElementById('cities');
let createButtonCity = document.getElementById('createButtonCity');
let cancelButtonCity = document.getElementById('cancelButtonCity');
let addButtonCity = document.getElementById('addButtonCity');
let createCitySection = document.getElementById('createCity');
let nameCity = document.getElementById('nameCity')
//update
let nameCityUp = document.getElementById('nameCityUp');
let updateCitySection = document.getElementById('updateCitySection');
let cancelButtonUpCity = document.getElementById('cancelButtonUpCity');
let createButtonUpCity = document.getElementById('createButtonUpCity');
//delete
let deleteCitiesSection = document.getElementById('deleteCitiesSection');
let cancelButtonDeleteCity = document.getElementById('cancelButtonDeleteCity');
let deleteButtonDeleteCity = document.getElementById('deleteButtonDeleteCity')


//REGIONS

//1. get regions
function getRegions() {
    fetch('http://localhost:3000/regions', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    const row = document.createElement('li');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.innerHTML += `
             <h2> <span class="caret" onclick = "getCountries(this)" id ="${res[i].region_id}"> ${res[i].nameRegion} </span>
            <i class="fas fa-trash" id= "${res[i].region_id}" onclick = "showDeleteRegion(this)"></i>
            <i class="fas fa-pencil-alt" id= "${res[i].region_id}" onclick = "showUpdateRegion(this)"></i>
            <i class="fas fa-id-card-alt" id= "${res[i].region_id}" onclick = "showContactsRegion(this)"></i>
              <button class="buttonSecondary buttonLarge" id="${res[i].region_id}" onclick = "postCountry(this)" >Agregar País</button> <h2>
          `;
                    table.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
        })
}
getRegions();

//2. post region
addButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});
createButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});
cancelButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});

createButtonRegion.addEventListener('click', () => {
    fetch('http://localhost:3000/region', {
        method: 'POST',
        body: `{"nameRegion":"${nameRegion.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }

    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Created');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        } else if (res.status == 405) {
            res.json().then((data) => {
                alert('Region Exist');
            });
        }
    })

});

// 3. Put Region
function showUpdateRegion(i) {
    let idRegion = i.id
    updateRegionSection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpRegion.addEventListener('click', () => {
        updateRegions(idRegion)
    });
}


function updateRegions(idRegion) {
    fetch(`http://localhost:3000/region/${idRegion}`, {
        method: 'PUT',
        body: `{"nameRegion":"${nameRegionUp.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Updated');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        }
        else if (res.status == 404) {
            res.json().then((data) => {
                alert('Region Not Found');
            });
        }
    })

    updateRegionSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
}

cancelButtonUpRegion.addEventListener('click', () => {
    updateRegionSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
})


//4. Delete Region
cancelButtonDeleteRegion.addEventListener('click', () => {
    deleteRegionsSection.classList.toggle('hidden');
    regionsSection.classList.remove('hidden');
});

function showDeleteRegion(i) {
    let id = i.id
    deleteRegionsSection.classList.toggle('hidden')
    deleteButtonDeleteRegion.addEventListener('click', () => {
        deleteRegion(id)
    });
}


function deleteRegion(id) {
    fetch(`http://localhost:3000/region/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Deleted');
            });
            location.reload()
        } else if (res.status == 404) {
            res.json().then((data) => {
                alert('Region Not Found');
            });
        }

        deleteRegionsSection.classList.add('hidden');
        regionsSection.classList.remove('hidden');
        location.reload()
    })
}


//5. get contacts region_id
function showContactsRegion(i) {
    region_id = i.id;
    fetch(`http://localhost:3000/contacts/regions/${region_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " ";
            let contact = res;
            if (res) {
                for (let i = 0; i < contact.length; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>${contact[i].name} ${contact[i].lastname} <br> <span> ${contact[i].email} </span> </td>
                <td> ${contact[i].nameCountry} <br><span> ${contact[i].nameRegion}</span> </td>
                <td>${contact[i].nameCompany}</td>
                <td>${contact[i].position}</td>
                <td class ="interes interest${contact[i].interest}"><div >${contact[i].interest}%</div>
                <div class="progressBar">
                                <div class="progressBar${contact[i].interest}"></div>
                </div>
                </td>
            `;
                    bodyTableContacts.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }

        })

}


//COUNTRIES

//1. get Countries
function getCountries(i) {
    region_id = i.id;
    fetch(`http://localhost:3000/countries/${region_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            let validateSearchCountry = document.getElementById(`sectionCountries${region_id}`);
            if (res && validateSearchCountry == null) {
                const ul = document.createElement('ul');
                ul.setAttribute('id', `sectionCountries${region_id}`)
                sectionCountries.appendChild(ul)
                for (let i = 0; i < res.length; i++) {
                    const liCountry = document.createElement('li');
                    liCountry.setAttribute('id', `liCountry${res[i].country_id}`)
                    liCountry.innerHTML += `
                    <h4> <span class="caret" onclick = "getCities(this)" id ="${res[i].country_id}"> ${res[i].nameCountry}  </span> 
                     <i class="fas fa-trash" id= "${res[i].country_id}" onclick = "showDeleteCountry(this)"></i>
                     <i class="fas fa-pencil-alt" id= "${res[i].country_id}" onclick = "showUpdateCountry(this)"></i>
                     <i class="fas fa-id-card-alt" id= "${res[i].country_id}" onclick = "showContactsCountry(this)"></i>
                     <button class="buttonTerciary buttonLarge" id="${res[i].country_id}" onclick = "postCity(this)">Agregar Ciudad</button><h4>
            `;
                    document.getElementById(`rowRegion${region_id}`).appendChild(liCountry);
                }
            } else {
                console.log('Search Realized');
                for (let i = 0; i < res.length; i++) {
                    rowDelete = document.getElementById(`liCountry${res[i].country_id}`)
                    rowDelete.classList.toggle('hidden')
                }
            }
        })

}

//2. post country
createButtonCountry.addEventListener('click', () => {
    createCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});
cancelButtonCountry.addEventListener('click', () => {
    createCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});

function postCountry(i) {
    let id = i.id
    createCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonCountry.addEventListener('click', () => {
        createCountry(id)
    });
}


function createCountry(id) {
    fetch(`http://localhost:3000/country/${id}`, {
        method: 'POST',
        body: `{"nameCountry":"${nameCountry.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Created');
            });
            location.reload()
        } else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        } else if (res.status == 405) {
            res.json().then((data) => {
                alert('Country Exist');
            });
        }
    })
};

// 3. Put Country
function showUpdateCountry(i) {
    let idCountry = i.id
    updateCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpCountry.addEventListener('click', () => {
        updateCountries(idCountry)
    });
}


function updateCountries(idCountry) {
    fetch(`http://localhost:3000/country/${idCountry}`, {
        method: 'PUT',
        body: `{"nameCountry":"${nameCountryUp.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Updated');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        }
        else if (res.status == 404) {
            res.json().then((data) => {
                alert('Country Not Found');
            });
        }
    })
    updateCountrySection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
}

cancelButtonUpCountry.addEventListener('click', () => {
    updateCountrySection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
});

//4. Delete Country
cancelButtonDeleteCountry.addEventListener('click', () => {
    deleteCountriesSection.classList.toggle('hidden');
    regionsSection.classList.remove('hidden');
});

function showDeleteCountry(i) {
    let id = i.id
    deleteCountriesSection.classList.toggle('hidden')

    deleteButtonDeleteCountry.addEventListener('click', () => {
        deleteCountry(id)
    });
}


function deleteCountry(id) {
    fetch(`http://localhost:3000/country/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Deleted');
            });
            location.reload()
        } else if (res.status == 404) {
            res.json().then((data) => {
                alert('Country Not Found');
            });
        }
    })
    deleteCountriesSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
    location.reload()
}

//5. get contacts country_id
function showContactsCountry(i) {
    country_id = i.id;
    fetch(`http://localhost:3000/contacts/countries/${country_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " "
            let contact = res;
            if (res) {
                for (let i = 0; i < contact.length; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>${contact[i].name} ${contact[i].lastname} <br> <span> ${contact[i].email} </span> </td>
                <td> ${contact[i].nameCountry} <br><span> ${contact[i].nameRegion}</span> </td>
                <td>${contact[i].nameCompany}</td>
                <td>${contact[i].position}</td>
                <td class ="interes interest${contact[i].interest}"><div >${contact[i].interest}%</div>
                <div class="progressBar">
                                <div class="progressBar${contact[i].interest}"></div>
                </div>
                </td>
            `;
                    bodyTableContacts.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
        })
}



//CITIES

//1. get cities
function getCities(i) {
    country_id = i.id
    fetch(`http://localhost:3000/cities/${country_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            let validateSearchCity = document.getElementById(`sectionCities${country_id}`);
            if (res && validateSearchCity == null) {
                const ulCity = document.createElement('ul');
                ulCity.setAttribute('id', `sectionCities${country_id}`)
                ulCity.setAttribute('class', '')
                sectionCities.appendChild(ulCity)
                for (let i = 0; i < res.length; i++) {
                    const liCity = document.createElement('li');
                    liCity.setAttribute('id', `liCity${res[i].city_id}`)
                    liCity.innerHTML += `
                  <p>  <span class=""> ${res[i].nameCity} </span>
                     <i class="fas fa-trash" id= "${res[i].city_id}" onclick = "showDeleteCity(this)"> </i>
                     <i class="fas fa-pencil-alt" id= "${res[i].city_id}" onclick = "showUpdateCity(this) "></i>
                     <i class="fas fa-id-card-alt" id= "${res[i].city_id}" onclick = "showContactsCity(this)"></i> <p>`;
                    document.getElementById(`liCountry${country_id}`).appendChild(liCity);
                }
            } else {
                console.log('Search Realized');
                for (let i = 0; i < res.length; i++) {
                    rowDelete = document.getElementById(`liCity${res[i].city_id}`);
                    rowDelete.classList.toggle('hidden');
                }
            }

        })
};

//2. post city
createButtonCity.addEventListener('click', () => {
    createCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});
cancelButtonCity.addEventListener('click', () => {
    createCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
});

function postCity(i) {
    let id = i.id
    createCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonCity.addEventListener('click', () => {
        createCity(id)
    });
}

function createCity(id) {
    fetch(`http://localhost:3000/city/${id}`, {
        method: 'POST',
        body: `{"nameCity":"${nameCity.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Created');
            });
            location.reload()
        } else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        } else if (res.status == 405) {
            res.json().then((data) => {
                alert('City Exist');
            });
        }
    })
};

// 3. Put City

function showUpdateCity(i) {
    let idCity = i.id
    updateCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpCity.addEventListener('click', () => {
        updateCities(idCity)
    });
}


function updateCities(idCity) {
    fetch(`http://localhost:3000/city/${idCity}`, {
        method: 'PUT',
        body: `{"nameCity":"${nameCityUp.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Updated');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                alert('Missing Arguments');
            });
        }
        else if (res.status == 404) {
            res.json().then((data) => {
                alert('City Not Found');
            });
        }
    })
    updateCitySection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
}

cancelButtonUpCity.addEventListener('click', () => {
    updateCitySection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
});


//4. Delete City
cancelButtonDeleteCity.addEventListener('click', () => {
    deleteCitiesSection.classList.toggle('hidden');
    regionsSection.classList.remove('hidden');
});

function showDeleteCity(i) {
    let id = i.id
    deleteCitiesSection.classList.toggle('hidden')
    deleteButtonDeleteCity.addEventListener('click', () => {
        deleteCity(id)
    });
}


function deleteCity(id) {
    fetch(`http://localhost:3000/city/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        if (res.status == 200) {
            res.json().then((data) => {
                alert('Deleted');
            });
            location.reload()
        } else if (res.status == 404) {
            res.json().then((data) => {
                alert('City Not Found');
            });
        }
    })

    deleteCitiesSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');
    location.reload()
}

//5. get contacts city_id
function showContactsCity(i) {
    city_id = i.id;
    fetch(`http://localhost:3000/contacts/cities/${city_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " "
            let contact = res;
            if (res) {
                for (let i = 0; i < contact.length; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>${contact[i].name} ${contact[i].lastname} <br> <span> ${contact[i].email} </span> </td>
                <td> ${contact[i].nameCountry} <br><span> ${contact[i].nameRegion}</span> </td>
                <td>${contact[i].nameCompany}</td>
                <td>${contact[i].position}</td>
                <td class ="interes interest${contact[i].interest}"><div >${contact[i].interest}%</div>
                <div class="progressBar">
                                <div class="progressBar${contact[i].interest}"></div>
                </div>
                </td> `;
                    bodyTableContacts.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
        })
}

//users header
function usersHeader() {
    fetch('http://localhost:3000/usersHeader', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            if (res == 1) {
                document.getElementById('usersHeader').classList.remove('hidden')

            } else if (res == 0) {
                document.getElementById('usersHeader').classList.add('hidden')
            }
        })
}
usersHeader();