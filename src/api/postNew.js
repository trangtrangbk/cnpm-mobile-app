const postNew = async (token, values) =>(
    console.log(values.price, 'in post new'),
    await fetch(`https://myfroom.herokuapp.com/api/news/postNews`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': token 
        },
        body: JSON.stringify(values)
    })
    .then(res => res.json())
    .catch((error)=>{
        console.log("Api call error - post"+ error);
     })
);
module.exports = postNew;