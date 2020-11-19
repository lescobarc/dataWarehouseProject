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
            let company = res;
            if (res) {
                tableBody.innerHTML = ""
                for (let i = searchI; i < searchF; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact');
                    row.setAttribute('class', 'arrow');
                    row.setAttribute('id', `arrow${i}`);
                    row.innerHTML += `
                <td>  <input type="checkbox" onclick="contar(this, ${i})" name="check"  id=${company[i].company_id}> </td>
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
                </td>`;
                    table.appendChild(row);

                    //Pagination
                    rowsPage.innerHTML = ""
                    for (let i = 1; i <= company.length; i++) {
                        const optionPag = document.createElement('option');
                        optionPag.innerText = `${i}`
                        rowsPage.appendChild(optionPag)
                    }
                    rowsPage.value = searchF - searchI
                    rowsTotal.innerText = `${company.length}`
                    rowI.innerText = `${searchI}`
                    rowF.innerText = `${searchF}`
                }
            } else {
                console.log('Search Realized');
            }
        })
}
getCompanies();

//2. Post Companies
createButton.addEventListener('click', () => {
    fetch('http://localhost:3000/company', {
        method: 'POST',
        body: `{"nameCompany":"${nameCompany.value}","address":"${addressCompany.value}","email":"${emailCompany.value}", "tel":"${telCompany.value}", "region_id":"${regionCompany.value}","country_id":"${countryCompany.value}","city_id":"${cityCompany.value}"}`,
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
                alert('Company Exist');
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
            let validateSearchRegion = document.getElementsByClassName(`rowRegion`);
            if (res && validateSearchRegion.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegion`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    regionCompany.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }


        })

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
    countryCompany.disabled = false
    countryCompany.addEventListener('click', () => {
        const regionCompanySelectValue = regionCompany.value.split(" ");
        const region_idSelect = regionCompanySelectValue[0];

        fetch(`http://localhost:3000/countries/${region_idSelect}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                if (res && validateSearchCountry.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        const liCountry = document.createElement('option');
                        liCountry.setAttribute('id', `liCountry${res[i].country_id}`)
                        liCountry.setAttribute('class', `liCountry`)
                        liCountry.innerHTML += `
                            <span class="caret" id ="${res[i].country_id}" value="${res[i].country_id}"> ${res[i].country_id} ${res[i].nameCountry}  </span> `;
                        countryCompany.appendChild(liCountry);
                    }
                } else {
                    console.log('Search Realized');
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
    cityCompany.disabled = false
    cityCompany.addEventListener('click', () => {
        const countryCompanySelectValue = countryCompany.value.split(" ");
        const country_idSelect = countryCompanySelectValue[0];
        fetch(`http://localhost:3000/cities/${country_idSelect}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                if (res && validateSearchCity.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        let liCity = document.createElement('option');
                        liCity.setAttribute('id', `liCity${res[i].city_id}`)
                        liCity.setAttribute('class', `liCity`)
                        liCity.innerHTML += ` <span class="">  ${res[i].city_id} ${res[i].nameCity} </span> `;
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
    let id = i.id
    updateCompanySection.classList.toggle('hidden');
    companiesSection.classList.toggle('hidden');
    showInfoCompany(id);
    createButtonUp.addEventListener('click', () => {
        updateCompanies(id)
    });
    cancelButtonUp.addEventListener('click', () => {
        showDeleteCompany(i);
    });
}
function showInfoCompany(id) {
    fetch(`http://localhost:3000/company/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            if (res) {
                nameCompanyUp.value = `${res.nameCompany}`
                addressCompanyUp.value = `${res.address}`;
                emailCompanyUp.value = `${res.email}`;
                telCompanyUp.value = `${res.tel}`;
                regionCompanyUp.innerHTML = ` <option label = ${res.nameRegion} value = ${res.region_id}>`;
                countryCompanyUp.innerHTML = ` <option label = ${res.nameCountry} value = ${res.country_id}>`;
                cityCompanyUp.innerHTML = ` <option label = ${res.nameCity} value = ${res.city_id}>`;
            } else {
                console.log('Search Realized');
            }
        })

}
function updateCompanies(id) {
    fetch(`http://localhost:3000/company/${id}`, {
        method: 'PUT',
        body: `{"nameCompany":"${nameCompanyUp.value}","address":"${addressCompanyUp.value}","email":"${emailCompanyUp.value}", "tel":"${telCompanyUp.value}", "region_id":"${regionCompanyUp.value}","country_id":"${countryCompanyUp.value}","city_id":"${cityCompanyUp.value}"}`,
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
                alert('Company Not Found');
            });
        }
    })

    updateCompanySection.classList.add('hidden');
    companiesSection.classList.remove('hidden');



}

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
            let validateSearchRegionUp = document.getElementsByClassName(`rowRegionUp`);
            if (res && validateSearchRegionUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    const rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowRegion${res[i].region_id}`)
                    rowUp.setAttribute('class', `rowRegionUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    regionCompanyUp.appendChild(rowUp);
                }
            } else {
                console.log('Search Realized');
            }


        })

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
    countryCompanyUp.disabled = false
    countryCompanyUp.addEventListener('click', () => {
        const regionCompanySelectValueUp = regionCompanyUp.value.split(" ");
        const region_idSelectUp = regionCompanySelectValueUp[0];
        fetch(`http://localhost:3000/countries/${region_idSelectUp}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                if (res && validateSearchCountryUp.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        const liCountryUp = document.createElement('option');
                        liCountryUp.setAttribute('id', `liCountry${res[i].country_id}`)
                        liCountryUp.setAttribute('class', `liCountryUp`)
                        liCountryUp.innerHTML += `
                            <span class="caret" id ="${res[i].country_id}" value="${res[i].country_id}"> ${res[i].country_id} ${res[i].nameCountry}  </span> `;
                        countryCompanyUp.appendChild(liCountryUp);
                    }
                }else {
                    console.log('Search Realized');
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
    cityCompanyUp.disabled = false
    cityCompanyUp.addEventListener('click', () => {
        const countryCompanySelectValueUp = countryCompanyUp.value.split(" ");
        const country_idSelectUp = countryCompanySelectValueUp[0];
        fetch(`http://localhost:3000/cities/${country_idSelectUp}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                if (res && validateSearchCityUp.length == 0) {
                    for (let i = 0; i < res.length; i++) {
                        let liCityUp = document.createElement('option');
                        liCityUp.setAttribute('id', `liCity${res[i].city_id}`)
                        liCityUp.setAttribute('class', `liCityUp`)
                        liCityUp.innerHTML += ` <span class="">  ${res[i].city_id} ${res[i].nameCity} </span> `;
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
    let id = i.id
    deleteCompaniesSection.classList.toggle('hidden')
    deleteButtonDeleteCompany.addEventListener('click', () => {
        deleteCompany(id)
    });
}


function deleteCompany(id) {
    fetch(`http://localhost:3000/company/${id}`, {
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
        }else if (res.status == 404) {
            res.json().then((data) => {
                alert('Company Not Found');
            });
        }
        
        location.reload()
    })

    deleteCompaniesSection.classList.add('hidden');
    companiesSection.classList.remove('hidden');
}


//Sort Table
function sortTable(n, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("companiesTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if ((type == "str" && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if ((type == "str" && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type == "int" && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {

                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


//Pagination
function searchFetch(searchI, searchF) {
    getCompanies(searchI, searchF)
}

//Select Delete
function showDeleteCompanySelect() {
    deleteCompaniesSection.classList.toggle('hidden')
    deleteButtonDeleteCompany.addEventListener('click', () => {
        selectDelete()
    });
}

async function selectDelete() {
    let elements = document.getElementsByName("check");
    for (i = 0; i < elements.length; i++) {
        let id = elements[i].id
        if (elements[i].checked) {
            await fetch(`http://localhost:3000/company/${id}`, {
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
                }else if (res.status == 404) {
                    res.json().then((data) => {
                        alert('Company Not Found');
                    });
                }
                
            })
        }
    }

    location.reload()
}



