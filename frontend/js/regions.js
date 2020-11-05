let token = localStorage.token;

//Table
let table = document.querySelector('#regionsTable tbody')
let regionsSection = document.getElementById('citySection');

//REGIONS
//create
let createButtonRegion = document.getElementById('createButtonRegion');
let cancelButtonRegion = document.getElementById('cancelButtonRegion');
let addButtonRegion = document.getElementById('addButtonRegion');
let createRegionSection = document.getElementById('createRegion');

let nameRegion = document.getElementById('nameRegion')

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
              <span class="caret" onclick = "getCountries(this)" id ="${res[i].region_id}"> ${res[i].name} </span>
              <button class="buttonSecondary buttonLarge" id="${res[i].region_id}" onclick = "postCountry(this)" >Agregar País</button>
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
        body: `{"name":"${nameRegion.value}"}`,
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
                    <span class="caret" onclick = "getCities(this)" id ="${res[i].country_id}"> ${res[i].name}  </span>
                     <i class="fas fa-trash" id="iconTrashDelete1"></i>
                     <i class="fas fa-pencil-alt" id= "${res[i].country_id}" onclick = "showUpdateCountry(this)"></i>
                    <button class="buttonTerciary buttonLarge" id="${res[i].country_id}" onclick = "postCity(this)">Agregar Ciudad</button>
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
        body: `{"name":"${nameCountry.value}"}`,
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
        body: `{"name":"${nameCountryUp.value}"}`,
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
                    <span class=""> ${res[i].name} </span>
                     <i class="fas fa-trash" id="iconTrashDelete1"> </i>
                     <i class="fas fa-pencil-alt" id= "${res[i].city_id}" onclick = "showUpdateCity(this) "></i> `;

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
        body: `{"name":"${nameCity.value}"}`,
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
        body: `{"name":"${nameCityUp.value}"}`,
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