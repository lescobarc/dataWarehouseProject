

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

//8. Import Contacts
let iconImport = document.getElementById('iconImport');
let importContactsSection = document.getElementById('importContactsSection');
iconImport.addEventListener('click', ()=>{
    importContactsSection.classList.toggle('hidden');
});

let cancelButtonImport = document.getElementById('cancelButtonImport');
cancelButtonImport.addEventListener('click', ()=>{
    importContactsSection.classList.toggle('hidden')
});

