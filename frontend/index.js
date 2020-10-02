

let iconFilter = document.getElementById('iconFilter');
let contactsFilter = document.getElementById('contactsFilter')
 iconFilter.addEventListener('click', ()=>{
    contactsFilter.classList.toggle('hidden')
});


let exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', () => {
    document.getElementById('exportContactsOptions').classList.toggle('exportContactsOptions')
});