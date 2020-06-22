const register =  (values) =>(
    fetch('https://myfroom.herokuapp.com/api/register', 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(values)
    })
    .then( res => res.json())
    .catch((error)=>{
        console.log("Api call error");
     })

)
module.exports = register;