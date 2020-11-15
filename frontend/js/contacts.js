let token = localStorage.token;

//Table 
let table = document.querySelector('#contactsTable tbody');
let contactsSection = document.getElementById('contactsSection');
let tableBody = document.getElementById('tableBody')


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
let cityContact = document.getElementById('cityContact');
let positionContact = document.getElementById('positionContact');
let interestContact = document.getElementById('interestContact');
let channelContact = document.getElementById('channelContact');
let channelContact2 = document.getElementById('channelContact2');
let accountContact = document.getElementById('accountContact');
let accountContact2 = document.getElementById('accountContact2');
let preferencesContact = document.getElementById('preferencesContact');
let preferencesContact2 = document.getElementById('preferencesContact2');
let buttonAddChannel = document.getElementById('buttonAddChannel');


//update
let updateContactsSection = document.getElementById('updateContactsSection');
let createButtonUp = document.getElementById('createButtonUp');
let cancelButtonUp = document.getElementById('cancelButtonUp');
let addButtonUp = document.getElementById('addButtonUp');
let nameContactUp = document.getElementById('nameContactUp');
let lastnameContactUp = document.getElementById('lastnameContactUp');
let nameCompanyContactUp = document.getElementById('companyContactUp');
let regionContactUp = document.getElementById('regionContactUp');
let countryContactUp = document.getElementById('countryContactUp');
let cityContactUp = document.getElementById('cityContactUp');
let positionContactUp = document.getElementById('positionContactUp');
let interestContactUp = document.getElementById('interestContactUp');
let channelContactUp = document.getElementById('channelContactUp');
let channelContact2Up = document.getElementById('channelContact2Up');
let accountContactUp = document.getElementById('accountContactUp');
let accountContact2Up = document.getElementById('accountContact2Up');
let preferencesContactUp = document.getElementById('preferencesContactUp');
let preferencesContact2Up = document.getElementById('preferencesContact2Up');
let buttonAddChannelUp = document.getElementById('buttonAddChannelUp');

//delete
let deleteContactsSection = document.getElementById('deleteContactsSection');
let cancelButtonDeleteContact = document.getElementById('cancelButtonDeleteContact');
let deleteButtonDeleteContact = document.getElementById('deleteButtonDeleteContact')


//Pagination

let rowsPage = document.getElementById("rowsPage");
let rowsOfPage = document.getElementById("rowsOfPage");
let rowsTotal = document.getElementById("rowsTotal");
let arrowLeft = document.getElementById('arrowLeft');
let arrowRigth = document.getElementById('arrowRigth');
let searchF = parseInt(rowsPage.value);
let searchI = 0;
console.log(searchF)
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
            console.log(searchF)
            console.log(searchI)
            console.log(rowsPage.value)
            const resLength = res.length;

            console.log(res)
            let contact = res[0];
            if (res) {
                console.log(searchF)
                console.log(searchI)
                //Pagination
                rowsPage.innerHTML = ""
                for (let i = 0; i < contact.length; i++) {
                    console.log(contact.length)
                    const optionPag = document.createElement('option');
                    optionPag.innerText = `${i}`
                    rowsPage.appendChild(optionPag)
                }
                rowsPage.value = searchF - searchI


                //Create Table Contacts
                tableBody.innerHTML = ""

                console.log(searchF)
                console.log(searchI)
                for (let i = searchI; i < searchF; i++) {



                    console.log(searchF)
                    console.log(searchI)


                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact');
                    row.setAttribute('class', 'arrow');
                    row.setAttribute('id', `arrow${i}`);
                    row.innerHTML += `
                <td>  <input type="checkbox" class="checkbox" onclick='contar(this,  ${i})' name="check" > </td>
                <td>${contact[i].name} ${contact[i].lastname} <br> <span> ${contact[i].email} </span> </td>
                <td> ${contact[i].nameCountry} <br><span> ${contact[i].nameRegion}</span> </td>
                <td>${contact[i].nameCompany}</td>
                <td>${contact[i].position}</td>
                <td class ="interes interest${contact[i].interest}"><div >${contact[i].interest}%</div>
                <div class="progressBar">
                                <div class="progressBar${contact[i].interest}"></div>
                </div>
                </td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${contact[i].contact_id} onclick = "showDeleteContact(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${contact[i].contact_id} onclick = "showUpdateContact(this)"></i>
                </td>
            `;
                    table.appendChild(row);
                    rowsTotal.innerText = `${contact.length}`
                    rowsOfPage.innerText = `${rowsPage.value}`
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

//Pagination


rowsPage.addEventListener('change', () => {
    searchF = rowsPage.value;
    searchI = 0;
    console.log(rowsPage.value)
    getContacts(searchI, searchF)
    rowsPage.selected
})

arrowRigth.addEventListener('click', () => {
    console.log(searchF)
    console.log(searchI)
    let validate = parseInt(searchF) + parseInt(rowsPage.value);
    console.log(validate)
    console.log(rowsPage.length)
    if (validate <= rowsPage.length){
        searchI = parseInt(searchI) + parseInt(rowsPage.value)
        searchF = parseInt(searchF) + parseInt(rowsPage.value)
        console.log(searchI)
        console.log(searchF)
        getContacts(parseInt(searchF), parseInt(searchI))
    }
    
})

arrowLeft.addEventListener('click', () => {
    console.log(searchF)
    console.log(searchI)
    validate = searchI - parseInt(rowsPage.value)
    if (validate >= 0) {
        searchI = searchI - parseInt(rowsPage.value)
        searchF =  searchF - parseInt(rowsPage.value)
        console.log(searchI)
        console.log(searchF)
        getContacts(parseInt(searchF), parseInt(searchI))
    }
})
//2. Post Contacts

addButton.addEventListener('click', () => {
    const companyContactSelectValue = companyContact.value.split(" ");
    const companyId = parseInt(companyContactSelectValue[0]);
    const regionContactSelectValue = regionContact.value.split(" ");
    const regionId = parseInt(regionContactSelectValue[0]);
    const countryContactSelectValue = countryContact.value.split(" ");
    const countryId = parseInt(countryContactSelectValue[0]);
    const cityContactSelectValue = cityContact.value.split(" ");
    const cityId = parseInt(cityContactSelectValue[0]);
    const channelContactSelectValue = channelContact.value.split(" ");
    const channelId = parseInt(channelContactSelectValue[0]);
    console.log(regionContactSelectValue[0])
    const channelContactSelectValue2 = channelContact2.value.split(" ");
    const channelId2 = parseInt(channelContactSelectValue2[0]);


    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: `{"name":"${nameContact.value}", "lastname":"${lastnameContact.value}", "email":"${emailContact.value}","position":"${positionContact.value}", "company_id":"${companyId}", "region_id":"${regionId}","country_id":"${countryId}","city_id":"${cityId}", "interest":"${interestContact.value}", "channel1": "${channelId}", "channel2": "${channelId2}", "account1":"${accountContact.value}", "account2":"${accountContact2.value}", "preferences1":"${preferencesContact.value}", "preferences2":"${preferencesContact2.value}"} `,
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
                    let row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegion`)
                    row.innerHTML += `
                    <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    console.log(row)
                    console.log(row.value)
                    console.log(regionContact)
                    regionContact.appendChild(row);
                    console.log(regionContact.value)
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
        let regionContactSelectValue = regionContact.value.split(" ");
        console.log(regionContactSelectValue)
        let region_idSelect = regionContactSelectValue[0];

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
                    row.setAttribute('id', `rowChannel${res[i].channel_id}`)
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
                    let row = document.createElement('option');
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

//Add channel
buttonAddChannel.addEventListener('click', () => {

    document.getElementById('channel2').classList.remove('hidden');
    document.getElementById('account2').classList.remove('hidden');
    document.getElementById('preferences2').classList.remove('hidden');
})


channelContact2.addEventListener('click', () => {
    fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchChannel = document.getElementsByClassName(`rowChannel2`);

            if (res && validateSearchChannel.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    let row = document.createElement('option');
                    row.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    row.setAttribute('class', `rowChannel2`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;
                    console.log(row)

                    channelContact2.appendChild(row);
                }
            } else {
                console.log('Search Realized');
            }
        })
}
)

// 3. Put contacts

function showUpdateContact(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    updateContactSection.classList.toggle('hidden');
    contactsSection.classList.toggle('hidden');
    showInfoContact(id);
    addButtonUp.addEventListener('click', () => {
        console.log(id);
        updateContacts(id);
    });
}
function showInfoContact(id) {
    fetch(`http://localhost:3000/contact/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)

            if (res) {

                nameContactUp.value = `${res.name}`;
                lastnameContactUp.value = `${res.lastname}`;
                positionContactUp.value = `${res.position}`;
                emailContactUp.value = `${res.email}`;

                nameCompanyContactUp.innerHTML = ` <option label = ${res.position} value = ${res.company_id}>`;
                regionContactUp.innerHTML = ` <option label = ${res.nameRegion} value = ${res.region_id}>`;
                countryContactUp.innerHTML = ` <option label = ${res.nameCountry} value = ${res.country_id}>`;
                cityContactUp.innerHTML = ` <option label = ${res.nameCity} value = ${res.city_id}>`;
                addressContactUp.value = `${res.address}`;
                interestContactUp.innerHTML = ` <option label = ${res.interest}%  value = ${res.interest}>
                            <option value="0">0%</option>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">100%</option>`;
            } else {
                res.json().then((data) => {
                    console.log('Contacts not found');
                    alert('Contacts not found');
                });
            }

        })

}

function updateContacts(id) {
    console.log(id)
    const companyContactSelectValueUp = companyContactUp.value.split(" ");
    const companyIdUp = parseInt(companyContactSelectValueUp[0]);
    const regionContactSelectValueUp = regionContactUp.value.split(" ");
    const regionIdUp = parseInt(regionContactSelectValueUp[0]);
    const countryContactSelectValueUp = countryContactUp.value.split(" ");
    const countryIdUp = parseInt(countryContactSelectValueUp[0]);
    const cityContactSelectValueUp = cityContactUp.value.split(" ");
    const cityIdUp = parseInt(cityContactSelectValueUp[0]);
    const channelContactSelectValueUp = channelContactUp.value.split(" ");
    const channelIdUp = parseInt(channelContactSelectValueUp[0]);
    console.log(regionContactSelectValueUp[0])
    const channelContactSelectValue2Up = channelContact2Up.value.split(" ");
    const channelId2Up = parseInt(channelContactSelectValue2Up[0]);

    fetch(`http://localhost:3000/contact/${id}`, {

        method: 'PUT',
        body: `{"name":"${nameContactUp.value}", "lastname":"${lastnameContactUp.value}", "email":"${emailContactUp.value}","position":"${positionContactUp.value}", "company_id":"${companyIdUp}", "region_id":"${regionIdUp}","country_id":"${countryIdUp}","city_id":"${cityIdUp}", "interest":"${interestContactUp.value}", "channel1": "${channelIdUp}", "channel2": "${channelId2Up}", "account1":"${accountContactUp.value}", "account2":"${accountContact2Up.value}", "preferences1":"${preferencesContactUp.value}", "preferences2":"${preferencesContact2Up.value}"} `,
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
                alert('Contact Not Found');
            });
        }
    })

    updateContactSection.classList.add('hidden');
    contactsSection.classList.remove('hidden');
}

cancelButtonUp.addEventListener('click', () => {
    updateContactSection.classList.add('hidden');
    contactsSection.classList.remove('hidden');
});


//Select Region
regionContactUp.addEventListener('click', () => {
    fetch('http://localhost:3000/regions', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchRegion = document.getElementsByClassName(`rowRegionUp`);
            if (res && validateSearchRegion.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegionUp`)
                    row.innerHTML += `
                    <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    console.log(row)
                    console.log(row.value)
                    console.log(regionContactUp)
                    regionContactUp.appendChild(row);
                    console.log(regionContactUp.value)
                }
            } else {
                console.log('Search Realized');
            }


        })

    console.log('Search Realized');
    for (let i = countryContactUp.options.length; i >= 0; i--) {
        countryContactUp.remove(i);
    }
    for (let i = cityContactUp.options.length; i >= 0; i--) {
        cityContactUp.remove(i);
    }
    getCountriesUp();
}
)

//Select Countries
function getCountriesUp() {
    let validateSearchCountryUp = document.getElementsByClassName(`liCountryUp`);
    console.log(validateSearchCountryUp)
    countryContactUp.disabled = false
    countryContactUp.addEventListener('click', () => {
        let regionContactSelectValueUp = regionContactUp.value.split(" ");
        console.log(regionContactSelectValueUp)
        let region_idSelectUp = regionContactSelectValueUp[0];

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
                        countryContactUp.appendChild(liCountryUp);
                    }
                }
            })
        for (let i = cityContactUp.options.length; i >= 0; i--) {
            cityContactUp.remove(i);
        }
        getCitiesUp()
    })
}

//Select Cities
function getCitiesUp() {
    let validateSearchCityUp = document.getElementsByClassName(`liCityUp`);
    console.log(validateSearchCityUp)
    cityContactUp.disabled = false
    cityContactUp.addEventListener('click', () => {
        const countryContactSelectValueUp = countryContactUp.value.split(" ");
        console.log(countryContactSelectValueUp)
        const country_idSelectUp = countryContactSelectValueUp[0];

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
                        cityContactUp.appendChild(liCityUp);
                    }
                } else {
                    console.log('Search Realized');
                }

            })
    }
    )

}

//Select Channel
channelContactUp.addEventListener('click', () => {
    fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchChannelUp = document.getElementsByClassName(`rowChannelUp`);

            if (res && validateSearchChannelUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    const rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    rowUp.setAttribute('class', `rowChannelUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;
                    console.log(rowUp)

                    channelContactUp.appendChild(rowUp);
                }
            } else {
                console.log('Search Realized');
            }
        })
}
)

//Select Companies
companyContactUp.addEventListener('click', () => {
    fetch('http://localhost:3000/companies', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchCompanyUp = document.getElementsByClassName(`rowCompanyUp`);

            if (res && validateSearchCompanyUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    let rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowCompany${res[i].company_id}`)
                    rowUp.setAttribute('class', `rowCompanyUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].company_id}" value="${res[i].company_id}"> ${res[i].company_id} ${res[i].nameCompany} </span>  `;
                    console.log(rowUp)

                    companyContactUp.appendChild(rowUp);
                }
            } else {
                console.log('Search Realized');
            }
        })
}
)

//Add channel
buttonAddChannelUp.addEventListener('click', () => {

    document.getElementById('channel2Up').classList.remove('hidden');
    document.getElementById('account2Up').classList.remove('hidden');
    document.getElementById('preferences2Up').classList.remove('hidden');
})


channelContact2Up.addEventListener('click', () => {
    fetch('http://localhost:3000/channels', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            let validateSearchChannelUp = document.getElementsByClassName(`rowChannel2Up`);

            if (res && validateSearchChannelUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    let rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    rowUp.setAttribute('class', `rowChannel2Up`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;
                    console.log(rowUp)

                    channelContact2Up.appendChild(rowUp);
                }
            } else {
                console.log('Search Realized');
            }
        })
}
)

//4. Delete Contact
cancelButtonDeleteContact.addEventListener('click', () => {
    deleteContactsSection.classList.toggle('hidden');
    contactsSection.classList.remove('hidden');
});

function showDeleteContact(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    deleteContactsSection.classList.toggle('hidden')

    deleteButtonDeleteContact.addEventListener('click', () => {
        console.log(id)
        deleteContact(id)
    });
}


async function deleteContact(id) {
    console.log(id)
    await fetch(`http://localhost:3000/contact/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    })


    deleteContactsSection.classList.add('hidden');
    contactsSection.classList.remove('hidden');

    location.reload()

}


//Sort Table

function sortTable(n, type) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("contactsTable");
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

