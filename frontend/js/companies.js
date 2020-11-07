let token = localStorage.token;

//Table 
let tabla = document.querySelector('#companiesTable tbody')

//COMPANIES
//create
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let createCompanySection = document.getElementById('createCompany');
let companiesSection = document.getElementById('companiesSection');
let regionCompany = document.getElementById('regionCompany');
let countryCompany = document.getElementById('countryCompany');
let cityCompany = document.getElementById('cityCompany');
let nameCompany = document.getElementById('nameCompany');
let addressCompany = document.getElementById('addressCompany');
let emailCompany = document.getElementById('emailCompany');
let telCompany = document.getElementById('telCompany');
/* let regionCompany = document.getElementById('regionCompany');
let countryCompany = document.getElementById('countryCompany');
let cityCompany = document.getElementById('cityCompany'); */



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
            let company = res[0];
            if (res) {
                for (let i = 0; i < company.length; i++) {

                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>  <input type="checkbox" </td>
                <td>${company[i].name}</td>
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
                    tabla.appendChild(row);
                }
            } else {
                res.json().then((data) => {
                    console.log('Users not found');
                    alert('Users not found');
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
        body: `{"name":"${nameCompany.value}","address":"${addressCompany.value}","email":"${emailCompany.value}", "tel":"${telCompany.value}", "region_id":"${regionCompany.value}","country_id":"${countryCompany.value}","city_id":"${cityCompany.value}"}`,
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


    getCountries();
}
)

//Select Countries
function getCountries() {
    let validateSearchCountry = document.getElementsByClassName(`liCountry`);
    console.log(validateSearchCountry)

    /* countryCompany.remove()
      let newSelectCountry = document.createElement('select');
                         newSelectCountry.setAttribute('id', `countryCompany`)
                         newSelectCountry.setAttribute('name', 'companyCountry')
                         secondInfoCompani.appendChild(newSelectCountry); */


    const regionCompanySelectValue = regionCompany.value.split(" ");
    console.log(regionCompanySelectValue)
    const region_idSelect = regionCompanySelectValue[0];
    if (region_idSelect) {
        countryCompany.disabled = false

        countryCompany.addEventListener('click', () => {

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
                    } else {
                        console.log('Search Realized');
                    }
                })
            getCities()

        })





    } else { console.log('Region Id Not Exist ') };
    console.log(region_idSelect);

}

//Select Cities
function getCities() {
    let validateSearchCity = document.getElementsByClassName(`liCity`);
    console.log(validateSearchCity)

    /* countryCompany.remove()
      let newSelectCountry = document.createElement('select');
                         newSelectCountry.setAttribute('id', `countryCompany`)
                         newSelectCountry.setAttribute('name', 'companyCountry')
                         secondInfoCompani.appendChild(newSelectCountry); */


    const countryCompanySelectValue = countryCompany.value.split(" ");
    console.log(countryCompanySelectValue)
    const country_idSelect = countryCompanySelectValue[0];
    if (country_idSelect) {
        cityCompany.disabled = false



        cityCompany.addEventListener('click', () => {
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


    } else { console.log('Country Id Not Exist ') };

}



