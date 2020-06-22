const changeNew = async (token, values, id) =>(
    await fetch(`https://myfroom.herokuapp.com/api/news/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error - changeNew "+ error);
     })
);
module.exports = changeNew;