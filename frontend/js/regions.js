let token = localStorage.token;
//Table
let table = document.querySelector('#regionsTable tbody')

//Region
let createButtonRegion = document.getElementById('createButtonRegion');
let cancelButtonRegion = document.getElementById('cancelButtonRegion');
let addButtonRegion = document.getElementById('addButtonRegion');
let createRegionSection = document.getElementById('createRegion');
let regionsSection = document.getElementById('citySection');
let nameRegion = document.getElementById('nameRegion')

//Country
let createButtonCountry = document.getElementById('createButtonCountry');
let cancelButtonCountry = document.getElementById('cancelButtonCountry');
let addButtonCountry = document.getElementById('addButtonCountry');
let createCountrySection = document.getElementById('createCountry');
/* let regionsSection = document.getElementById('citySection'); */
let nameCountry = document.getElementById('nameCountry')



//Tree
var toggler = document.getElementsByClassName("caret");
console.log("togle" + toggler)
console.log(toggler)
var i;
for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function showMore() {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}


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
              <button class="buttonSecondary buttonLarge" id="${res[i].region_id}" >Agregar País</button>
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
    citySection.classList.toggle('hidden');
});
createButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    citySection.classList.toggle('hidden');
});
cancelButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    citySection.classList.toggle('hidden');
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

/* 
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
           
            if (res) {
                const ul = document.createElement('ul');
                ul.setAttribute('id', 'sectionCountries')
                ul.setAttribute('class', 'nested');


                for (let i = 0; i < res.length; i++) {
                    console.log(res)
                    console.log(res[i].country_id)
                    const liCountry = document.createElement('li');
                    liCountry.setAttribute('id', `liCountry${res[i].country_id}`)

                    liCountry.innerHTML += `
                    <span class="caret" onclick = "getCities(this)" id ="${res[i].country_id}"> ${res[i].name}   <i class="fas fa-trash" id="iconTrashDelete1"></i><i
                    class="fas fa-pencil-alt "></i></span> <button
                class="buttonTerciary buttonLarge ">Agregar Ciudad</button>
            `;
                    console.log(liCountry)

                    document.getElementById(`rowRegion${region_id}`).appendChild(liCountry);

                }
            } else {
                res.json().then((data) => {
                    console.log('Countries not found');
                    alert('Countries not found');
                });
            }

        }) 

}

//2. post country

addButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    citySection.classList.toggle('hidden');
});
createButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    citySection.classList.toggle('hidden');
});
cancelButtonRegion.addEventListener('click', () => {
    createRegionSection.classList.toggle('hidden');
    citySection.classList.toggle('hidden');
});

function postCountry(i){
    console.log(i)
} */
/* createButtonRegion.addEventListener('click', () => {
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

}); */


//CITIES
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
                if (res) {
                    const ulCity = document.createElement('ul');
                    ulCity.setAttribute('class', '')
                    for (let i = 0; i < res.length; i++) {
                        console.log(res)
                        const liCity = document.createElement('li');
                        liCity.setAttribute('id', `liCity${res[i].country_id}`)
                        liCity.innerHTML += `
                    <span class=""> ${res[i].name}  <i class="fas fa-trash" id="iconTrashDelete1"></i><i class="fas fa-pencil-alt "></i> </span>
            `;
                        console.log(liCity)

                        document.getElementById(`liCountry${country_id}`).appendChild(liCity);
                    }
                } else {
                    res.json().then((data) => {
                        console.log('Citiess not found');
                        alert('Cities not found');
                    });
                }

            })
} 