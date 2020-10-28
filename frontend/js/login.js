let loginButton = document.getElementById('loginButton')

//Form Data info create user
loginButton.addEventListener('click',()=>{
<<<<<<< HEAD
    let token = localStorage.token
=======
>>>>>>> 74619021b161236c8df2fd3f5a5a7591249bdb67
    console.log('llamado al API');
    fetch('http://localhost:3000/loginUser',{
        method:'POST',
        body:`{"username":"${username.value}","password":"${password.value}"}`,
<<<<<<< HEAD
        headers:{"Content-Type":"application/json",
        'Authorization':  `Bearer ${token}`}
=======
        headers:{"Content-Type":"application/json"}
>>>>>>> 74619021b161236c8df2fd3f5a5a7591249bdb67
        
    }).then((res)=>{
        console.log(res);
        if(res.status==200){
            res.json().then((data)=>{
                console.log(data);
                localStorage.setItem("token",data.token);
                console.log(data);
            });   
            
            location.href = "./2contacts.html";
        }
        else{
            res.json().then((data)=>{
                console.log(data);
                alert('Usuario No Existe');
            });
        }
    }).catch(res=>{res.json().then(data=>alert(data.msg))});
});