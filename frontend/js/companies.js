let token = localStorage.token;

//Table 
let tabla = document.querySelector('#companiesTable tbody')


//1. get companies
function getCompanies() {
    fetch('http://localhost:3000/companies', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    }).then(respuesta => respuesta.json())
        .then(res => {
            console.log('este')
            console.log(res)
            let company = res[0];
            if (res) {
                for (let i = 0; i < company.length; i++) {
                    
                    const row = document.createElement('tr');
                    row.setAttribute('class', 'arrowContact')
                    row.innerHTML += `
                <td>  <input type="checkbox" </td>
                <td>${company[i].name}</td>
                <td>${company[i].address}</td>
                <td>${company[i].email}</td>
                <td>${company[i].tel}</td>
                <td>${company[i].name}</td>
                <td>${company[i].name}</td>
                <td>${company[i].name}</td>
                <td id="actions">
                    <i class="fas fa-ellipsis-h iconPoints"></i>
                    <i class="fas fa-trash" id=${company[i].company_id} onclick = "showDeleteCompany(this)" ></i>
                    <i class="fas fa-pencil-alt" id=${company[i].company_id} onclick = "showUpdateCompany(this)"></i>
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

        })
}
getCompanies();

