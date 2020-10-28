
// Section create user
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let createUserSection = document.getElementById('createUser');
let usersSection = document.getElementById('usersSection');
createButton.addEventListener('click', ()=>{
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});
cancelButton.addEventListener('click', ()=>{
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});