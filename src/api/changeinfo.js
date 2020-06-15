
import getID from '../api/getID'
const changeInfo = (token, name, address, phone, id) =>(
    getID().then(i=>console.log(i)),
    fetch(`https://myfroom.herokuapp.com/api/userinfo/${getID()}`, 
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": token,
        },
        body: JSON.stringify({ name, address, phone })
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error");
     })
);
module.exports = changeInfo;