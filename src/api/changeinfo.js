
const changeInfo = (id, token, name, address, phoneNumber) =>(
    fetch(`https://myfroom.herokuapp.com/api/userinfo/${id}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": token,
        },
        body: JSON.stringify({ name, address, phoneNumber })
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error", error);
     })
);
module.exports = changeInfo;