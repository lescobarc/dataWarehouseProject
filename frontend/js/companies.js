let token = localStorage.token;

//Table 
let table = document.querySelector('#companiesTable tbody')
let companiesSection = document.getElementById('companiesSection');

//COMPANIES
//create
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let createCompanySection = document.getElementById('createCompanySection');
let regionCompany = document.getElementById('regionCompany');
let countryCompany = document.getElementById('countryCompany');
let cityCompany = document.getElementById('cityCompany');
let nameCompany = document.getElementById('nameCompany');
let addressCompany = document.getElementById('addressCompany');
let emailCompany = document.getElementById('emailCompany');
let telCompany = document.getElementById('telCompany');

//update
let createButtonUp = document.getElementById('createButtonUp');
let cancelButtonUp = document.getElementById('cancelButtonUp');
let updateCompanySection = document.getElementById('updateCompanySection');
let regionCompanyUp = document.getElementById('regionCompanyUp');
let countryCompanyUp = document.getElementById('countryCompanyUp');
let cityCompanyUp = document.getElementById('cityCompanyUp');
let nameCompanyUp = document.getElementById('nameCompanyUp');
let addressCompanyUp = document.getElementById('addressCompanyUp');
let emailCompanyUp = document.getElementById('emailCompanyUp');
let telCompanyUp = document.getElementById('telCompanyUp'); 

//delete
let deleteCompaniesSection = document.getElementById('deleteCompaniesSection');
let cancelButtonDeleteCompany = document.getElementById('cancelButtonDeleteCompany');
let deleteButtonDeleteCompany = document.getElementById('deleteButtonDeleteCompany')


//1. get companies
function getCompanies() {
    fetch('http://localhost:3000/companies', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log('este')
            console.log(res)
            let company = res;
            if (res) {
                for (let i = 0; i < company.length; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact');
                    row.setAttribute('class', 'arrow');
                    row.setAttribute('id', `arrow${i}`);
                    row.innerHTML += `
                <td>  <input type="checkbox" onclick="contar(this, ${i})" name="check"> </td>
                <td>${company[i].nameCompany}</td>
                <td>${company[i].address}</td>
                <td>${company[i].email}</td>
                <td>${company[i].tel}</td>
                <td>${company[i].nameRegion}</td>
                <td>${company[i].nameCountry}</td>
                <td>${company[i].nameCity}</td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${company[i].company_id} onclick = "showDeleteCompany(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${company[i].company_id} onclick = "showUpdateCompany(this)"></i>
                </td>
            `;
                    table.appendChild(row);
                }
            } else {
                res.json().then((data) => {
                    console.log('Companies not found');
                    alert('Companies not found');
                });
            }

        })
}
getCompanies();

//2. Post Companies

createButton.addEventListener('click', () => {
    console.log(nameCompany.value)
    console.log('llamado al API');
    fetch('http://localhost:3000/company', {
        method: 'POST',
        body: `{"nameCompany":"${nameCompany.value}","address":"${addressCompany.value}","email":"${emailCompany.value}", "tel":"${telCompany.value}", "region_id":"${regionCompany.value}","country_id":"${countryCompany.value}","city_id":"${cityCompany.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }

    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
                alert('Created');
            });
            location.reload()
        }
        else if (res.status == 400) {
            console.log(res);
            res.json().then((data) => {
                console.log(data);
                alert('Missing Arguments');
            });
        } else if (res.status == 403) {
            res.json().then((data) => {
                console.log(data);
                alert('Forbidden: No Permission To Access');
            });
        }
        else if (res.status == 405) {
            res.json().then((data) => {
                console.log(data);
                alert('Username Exist');
            });
        }
        else if (res.status == 406) {
            res.json().then((data) => {
                console.log(data);
                alert('Verify: Password and Corfirmation Password');
            });
        }
    })

});

addButton.addEventListener('click', () => {
    createCompanySection.classList.toggle('hidden');
    companiesSection.classList.toggle('hidden');
});

createButton.addEventListener('click', () => {
    createCompanySection.classList.toggle('hidden');
    companiesSection.classList.toggle('hidden');
});
cancelButton.addEventListener('click', () => {
    createCompanySection.classList.toggle('hidden');
    companiesSection.classList.toggle('hidden');
});

//Select Region
regionCompany.addEventListener('click', () => {
    fetch('http://localhost:3000/regions', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchRegion = document.getElementsByClassName(`rowRegion`);
            if (res && validateSearchRegion.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    /* console.log(res.users[i].name)  */
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegion`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    console.log(row)
                    console.log(regionCompany)
                    regionCompany.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
            

        })

        console.log('Search Realized');
        for (let i = countryCompany.options.length; i >= 0; i--) {
            countryCompany.remove(i);
        }
        for (let i = cityCompany.options.length; i >= 0; i--) {
            cityCompany.remove(i);
        }

    getCountries();
}
)


//Select Countries
function getCountries() {
    let validateSearchCountry = document.getElementsByClassName(`liCountry`); 
    console.log(validateSearchCountry)
    countryCompany.disabled = false
    countryCompany.addEventListener('click', () => {
        const regionCompanySelectValue = regionCompany.value.split(" ");
        console.log(regionCompanySelectValue)
        const region_idSelect = regionCompanySelectValue[0];

        fetch(`http://localhost:3000/countries/${region_idSelect}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                console.log(res)
                console.log(validateSearchCountry.length)
                if (res && validateSearchCountry.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        console.log(res)
                        console.log(res[i].country_id)
                        const liCountry = document.createElement('option');
                        liCountry.setAttribute('id', `liCountry${res[i].country_id}`)
                        liCountry.setAttribute('class', `liCountry`)
                        liCountry.innerHTML += `
                            <span class="caret" id ="${res[i].country_id}" value="${res[i].country_id}"> ${res[i].country_id} ${res[i].nameCountry}  </span> `;
                        console.log(liCountry)
                        countryCompany.appendChild(liCountry);
                    }
                } 
            })
            for (let i = cityCompany.options.length; i >= 0; i--) {
                cityCompany.remove(i);
            }
        getCities()
    })
}



//Select Cities
function getCities() {
    let validateSearchCity = document.getElementsByClassName(`liCity`);
    console.log(validateSearchCity)
        cityCompany.disabled = false
        cityCompany.addEventListener('click', () => {
            const countryCompanySelectValue = countryCompany.value.split(" ");
            console.log(countryCompanySelectValue)
            const country_idSelect = countryCompanySelectValue[0];

            fetch(`http://localhost:3000/cities/${country_idSelect}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }).then(respuesta => respuesta.json())
                .then(res => {
                    console.log(res)
                    if (res && validateSearchCity.length == 0) {
                        for (let i = 0; i < res.length; i++) {
                            console.log(res)
                            console.log(validateSearchCity)
                            let liCity = document.createElement('option');
                            liCity.setAttribute('id', `liCity${res[i].city_id}`)
                            liCity.setAttribute('class', `liCity`)
                            liCity.innerHTML += ` <span class="">  ${res[i].city_id} ${res[i].nameCity} </span> `;
                            console.log(liCity)
                            cityCompany.appendChild(liCity);
                        }
                    } else {
                        console.log('Search Realized');
                    }

                })
        }
        )

}

// 3. Put companies

function showUpdateCompany(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    updateCompanySection.classList.toggle('hidden');
    companiesSection.classList.toggle('hidden');
    createButtonUp.addEventListener('click', () => {
        console.log(id)
        updateUsers(id)
    });
}
function updateUsers(id) {
    console.log(id)

    fetch(`http://localhost:3000/company/${id}`, {

        method: 'PUT',
        body: `{"name":"${nameCompanyUp.value}","address":"${addressCompanyUp.value}","email":"${emailCompanyUp.value}", "tel":"${telCompanyUp.value}", "region_id":"${regionCompanyUp.value}","country_id":"${countryCompanyUp.value}","city_id":"${cityCompanyUp.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res)
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
                alert('Updated');
            });
            location.reload()
        }
        else if (res.status == 400) {
            res.json().then((data) => {
                console.log(data);
                alert('Missing Arguments');
            });
        }
        else if (res.status == 404) {
            res.json().then((data) => {
                console.log(data);
                alert('Company Not Found');
            });
        }
    })

    updateCompanySection.classList.add('hidden');
    companiesSection.classList.remove('hidden');

    

}

cancelButtonUp.addEventListener('click', () => {
    updateCompanySection.classList.add('hidden');
    companiesSection.classList.remove('hidden');
});

//Select Region
regionCompanyUp.addEventListener('click', () => {
    fetch('http://localhost:3000/regions', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchRegionUp = document.getElementsByClassName(`rowRegionUp`);
            if (res && validateSearchRegionUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    /* console.log(res.users[i].name)  */
                    const rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowRegion${res[i].region_id}`)
                    rowUp.setAttribute('class', `rowRegionUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    console.log(rowUp)
                    console.log(regionCompanyUp)
                    regionCompanyUp.appendChild(rowUp);
                }
            } else {
                console.log('Search Realized');
            }
            

        })

        console.log('Search Realized');
        for (let i = countryCompanyUp.options.length; i >= 0; i--) {
            countryCompanyUp.remove(i);
        }
        for (let i = cityCompanyUp.options.length; i >= 0; i--) {
            cityCompanyUp.remove(i);
        }

    getCountriesUp();
}
)

//Select Countries
function getCountriesUp() {
    let validateSearchCountryUp = document.getElementsByClassName(`liCountryUp`); 
    console.log(validateSearchCountryUp)
    countryCompanyUp.disabled = false
    countryCompanyUp.addEventListener('click', () => {
        const regionCompanySelectValueUp = regionCompanyUp.value.split(" ");
        console.log(regionCompanySelectValueUp)
        const region_idSelectUp = regionCompanySelectValueUp[0];

        fetch(`http://localhost:3000/countries/${region_idSelectUp}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                console.log(res)
                console.log(validateSearchCountryUp.length)
                if (res && validateSearchCountryUp.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        console.log(res)
                        console.log(res[i].country_id)
                        const liCountryUp = document.createElement('option');
                        liCountryUp.setAttribute('id', `liCountry${res[i].country_id}`)
                        liCountryUp.setAttribute('class', `liCountryUp`)
                        liCountryUp.innerHTML += `
                            <span class="caret" id ="${res[i].country_id}" value="${res[i].country_id}"> ${res[i].country_id} ${res[i].nameCountry}  </span> `;
                        console.log(liCountryUp)
                        countryCompanyUp.appendChild(liCountryUp);
                    }
                } 
            })
            for (let i = cityCompanyUp.options.length; i >= 0; i--) {
                cityCompanyUp.remove(i);
            }
        getCitiesUp()
    })
}

//Select Cities
function getCitiesUp() {
    let validateSearchCityUp = document.getElementsByClassName(`liCityUp`);
    console.log(validateSearchCityUp)
        cityCompanyUp.disabled = false
        cityCompanyUp.addEventListener('click', () => {
            const countryCompanySelectValueUp = countryCompanyUp.value.split(" ");
            console.log(countryCompanySelectValueUp)
            const country_idSelectUp = countryCompanySelectValueUp[0];

            fetch(`http://localhost:3000/cities/${country_idSelectUp}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }).then(respuesta => respuesta.json())
                .then(res => {
                    console.log(res)
                    if (res && validateSearchCityUp.length == 0) {
                        for (let i = 0; i < res.length; i++) {
                            console.log(res)
                            console.log(validateSearchCityUp)
                            let liCityUp = document.createElement('option');
                            liCityUp.setAttribute('id', `liCity${res[i].city_id}`)
                            liCityUp.setAttribute('class', `liCityUp`)
                            liCityUp.innerHTML += ` <span class="">  ${res[i].city_id} ${res[i].nameCity} </span> `;
                            console.log(liCityUp)
                            cityCompanyUp.appendChild(liCityUp);
                        }
                    } else {
                        console.log('Search Realized');
                    }

                })
        }
        )

}

//6. Delete Company

cancelButtonDeleteCompany.addEventListener('click', () => {
    deleteCompaniesSection.classList.toggle('hidden');
    companiesSection.classList.remove('hidden');
});

function showDeleteCompany(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    deleteCompaniesSection.classList.toggle('hidden')

    deleteButtonDeleteCompany.addEventListener('click', () => {
        console.log(id)
        deleteCompany(id)
    });
}


function deleteCompany(id) {
    console.log(id)
    fetch(`http://localhost:3000/company/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })


    deleteCompaniesSection.classList.add('hidden');
    companiesSection.classList.remove('hidden');

    location.reload()

}



