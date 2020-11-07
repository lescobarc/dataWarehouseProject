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
/* let tableRegions = document.getElementById('regionCompany') */


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
    console.log('llamado al API');
    fetch('http://localhost:3000/company', {
        method: 'POST',
        body: `{"name":"${nameCompany.value}","address":"${addressCompany.value}","email":"${emailCompany.value}","region_id":"${regionCompany.value}","country_id":"${countryCompany.value}","city_id":"${cityCompany.value}"}`,
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


function getCountries() {
    const regionCompanySelectValue = regionCompany.value.split(" ");
    console.log(regionCompanySelectValue)
    const region_idSelect = regionCompanySelectValue[0];
    if (region_idSelect) {
        countryCompany.disabled = false
    } else { console.log('Region Id Not Exist ') };
    console.log(region_idSelect);

    countryCompany.addEventListener('click', () => {
        fetch(`http://localhost:3000/countries/${region_idSelect}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }).then(respuesta => respuesta.json())
            .then(res => {
                console.log("aqui")
                console.log(res)
                /*   let validateSearchCountry = document.getElementById(`sectionCountries${region_id}`);
                  console.log(validateSearchCountry) */

                if (res) {
                    /*  const ul = document.createElement('ul'); */
                    /* ul.setAttribute('id', `sectionCountries${region_id}`)
    
                    sectionCountries.appendChild(ul) */


                    for (let i = 0; i < res.length; i++) {
                        console.log(res)
                        console.log(res[i].country_id)
                        const liCountry = document.createElement('option');
                        liCountry.setAttribute('id', `liCountry${res[i].country_id}`)
                        liCountry.innerHTML += `
                    <span class="caret" id ="${res[i].country_id}" value="${res[i].country_id}"> ${res[i].country_id} ${res[i].nameCountry}  </span> `;
                        console.log(liCountry)
                        countryCompany.appendChild(liCountry);
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

    })

}




