

// 2. Drop Down Filter
let iconFilter = document.getElementById('iconFilter');
let contactsFilter = document.getElementById('contactsFilter')
 iconFilter.addEventListener('click', ()=>{
    contactsFilter.classList.toggle('hidden')
});


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

/* //9. Delete Contacts
let contactId = 1;
let iconTrashDelete = document.getElementById(`iconTrashDelete${contactId}`);
let deleteContactsSection = document.getElementById('deleteContactsSection');
iconTrashDelete.addEventListener('click', ()=>{
    deleteContactsSection.classList.toggle('hidden')
});

let cancelButtonDelete = document.getElementById('cancelButtonDelete');
cancelButtonDelete.addEventListener('click', ()=>{
    deleteContactsSection.classList.toggle('hidden')
});

//10. New Contact
let iconAdd = document.getElementById('iconAdd');
let createContactSection = document.getElementById('createContactSection');
iconAdd.addEventListener('click', ()=>{
    createContactSection.classList.toggle('hidden')
})

let cancelButtonNewContact = document.getElementById('cancelButtonNewContact');
cancelButtonNewContact.addEventListener('click', ()=>{
    newContactSection.classList.toggle('hidden')
})
 */


