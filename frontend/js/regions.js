var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}

//1. get regions

function getUsers() {
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
              for (let i = 0; i < 50; i++) {
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
                  alert('Users not found');
              });
          }

      })/* .catch(res=>{res.json().then(data=>alert(data.msg))}); */
}
getUsers();