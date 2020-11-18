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
let addressContact = document.getElementById('addressContact');
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
let addressContactUp = document.getElementById('addressContactUp');
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
            let contact = res[0];
            if (res) {

                //Create Table Contacts
                tableBody.innerHTML = ""
                for (let i = searchI; i < searchF; i++) {
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact');
                    row.setAttribute('class', 'arrow');
                    row.setAttribute('id', `arrow${i}`);
                    row.innerHTML += `
                <td>  <input type="checkbox" class="checkbox" onclick='contar(this,  ${i})' id=${contact[i].contact_id} name="check" > </td>
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
                </td> `;

                    table.appendChild(row);

                    //Pagination
                    rowsPage.innerHTML = ""
                    for (let i = 1; i <= contact.length; i++) {
                        const optionPag = document.createElement('option');
                        optionPag.innerText = `${i}`
                        rowsPage.appendChild(optionPag)
                    }
                    rowsPage.value = searchF - searchI
                    rowsTotal.innerText = `${contact.length}`
                    rowI.innerText = `${searchI}`
                    rowF.innerText = `${searchF}`
                }
            } else {
                console.log('Contacts not found');
                alert('Contacts not found');
            }
        })
}
getContacts();




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
    const channelContactSelectValue2 = channelContact2.value.split(" ");
    const channelId2 = parseInt(channelContactSelectValue2[0]);


    fetch('http://localhost:3000/contact', {
        method: 'POST',
        body: `{"name":"${nameContact.value}", "lastname":"${lastnameContact.value}", "email":"${emailContact.value}", "address":"${addressContact.value}", "position":"${positionContact.value}", "company_id":"${companyId}", "region_id":"${regionId}","country_id":"${countryId}","city_id":"${cityId}", "interest":"${interestContact.value}", "channel1": "${channelId}", "channel2": "${channelId2}", "account1":"${accountContact.value}", "account2":"${accountContact2.value}", "preferences1":"${preferencesContact.value}", "preferences2":"${preferencesContact2.value}"} `,
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
                alert('Email Contact Exist');
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
            let validateSearchRegion = document.getElementsByClassName(`rowRegion`);
            if (res && validateSearchRegion.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    let row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegion`)
                    row.innerHTML += `
                    <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    regionContact.appendChild(row);
                }
            } else {
                console.log('Regions Not Found');
            }


        })
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
    countryContact.disabled = false
    countryContact.addEventListener('click', () => {
        let regionContactSelectValue = regionContact.value.split(" ");
        let region_idSelect = regionContactSelectValue[0];
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
                        countryContact.appendChild(liCountry);
                    }
                } else {
                    console.log('Countries Not Found');
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
    cityContact.disabled = false
    cityContact.addEventListener('click', () => {
        const countryContactSelectValue = countryContact.value.split(" ");
        const country_idSelect = countryContactSelectValue[0];
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
                        cityContact.appendChild(liCity);
                    }
                } else {
                    console.log('Cities Not Found');
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
            let validateSearchChannel = document.getElementsByClassName(`rowChannel`);
            if (res && validateSearchChannel.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    row.setAttribute('class', `rowChannel`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;
                    channelContact.appendChild(row);
                }
            } else {
                console.log('Channels Not Found');
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
            let validateSearchCompany = document.getElementsByClassName(`rowCompany`);
            if (res && validateSearchCompany.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    let row = document.createElement('option');
                    row.setAttribute('id', `rowCompany${res[i].company_id}`)
                    row.setAttribute('class', `rowCompany`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].company_id}" value="${res[i].company_id}"> ${res[i].company_id} ${res[i].nameCompany} </span>  `;
                    companyContact.appendChild(row);
                }
            } else {
                console.log('Companies Not Found');
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
            let validateSearchChannel = document.getElementsByClassName(`rowChannel2`);
            if (res && validateSearchChannel.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    let row = document.createElement('option');
                    row.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    row.setAttribute('class', `rowChannel2`)
                    row.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;

                    channelContact2.appendChild(row);
                }
            } else {
                console.log('Channels Not Found');
            }
        })
}
)

// 3. Put contacts
function showUpdateContact(i) {
    let id = i.id
    updateContactSection.classList.toggle('hidden');
    contactsSection.classList.toggle('hidden');
    showInfoContact(id);
    addButtonUp.addEventListener('click', () => {
        updateContacts(id);
    });
    cancelButtonUp.addEventListener('click', () => {
        showDeleteContact(i);
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
                console.log('Contact not found');
            }

        })

}

function updateContacts(id) {
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
    const channelContactSelectValue2Up = channelContact2Up.value.split(" ");
    const channelId2Up = parseInt(channelContactSelectValue2Up[0]);

    fetch(`http://localhost:3000/contact/${id}`, {
        method: 'PUT',
        body: `{"name":"${nameContactUp.value}", "lastname":"${lastnameContactUp.value}", "email":"${emailContactUp.value}", "address":"${addressContactUp.value}", "position":"${positionContactUp.value}", "company_id":"${companyIdUp}", "region_id":"${regionIdUp}","country_id":"${countryIdUp}","city_id":"${cityIdUp}", "interest":"${interestContactUp.value}", "channel1": "${channelIdUp}", "channel2": "${channelId2Up}", "account1":"${accountContactUp.value}", "account2":"${accountContact2Up.value}", "preferences1":"${preferencesContactUp.value}", "preferences2":"${preferencesContact2Up.value}"} `,
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
                alert('Contact Not Found');
            });
        }
    })

    updateContactSection.classList.add('hidden');
    contactsSection.classList.remove('hidden');
}




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
            let validateSearchRegion = document.getElementsByClassName(`rowRegionUp`);
            if (res && validateSearchRegion.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    const row = document.createElement('option');
                    row.setAttribute('id', `rowRegion${res[i].region_id}`)
                    row.setAttribute('class', `rowRegionUp`)
                    row.innerHTML += `
                    <span class="caret"  id ="${res[i].region_id}" value="${res[i].region_id}"> ${res[i].region_id} ${res[i].nameRegion} </span>  `;
                    regionContactUp.appendChild(row);
                }
            } else {
                console.log('Regions Not Found');
            }


        })

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
    countryContactUp.disabled = false
    countryContactUp.addEventListener('click', () => {
        let regionContactSelectValueUp = regionContactUp.value.split(" ");
        let region_idSelectUp = regionContactSelectValueUp[0];
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
                        countryContactUp.appendChild(liCountryUp);
                    }
                } else {
                    console.log('Countries Not Found');
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
    cityContactUp.disabled = false
    cityContactUp.addEventListener('click', () => {
        const countryContactSelectValueUp = countryContactUp.value.split(" ");
        const country_idSelectUp = countryContactSelectValueUp[0];
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
                        cityContactUp.appendChild(liCityUp);
                    }
                } else {
                    console.log('Cities Not Found');
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
            let validateSearchChannelUp = document.getElementsByClassName(`rowChannelUp`);
            if (res && validateSearchChannelUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    const rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    rowUp.setAttribute('class', `rowChannelUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;

                    channelContactUp.appendChild(rowUp);
                }
            } else {
                console.log('Channels Not Found');
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
            let validateSearchCompanyUp = document.getElementsByClassName(`rowCompanyUp`);
            if (res && validateSearchCompanyUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    let rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowCompany${res[i].company_id}`)
                    rowUp.setAttribute('class', `rowCompanyUp`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].company_id}" value="${res[i].company_id}"> ${res[i].company_id} ${res[i].nameCompany} </span>  `;

                    companyContactUp.appendChild(rowUp);
                }
            } else {
                console.log('Companies Not Found');
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
            let validateSearchChannelUp = document.getElementsByClassName(`rowChannel2Up`);
            if (res && validateSearchChannelUp.length == 0) {
                for (let i = 0; i < res.length; i++) {
                    let rowUp = document.createElement('option');
                    rowUp.setAttribute('id', `rowChannel${res[i].channel_id}`)
                    rowUp.setAttribute('class', `rowChannel2Up`)
                    rowUp.innerHTML += `
                  <span class="caret"  id ="${res[i].channel_id}" value="${res[i].channel_id}"> ${res[i].channel_id} ${res[i].nameChannel} </span>  `;

                    channelContact2Up.appendChild(rowUp);
                }
            } else {
                console.log('Channels Not Found');
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
    let id = i.id
    deleteContactsSection.classList.toggle('hidden')
    deleteButtonDeleteContact.addEventListener('click', () => {
        deleteContact(id)
    });
}


async function deleteContact(id) {
    await fetch(`http://localhost:3000/contact/${id}`, {
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
                alert('Contact Not Found');
            });
        }
        location.reload()
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

//Pagination
function searchFetch(searchI, searchF) {
    getContacts(searchI, searchF)
}

//Select Delete
function showDeleteContactSelect() {
    deleteContactsSection.classList.toggle('hidden')
    deleteButtonDeleteContact.addEventListener('click', () => {
        selectDelete()
    });
}

async function selectDelete() {
    let elements = document.getElementsByName("check");
    for (i = 0; i < elements.length; i++) {
        let id = elements[i].id
        if (elements[i].checked) {
            await fetch(`http://localhost:3000/contact/${id}`, {
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
                        alert('Contact Not Found');
                    });
                }
            })
        }
    }

    location.reload()
}



