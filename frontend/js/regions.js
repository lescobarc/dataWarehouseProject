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




//Tree
/* var toggler = document.getElementsByClassName("caret");
console.log("togle" + toggler)
console.log(toggler)
var i;
for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function showMore() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
} */


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
            console.log(res)


            if (res) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    /* console.log(res.users[i].name)  */
                    const row = document.createElement('li');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.innerHTML += `
             <h2> <span class="caret" onclick = "getCountries(this)" id ="${res[i].region_id}"> ${res[i].nameRegion} </span>
            <i class="fas fa-trash" id= "${res[i].region_id}" onclick = "showDeleteRegion(this)"></i>
            <i class="fas fa-pencil-alt" id= "${res[i].region_id}" onclick = "showUpdateRegion(this)"></i>
            <i class="fas fa-id-card-alt" id= "${res[i].region_id}" onclick = "showContactsRegion(this)"></i>
              <button class="buttonSecondary buttonLarge" id="${res[i].region_id}" onclick = "postCountry(this)" >Agregar País</button> <h2>
          `;
                    console.log(row)
                    console.log(table)
                    table.appendChild(row);

                }
            } else {
                res.json().then((data) => {
                    console.log('Regions not found');
                    alert('Regions not found');
                });
            }

        })/* .catch(res=>{res.json().then(data=>alert(data.msg))}); */


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
    console.log('llamado al API');
    fetch('http://localhost:3000/region', {
        method: 'POST',
        body: `{"nameRegion":"${nameRegion.value}"}`,
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
                alert('Region Exist');
            });
        }

    })

});
// 3. Put Region

function showUpdateRegion(i) {
    console.log(i)
    let idRegion = i.id
    console.log(idRegion)
    updateRegionSection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpRegion.addEventListener('click', () => {
        console.log(idRegion)
        updateRegions(idRegion)
    });
}


function updateRegions(idRegion) {
    console.log(idRegion)

    fetch(`http://localhost:3000/region/${idRegion}`, {

        method: 'PUT',
        body: `{"nameRegion":"${nameRegionUp.value}"}`,
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
    console.log(i)
    let id = i.id
    console.log(id)
    deleteRegionsSection.classList.toggle('hidden')

    deleteButtonDeleteRegion.addEventListener('click', () => {
        console.log(id)
        deleteRegion(id)
    });
}


function deleteRegion(id) {
    console.log(id)
    fetch(`http://localhost:3000/region/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })


    deleteRegionsSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');

    location.reload()

}

//5. get contacts region_id

//Pagination

let rowsPageR = document.getElementById("rowsPageR");
let rowsOfPageR = document.getElementById("rowsOfPageR");
let rowsTotalR = document.getElementById("rowsTotalR");
let arrowLeftR = document.getElementById('arrowLeftR');
let arrowRigthR = document.getElementById('arrowRigthR');
let rowIR = document.getElementById('rowIR');
let rowFR = document.getElementById('rowFR')
let searchFR = parseInt(rowsPageR.value);
let searchIR = 1;

function showContactsRegion(i) {

    if (i !== 0) {
        region_id = i.id;
        localStorage.setItem("region_id", region_id);
    }

    region_id = localStorage.getItem("region_id")
    console.log(region_id);
    fetch(`http://localhost:3000/contacts/regions/${region_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " ";
            console.log(res)
            let contact = res;
            if (res) {


                //Pagination
                rowsPageR.innerHTML = ""
                for (let i = 1; i <= contact.length; i++) {
                    console.log(contact.length)
                    const optionPag = document.createElement('option');
                    optionPag.innerText = `${i}`
                    rowsPageR.appendChild(optionPag)
                }
                rowsPageR.value = searchFR - searchIR
                rowsTotalR.innerText = `${contact.length}`
                rowIR.innerText = `${searchIR}`
                rowFR.innerText = `${searchFR}`
                for (let i = searchIR; i < searchFR; i++) {

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
                res.json().then((data) => {
                    console.log('Contacts not found');
                    alert('Contacts not found');
                });
            }

        })



}



//Pagination
function searchFetch(searchI, searchF) {
    showContactsRegion(searchI, searchF)
}

rowsPageR.addEventListener('change', () => {
    searchFR = rowsPageR.value;
    searchIR = 0;
    searchFetch(searchIR, searchFR)
    rowsPageR.selected
})

arrowRigthR.addEventListener('click', () => {

    let validate = parseInt(searchFR) + parseInt(rowsPageR.value);

    if (validate <= rowsPageR.length) {
        searchIR = parseInt(searchIR) + parseInt(rowsPageR.value)
        searchFR = parseInt(searchFR) + parseInt(rowsPageR.value)

        searchFetch(parseInt(searchFR), parseInt(searchIR))
    }
})

arrowLeftR.addEventListener('click', () => {

    validate = searchIR - parseInt(rowsPageR.value)
    if (validate >= 0) {
        searchIR = searchIR - parseInt(rowsPageR.value)
        searchFR = searchF - parseInt(rowsPageR.value)

        searchFetch(parseInt(searchFR), parseInt(searchIR))
    }
})
//COUNTRIES


//1. get Countries
function getCountries(i) {

    region_id = i.id;
    console.log(region_id);


    fetch(`http://localhost:3000/countries/${region_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log("aqui")
            console.log(res)
            let validateSearchCountry = document.getElementById(`sectionCountries${region_id}`);
            console.log(validateSearchCountry)

            if (res && validateSearchCountry == null) {
                const ul = document.createElement('ul');
                ul.setAttribute('id', `sectionCountries${region_id}`)

                sectionCountries.appendChild(ul)


                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    console.log(res[i].country_id)
                    const liCountry = document.createElement('li');
                    liCountry.setAttribute('id', `liCountry${res[i].country_id}`)

                    liCountry.innerHTML += `
                    <h4> <span class="caret" onclick = "getCities(this)" id ="${res[i].country_id}"> ${res[i].nameCountry}  </span> 
                     <i class="fas fa-trash" id= "${res[i].country_id}" onclick = "showDeleteCountry(this)"></i>
                     <i class="fas fa-pencil-alt" id= "${res[i].country_id}" onclick = "showUpdateCountry(this)"></i>
                     <i class="fas fa-id-card-alt" id= "${res[i].country_id}" onclick = "showContactsCountry(this)"></i>
                     <button class="buttonTerciary buttonLarge" id="${res[i].country_id}" onclick = "postCity(this)">Agregar Ciudad</button><h4>
            `;
                    console.log(liCountry)

                    document.getElementById(`rowRegion${region_id}`).appendChild(liCountry);

                }
            } else {
                console.log('Search Realized');
                for (let i = 0; i < res.length; i++) {
                    rowDelete = document.getElementById(`liCountry${res[i].country_id}`)
                    console.log(rowDelete)
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
    console.log(i)
    let id = i.id
    console.log(id)
    createCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonCountry.addEventListener('click', () => {
        console.log(id)
        createCountry(id)
    });
}


function createCountry(id) {
    console.log('llamado al API');
    fetch(`http://localhost:3000/country/${id}`, {
        method: 'POST',
        body: `{"nameCountry":"${nameCountry.value}"}`,
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
                alert('Country Exist');
            });
        }

    })
};

// 3. Put Country

function showUpdateCountry(i) {
    console.log(i)
    let idCountry = i.id
    console.log(idCountry)
    updateCountrySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpCountry.addEventListener('click', () => {
        console.log(idCountry)
        updateCountries(idCountry)
    });
}


function updateCountries(idCountry) {
    console.log(idCountry)

    fetch(`http://localhost:3000/country/${idCountry}`, {

        method: 'PUT',
        body: `{"nameCountry":"${nameCountryUp.value}"}`,
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
                alert('User Not Found');
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
    console.log(i)
    let id = i.id
    console.log(id)
    deleteCountriesSection.classList.toggle('hidden')

    deleteButtonDeleteCountry.addEventListener('click', () => {
        console.log(id)
        deleteCountry(id)
    });
}


function deleteCountry(id) {
    console.log(id)
    fetch(`http://localhost:3000/country/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })


    deleteCountriesSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');

    location.reload()

}

//5. get contacts country_id
function showContactsCountry(i) {
    searchFR = parseInt(rowsPageR.value);
    searchIR = 1;
    country_id = i.id;
    console.log(country_id);


    fetch(`http://localhost:3000/contacts/countries/${country_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " "
            console.log(res)
            let contact = res;
            if (res) {
                //Pagination
                rowsPageR.innerHTML = ""
                for (let i = 1; i <= contact.length; i++) {
                    console.log(contact.length)
                    const optionPag = document.createElement('option');
                    optionPag.innerText = `${i}`
                    rowsPageR.appendChild(optionPag)
                }
                rowsPageR.value = searchFR - searchIR
                rowsTotalR.innerText = `${contact.length}`
                rowIR.innerText = `${searchIR}`
                rowFR.innerText = `${searchFR}`



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
                res.json().then((data) => {
                    console.log('Contacts not found');
                    alert('Contacts not found');
                });
            }

        })

}


//CITIES
//1. get cities
function getCities(i) {
    console.log(i)
    country_id = i.id
    console.log(country_id)
        / fetch(`http://localhost:3000/cities/${country_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                console.log('ESTA')
                console.log(res)
                let validateSearchCity = document.getElementById(`sectionCities${country_id}`);
                console.log(validateSearchCity)
                if (res && validateSearchCity == null) {
                    const ulCity = document.createElement('ul');
                    ulCity.setAttribute('id', `sectionCities${country_id}`)
                    ulCity.setAttribute('class', '')
                    sectionCities.appendChild(ulCity)


                    for (let i = 0; i < res.length; i++) {
                        console.log(res)
                        const liCity = document.createElement('li');
                        liCity.setAttribute('id', `liCity${res[i].city_id}`)
                        liCity.innerHTML += `
                  <p>  <span class=""> ${res[i].nameCity} </span>
                     <i class="fas fa-trash" id= "${res[i].city_id}" onclick = "showDeleteCity(this)"> </i>
                     <i class="fas fa-pencil-alt" id= "${res[i].city_id}" onclick = "showUpdateCity(this) "></i>
                     <i class="fas fa-id-card-alt" id= "${res[i].city_id}" onclick = "showContactsCity(this)"></i> <p>`;

                        console.log(liCity)
                        document.getElementById(`liCountry${country_id}`).appendChild(liCity);
                    }
                } else {
                    console.log('Search Realized');
                    for (let i = 0; i < res.length; i++) {
                        rowDelete = document.getElementById(`liCity${res[i].city_id}`)
                        console.log(rowDelete)
                        rowDelete.classList.toggle('hidden')
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
    console.log(i)
    let id = i.id
    console.log(id)
    createCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonCity.addEventListener('click', () => {
        console.log(id)
        createCity(id)
    });
}


function createCity(id) {
    console.log('llamado al API');
    fetch(`http://localhost:3000/city/${id}`, {
        method: 'POST',
        body: `{"nameCity":"${nameCity.value}"}`,
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
                alert('City Exist');
            });
        }

    })
};

// 3. Put City

function showUpdateCity(i) {
    console.log(i)
    let idCity = i.id
    console.log(idCity)
    updateCitySection.classList.toggle('hidden');
    regionsSection.classList.toggle('hidden');
    createButtonUpCity.addEventListener('click', () => {
        console.log(idCity)
        updateCities(idCity)
    });
}


function updateCities(idCity) {
    console.log(idCity)

    fetch(`http://localhost:3000/city/${idCity}`, {

        method: 'PUT',
        body: `{"City":"${nameCityUp.value}"}`,
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
                alert('User Not Found');
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
    console.log(i)
    let id = i.id
    console.log(id)
    deleteCitiesSection.classList.toggle('hidden')

    deleteButtonDeleteCity.addEventListener('click', () => {
        console.log(id)
        deleteCity(id)
    });
}


function deleteCity(id) {
    console.log(id)
    fetch(`http://localhost:3000/city/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })


    deleteCitiesSection.classList.add('hidden');
    regionsSection.classList.remove('hidden');

    location.reload()

}

//5. get contacts country_id
function showContactsCity(i) {
    searchFR = parseInt(rowsPageR.value);
    searchIR = 1;
    city_id = i.id;
    console.log(city_id);
    fetch(`http://localhost:3000/contacts/cities/${city_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            bodyTableContacts.innerHTML = " "
            console.log(res)
            let contact = res;
            //Pagination
            rowsPageR.innerHTML = ""
            for (let i = 1; i <= contact.length; i++) {
                console.log(contact.length)
                const optionPag = document.createElement('option');
                optionPag.innerText = `${i}`
                rowsPageR.appendChild(optionPag)
            }
            rowsPageR.value = searchFR - searchIR
            rowsTotalR.innerText = `${contact.length}`
            rowIR.innerText = `${searchIR}`
            rowFR.innerText = `${searchFR}`
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
                res.json().then((data) => {
                    console.log('Contacts not found');
                    alert('Contacts not found');
                });
            }

        })

}