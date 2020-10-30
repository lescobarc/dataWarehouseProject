/* const { TokenExpiredError } = require("jsonwebtoken"); */
let token = localStorage.token;

let createButton = document.getElementById('createButton');
let cancelButton = document.getElementById('cancelButton');
let addButton = document.getElementById('addButton');
let createUserSection = document.getElementById('createUser');
let usersSection = document.getElementById('usersSection');
let updateUserSection = document.getElementById('updateUserSection');
let cancelButtonUp = document.getElementById('cancelButtonUp');
let createButtonUp = document.getElementById('createButtonUp');
let deleteUsersSection = document.getElementById('deleteUsersSection');
let cancelButtonDeleteUser = document.getElementById('cancelButtonDeleteUser');
let deleteButtonDeleteUser = document.getElementById('deleteButtonDeleteUser')

//Table Add User
let tabla = document.querySelector('#usersTable tbody')
let name = document.getElementById('nameUser');
let lastname = document.getElementById('lastnameUser');
let email = document.getElementById('emailUser');
let username = document.getElementById('usernameUser');
let pass = document.getElementById('passUser');
let repass = document.getElementById('repassUser');

//Table Update User
let nameUp = document.getElementById('nameUserUp');
let lastnameUp = document.getElementById('lastnameUserUp');
let emailUp = document.getElementById('emailUserUp');
let usernameUp = document.getElementById('usernameUserUp');


// Section create user


//2. get users

function getUsers() {
    fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log(res)
            if (res) {
                for (let i = 0; i < 10; i++) {
                    console.log(res)
                    /* console.log(res.users[i].name)  */
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>  <input type="checkbox" </td>
                <td>${res.users[i].name}</td>
                <td>${res.users[i].lastname}</td>
                <td>${res.users[i].email}</td>
                <td>${res.users[i].username}</td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${res.users[i]._id} onclick = "showDeleteUser(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${res.users[i]._id} onclick = "showUpdateUser(this)"></i>
                </td>
            `;
                    tabla.appendChild(row);
                }
            } else {
                res.json().then((data) => {
                    console.log('Users not found');
                    alert('Usuarios no encontrados');
                });
            }

        })/* .catch(res=>{res.json().then(data=>alert(data.msg))}); */
}
getUsers();

//4. Post User:  Form Data info create user
createButton.addEventListener('click', () => {
    try {
        console.log('llamado al API');

        if (pass.value === repass.value) {
            fetch('http://localhost:3000/user', {
                method: 'POST',
                body: `{"name":"${name.value}","lastname":"${lastname.value}","email":"${email.value}","username":"${username.value}","password":"${pass.value}","repass":"${repass.value}"}`,
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
                        alert('User Created');
                    });
                }
            }).catch(res => { res.json().then(data => alert(data.msg)) });
            location.reload()

        } else {

            console.log('Verify Password');
            alert('Verify Password');
            res.status(400).send({ message: 'Verify Password' });

        }
    } catch {
        res.status(500).send({ message: "Internal Server Error" });
    }



});

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



// 5. Put user

function showUpdateUser(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    updateUserSection.classList.toggle('hidden');
    usersSection.classList.toggle('hidden');
    createButtonUp.addEventListener('click', () => {
        console.log(id)
        updateUsers(id)
    });
}


function updateUsers(id) {
    console.log(id)

    fetch(`http://localhost:3000/user/${id}`, {

        method: 'PUT',
        body: `{"name":"${nameUp.value}","lastname":"${lastnameUp.value}","email":"${emailUp.value}","username":"${usernameUp.value}"}`,
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

        }
        else {
            res.json().then((data) => {
                console.log(data);
                alert('Usuario Creado');
            });
        }
    }).catch(res => { res.json().then(data => alert(data.msg)) });

    updateUserSection.classList.add('hidden');
    usersSection.classList.remove('hidden');
    location.reload()
}

//6. Delete User

cancelButtonDeleteUser.addEventListener('click', () => {
    deleteUsersSection.classList.toggle('hidden');
    usersSection.classList.remove('hidden');
});

function showDeleteUser(i) {
    console.log(i)
    let id = i.id
    console.log(id)
    deleteUsersSection.classList.toggle('hidden')

    deleteButtonDeleteUser.addEventListener('click', () => {
        console.log(id)
        deleteUser(id)
    });
}


function deleteUser(id) {


    console.log(id)

    fetch(`http://localhost:3000/user/${id}`, {

        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        console.log(res);
        if (res.status == 200) {
            res.json().then((data) => {
                console.log('eliminado');
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

    deleteUsersSection.classList.add('hidden');
    usersSection.classList.remove('hidden');


    location.reload()
}

