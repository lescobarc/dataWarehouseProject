let loginButton = document.getElementById('loginButton')

//Form Data info create user
loginButton.addEventListener('click',()=>{

    let token = localStorage.token

    console.log('llamado al API');
    fetch('http://localhost:3000/loginUser',{
        method:'POST',
        body:`{"username":"${username.value}","password":"${password.value}"}`,

        headers:{"Content-Type":"application/json",
        'Authorization':  `Bearer ${token}`}

       

        
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