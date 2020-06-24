
const changeInfo = (token, name, address, phoneNumber, avatar) =>(
    console.log(token, name, address, phoneNumber, avatar),
    fetch(`https://myfroom.herokuapp.com/api/userinfo`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": token,
        },
        body: JSON.stringify({ name, address, phoneNumber, avatar})
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error", error);
     })
);
module.exports = changeInfo;