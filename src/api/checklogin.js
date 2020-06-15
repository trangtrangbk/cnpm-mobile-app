
const checkLogin = async (token) =>(
    await fetch('https://myfroom.herokuapp.com/api/auth', 
    {
        method: 'GET',
        headers: {
            "Authorization": token ,
        },
        body: null,
    })
    .then( res => res.json())
    .catch((error)=>{
        console.log("Api call error  c"+ error);
     })
);
module.exports = checkLogin;