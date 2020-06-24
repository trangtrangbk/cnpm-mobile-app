
const changePassword = (token, password, newPass) =>(
    fetch(`https://myfroom.herokuapp.com/api/accounts/changePassword`, 
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({"oldpass":password ,"newpass":newPass})
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error" + error);
     })
);
module.exports = changePassword;