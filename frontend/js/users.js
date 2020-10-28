/* const { TokenExpiredError } = require("jsonwebtoken"); */
let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let createUserSection = document.getElementById('createUser');
let usersSection = document.getElementById('usersSection');

/* //Table User
let name = document.getElementById('nameUser');
let lastname = document.getElementById('lastnameUser');
let email = document.getElementById('emailUser');
let username = document.getElementById('usernameUser');
let pass = document.getElementById('passUser');
let repass = document.getElementById('repassUser'); */

// Section create user
addButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});
createButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});
cancelButton.addEventListener('click', () => {
    createUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
});

//4. Post User:  Form Data info create user
createButton.addEventListener('click', () => {
    let token = localStorage.token;
    console.log('llamado al API');
    fetch('http://localhost:3000/user', {
        method: 'POST',
        body: `{"name":"${name.value}","lastname":"${lastname.value}","email":"${email.value}","pass":"${pass.value}","repass":"${repass.value}"}`,
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
            });
            /*  location.href = "./users.html"; */
        }
        else {
            res.json().then((data) => {
                console.log(data);
                alert('Usuario Creado');
            });
        }
    }).catch(res => { res.json().then(data => alert(data.msg)) });
});

//2. get users

function getUsers(){
    fetch('http://localhost:3000/users', {
        method: 'GET',
        /* body:`{"name":"${name.value}","lastname":"${lastname.value}","email":"${email.value}","pass":"${pass.value}","repass":"${repass.value}"}`, */
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            res.json().then((data) => {
                console.log(data);
            });
            /*  location.href = "./users.html"; */
        }
        else {
            res.json().then((data) => {
                console.log(data);
                alert('Usuario Creado');
            });
        }
    }).catch(res => { res.json().then(data => alert(data.msg)) });




}
 getUsers();