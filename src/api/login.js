
const login = async (values) =>(
    await fetch(`https://myfroom.herokuapp.com/api/login`, 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error - login");
     })
);
module.exports = login;