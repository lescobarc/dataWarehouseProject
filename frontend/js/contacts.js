let token = localStorage.token;

//Table 
let table = document.querySelector('#contactsTable tbody');
let contactsSection = document.getElementById('contactsSection');

//CONTACTS
//create
let createContactsSection = document.getElementById('createContactsSection');
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let nameContact = document.getElementById('nameContact');
let lastnameContact = document.getElementById('lastnameContact');
let nameCompanyContact = document.getElementById('companyContact');
let regionContact = document.getElementById('regionContact');
let countryContact = document.getElementById('countryContact');
let positionContact = document.getElementById('positionContact');
let interestContact = document.getElementById('interestContact');
let channelContact = document.getElementById('channelContact');
let accountContact = document.getElementById('accountContact');
let preferencesContact = document.getElementById('preferencesContact');

//update
/* let createButtonUp = document.getElementById('createButtonUp');
let cancelButtonUp = document.getElementById('cancelButtonUp');
let updateCompanySection = document.getElementById('updateCompanySection');
let regionCompanyUp = document.getElementById('regionCompanyUp');
let countryCompanyUp = document.getElementById('countryCompanyUp');
let cityCompanyUp = document.getElementById('cityCompanyUp');
let nameCompanyUp = document.getElementById('nameCompanyUp');
let addressCompanyUp = document.getElementById('addressCompanyUp');
let emailCompanyUp = document.getElementById('emailCompanyUp');
let telCompanyUp = document.getElementById('telCompanyUp');  */

//1. get contacts
function getContacts() {
    fetch('http://localhost:3000/contacts', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
           
            console.log(res)
            let contact = res[0];
            if (res) {
                for (let i = 0; i < contact.length; i++) {

                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>  <input type="checkbox" </td>
                <td>${contact[i].name} ${contact[i].lastname} <br> <span> ${contact[i].email} </span> </td>
                <td> ${contact[i].nameCountry} <br><span> ${contact[i].nameRegion}</span> </td>
                <td>${contact[i].nameCompany}</td>
                <td>${contact[i].position}</td>
                <td>${contact[i].channel}</td>
                <td>${contact[i].interest}</td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${contact[i].contact_id} onclick = "showDeleteContact(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${contact[i].contact_id} onclick = "showUpdateContact(this)"></i>
                </td>
            `;
                    table.appendChild(row);
                }
            } else {
                res.json().then((data) => {
                    console.log('Contacts not found');
                    alert('Contacts not found');
                });
            }

        })
}
getContacts();

//2. Post Contacts

 addButton.addEventListener('click', () => {
    console.log(nameContact.value)
    console.log('llamado al API');
   console.log(nameContact.value ) 
   console.log(lastnameContact.value )
   console.log(emailContact.value )
   console.log(positionContact.value )
   console.log(nameCompanyContact.value )
   console.log(regionContact.value )
   console.log(countryContact.value )
   console.log(cityContact.value )
   console.log(interestContact.value )
   console.log(channelContact.value )
   console.log(preferencesContact.value )
   console.log(accountContact.value )

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: `{"name":"${nameContact.value}", "lastname":"${lastnameContact.value}", "email":"${emailContact.value}","position":"${positionContact.value}", "company_id":"${nameCompanyContact.value}", "region_id":"${regionContact.value}","country_id":"${countryContact.value}","city_id":"${cityContact.value}", "interest":"${interestContact.value}", "channel_id":"${channelContact.value}",  "account":"${accountContact.value}", "preferences":"${preferencesContact.value}"}`,
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
                alert('Contact Exist');
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
    createContactSection.classList.toggle('hidden');
    contactsSection.classList.toggle('hidden');
});

createButton.addEventListener('click', () => {
    createContactSection.classList.toggle('hidden');
    contactsSection.classList.toggle('hidden');
});
cancelButton.addEventListener('click', () => {
    createContactSection.classList.toggle('hidden');
    contactsSection.classList.toggle('hidden');
});

//Select Region
regionContact.addEventListener('click', () => {
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
                    console.log(row.value)
                    console.log(regionContact)
                    regionContact.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
            

        })

        console.log('Search Realized');
        for (let i = countryContact.options.length; i >= 0; i--) {
            countryContact.remove(i);
        }
        for (let i = cityContact.options.length; i >= 0; i--) {
            cityContact.remove(i);
        }

    getCountries();
}
)

//Select Countries
function getCountries() {
    let validateSearchCountry = document.getElementsByClassName(`liCountry`); 
    console.log(validateSearchCountry)
    countryContact.disabled = false
    countryContact.addEventListener('click', () => {
        const regionContactSelectValue = regionContact.value.split(" ");
        console.log(regionContactSelectValue)
        const region_idSelect = regionContactSelectValue[0];

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
                        countryContact.appendChild(liCountry);
                    }
                } 
            })
            for (let i = cityContact.options.length; i >= 0; i--) {
                cityContact.remove(i);
            }
        getCities()
    })
}

//Select Cities
function getCities() {
    let validateSearchCity = document.getElementsByClassName(`liCity`);
    console.log(validateSearchCity)
        cityContact.disabled = false
        cityContact.addEventListener('click', () => {
            const countryContactSelectValue = countryContact.value.split(" ");
            console.log(countryContactSelectValue)
            const country_idSelect = countryContactSelectValue[0];

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
                            cityContact.appendChild(liCity);
                        }
                    } else {
                        console.log('Search Realized');
                    }

                })
        }
        )

}


//Select Channel
channelContact.addEventListener('click', () => {
    fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchChannel = document.getElementsByClassName(`rowChannel`);
           
            if (res && validateSearchChannel.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowChannel${res[i].region_id}`)
                    row.setAttribute('class', `rowChannel`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;
                    console.log(row)
                    
                    channelContact.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
            

        })

      
}
)

//Select Companies
companyContact.addEventListener('click', () => {
    fetch('http://localhost:3000/companies', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchCompany = document.getElementsByClassName(`rowCompany`);
           
            if (res && validateSearchCompany.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowCompany${res[i].company_id}`)
                    row.setAttribute('class', `rowCompany`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].company_id}" value="${res[i].company_id}"> ${res[i].company_id} ${res[i].nameCompany} </span>  `;
                    console.log(row)
                    
                    companyContact.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
            

        })

      
}
)
