

// 2. Drop Down Filter
/* let iconFilter = document.getElementById('iconFilter');
let contactsFilter = document.getElementById('contactsFilter')
 iconFilter.addEventListener('click', ()=>{
    contactsFilter.classList.toggle('hidden')
});
 */

//7. Export Contacts 
/* let exportButton = document.getElementById('exportButton');
let exportContactsOptions = document.getElementById('exportContactsOptions')
exportButton.addEventListener('click', () => {
    exportContactsOptions.classList.toggle('exportContactsOptions')
}); */

/* //8. Import Contacts
let iconImport = document.getElementById('iconImport');
let importContactsSection = document.getElementById('importContactsSection');
iconImport.addEventListener('click', ()=>{
    importContactsSection.classList.toggle('hidden');
});

let cancelButtonImport = document.getElementById('cancelButtonImport');
cancelButtonImport.addEventListener('click', ()=>{
    importContactsSection.classList.toggle('hidden')
}); */

//search
let searchInput = document.getElementById('searchInput');
let iconSearch = document.getElementById('iconSearch');
let iconFilter = document.getElementById('iconFilter');
let searchInfo = document.getElementById('searchInfo');
function doSearch() {
    const searchText = searchInput.value.toLowerCase();
    let total = 0;
    // Recorremos todas las filas con contenido de la tabla
    for (let i = 0; i < table.rows.length; i++) {
        // Si el td tiene la clase "noSearch" no se busca en su cntenido
        if (table.rows[i].classList.contains("noSearch")) {
            continue;
        }
        let found = false;
        const cellsOfRow = table.rows[i].getElementsByTagName('td');
        // Recorremos todas las celdas
        for (let j = 0; j < cellsOfRow.length && !found; j++) {
            const compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            // Buscamos el texto en el contenido de la celda
            if (searchText.length == 0 || compareWith.indexOf(searchText) > -1) {
                found = true;
                total++;
            }
        }
        if (found) {
            table.rows[i].style.display = '';
            iconFilter.classList.remove('hidden')
        } else {
            // si no ha encontrado ninguna coincidencia, esconde la
            // fila de la tabla
            table.rows[i].style.display = 'none';
        }
    }
    // mostramos las coincidencias
    const lastTR = table.rows[table.rows.length - 1];
    const td = lastTR.querySelector("td");
    lastTR.classList.remove("hide");
    if (searchText == "") {
        lastTR.classList.add("hide");
    } else if (total) {
        searchInfo.classList.remove('hidden')
        searchInfo.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "")
    }
    else {
        console.log('No se han encontrado coincidencias')
        searchInfo.innerHTML = "Se ha encontrado " + total + " coincidencia" + ((total > 1) ? "s" : "")
        searchInfo.classList.remove('hidden')
        iconFilter.classList.remove('hidden')
    }
}

iconSearch.addEventListener('click', () => {
    doSearch();
})

iconFilter.addEventListener('click', () => {
    location.reload()
})

//Checkbox
let textCheck = document.getElementById('totalCheck');
let deleteCheck = document.getElementById('deleteCheck');
let checkSelect = document.getElementById('checkSelect')

let listSelect = [];


function contar(i, id) {
    console.log(i)
    console.log(id)
    deleteCheck.classList.remove('hidden')
    let elements = document.getElementsByName("check");
    var cont = 0;
    let arrow = document.getElementById(`arrow${id}`);
    console.log(arrow)
    console.log(elements[id])
    arrow.classList.toggle('arrowSelect')
    for (x = 0; x < elements.length; x++) {
        if (elements[x].type == "checkbox" && elements[x].checked) {
            cont += 1;

        }
    }
    textCheck.innerText = `${cont} seleccionados`
}


function selectAll() {
    deleteCheck.classList.remove('hidden')
    textCheck.innerText = ""
    let elements = document.getElementsByName("check");
    let arrow = document.getElementsByClassName('arrow')
    if (checkSelect.checked) {
        for (i = 0; i < elements.length; i++) {
            elements[i].checked = true
            arrow[i].classList.add('arrowSelect')
            textCheck.innerText = `${elements.length} seleccionados`
        }
    } else {
        for (i = 0; i < elements.length; i++) {
            elements[i].checked = false
            arrow[i].classList.remove('arrowSelect')
        }
        deleteCheck.classList.add('hidden')
    }
}


//Pagination

let rowsPage = document.getElementById("rowsPage");
let rowsTotal = document.getElementById("rowsTotal");
let arrowLeft = document.getElementById('arrowLeft');
let arrowRigth = document.getElementById('arrowRigth');
let rowI = document.getElementById('rowI');
let rowF = document.getElementById('rowF')
let searchF = parseInt(rowsPage.value);
let searchI = 0;


rowsPage.addEventListener('change', () => {
    console.log('SI')
    searchF = rowsPage.value;
    searchI = 0;
    console.log(rowsPage.value)
    searchFetch(searchI, searchF)
    rowsPage.selected
})

arrowRigth.addEventListener('click', () => {
    console.log(searchF)
    console.log(searchI)
    let validate = parseInt(searchF) + parseInt(rowsPage.value);
    console.log(validate)
    console.log(rowsPage.length)
    if (validate <= rowsPage.length) {
        searchI = parseInt(searchI) + parseInt(rowsPage.value)
        searchF = parseInt(searchF) + parseInt(rowsPage.value)
        console.log(searchI)
        console.log(searchF)
        searchFetch(parseInt(searchF), parseInt(searchI))
    }
})

arrowLeft.addEventListener('click', () => {
    console.log(searchF)
    console.log(searchI)
    validate = searchI - parseInt(rowsPage.value)
    if (validate >= 0) {
        searchI = searchI - parseInt(rowsPage.value)
        searchF = searchF - parseInt(rowsPage.value)
        console.log(searchI)
        console.log(searchF)
        searchFetch(parseInt(searchF), parseInt(searchI))
    }
})


//users header
function usersHeader() {
    fetch('http://localhost:3000/usersHeader', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            if (res == 1) {
                document.getElementById('usersHeader').classList.remove('hidden')

            } else if (res == 0) {
                document.getElementById('usersHeader').classList.add('hidden')
            }
        })
}
usersHeader();

//Button Close

let close1 = document.getElementById('buttonClose1');
let close2 = document.getElementById('buttonClose2');
close1.addEventListener('click', () =>{
    location.reload()
})
close2.addEventListener('click', () =>{
    location.reload()
})



